from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict
from datetime import datetime
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# Importy z naszych warstw
from infrastructure.database import get_db, create_tables
from infrastructure.db_models import *
from repositories.druzyna_repository import SqlAlchemyDruzynaRepository
from repositories.wyjazd_repository import SqlAlchemyWyjazdRepository
from repositories.komenda_repository import SqlAlchemyKomendaRepository
from repositories.komisja_rewizyjna_repository import SqlAlchemyKomisjaRewizyjnaRepository
from repositories.user_repository import SqlAlchemyUserRepository
from usecases.druzyna_service import DruzynaService
from usecases.wyjazd_service import WyjazdService
from usecases.komenda_service import KomendaService
from usecases.komisja_rewizyjna_service import KomisjaRewizyjnaService
from usecases.user_service import UserService
from domain.druzyna import Druzyna
from domain.wyjazd import Wyjazd
from domain.komenda import Komenda
from domain.komisja_rewizyjna import KomisjaRewizyjna
from schemas import (
    DruzynaCreate, DruzynaResponse, DruzynaGroupedResponse,
    WyjazdCreate, WyjazdResponse,
    KomendaCreate, KomendaResponse,
    KomisjaRewizyjnaCreate, KomisjaRewizyjnaResponse,
    UserResponse, TokenResponse, AzureLoginRequest, LoginResponse
)
from infrastructure.auth_service import AzureAuthService
from middleware.auth_middleware import get_current_user, require_roles, require_admin
from domain.user import User

# Inicjalizacja rate limitera
limiter = Limiter(key_func=get_remote_address)

# Tworzenie aplikacji FastAPI
app = FastAPI(
    title="LS Web API",
    description="API dla systemu Leśna Szkołka",
    version="1.0.0"
)

# Dodanie rate limitera do aplikacji
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Konfiguracja CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:3001",
        "https://test.lesnaszkolka.org",
        "https://lesnaszkolka.org"
    ],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # Wszystkie metody HTTP
    allow_headers=["*"],  # Wszystkie nagłówki
)

# Tworzenie tabel przy starcie
@app.on_event("startup")
async def startup_event():
    create_tables()

# Dependency injection dla serwisów
def get_druzyna_service(db: Session = Depends(get_db)) -> DruzynaService:
    repository = SqlAlchemyDruzynaRepository(db)
    return DruzynaService(repository)

def get_wyjazd_service(db: Session = Depends(get_db)) -> WyjazdService:
    repository = SqlAlchemyWyjazdRepository(db)
    return WyjazdService(repository)

def get_komenda_service(db: Session = Depends(get_db)) -> KomendaService:
    repository = SqlAlchemyKomendaRepository(db)
    return KomendaService(repository)

def get_komisja_service(db: Session = Depends(get_db)) -> KomisjaRewizyjnaService:
    repository = SqlAlchemyKomisjaRewizyjnaRepository(db)
    return KomisjaRewizyjnaService(repository)

def get_user_service(db: Session = Depends(get_db)) -> UserService:
    user_repository = SqlAlchemyUserRepository(db)
    auth_service = AzureAuthService(user_repository)
    return UserService(user_repository, auth_service)

def get_auth_service(db: Session = Depends(get_db)) -> AzureAuthService:
    user_repository = SqlAlchemyUserRepository(db)
    return AzureAuthService(user_repository)

# Endpointy autoryzacji
@app.post("/auth/azure-login", response_model=LoginResponse)
async def azure_login(
    login_data: AzureLoginRequest,
    user_service: UserService = Depends(get_user_service)
):
    """Logowanie przez Azure AD"""
    try:
        # Tutaj implementacja wymiany kodu na token Azure AD
        # To jest uproszczona wersja - w rzeczywistości potrzebujesz wymiany kodu na token
        user = await user_service.authenticate_with_azure(login_data.code)
        
        if user:
            token = user_service.create_token(user)
            return LoginResponse(
                success=True,
                message="Zalogowano pomyślnie",
                token=token,
                user=UserResponse(
                    id=user.id,
                    email=user.email,
                    name=user.name,
                    roles=user.roles,
                    is_active=user.is_active,
                    created_at=user.created_at,
                    updated_at=user.updated_at
                )
            )
        else:
            return LoginResponse(
                success=False,
                message="Błąd autoryzacji Azure AD"
            )
    except Exception as e:
        return LoginResponse(
            success=False,
            message=f"Błąd logowania: {str(e)}"
        )

@app.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Pobiera informacje o aktualnym użytkowniku"""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        roles=current_user.roles,
        is_active=current_user.is_active,
        created_at=current_user.created_at,
        updated_at=current_user.updated_at
    )

# Endpointy dla drużyn
@app.post("/druzyny", response_model=DruzynaResponse)
@limiter.limit("60/minute")
async def create_druzyna(
    request: Request,
    druzyna_data: DruzynaCreate,
    druzyna_service: DruzynaService = Depends(get_druzyna_service),
    current_user: User = Depends(get_current_user)
):
    """Tworzy nową drużynę (wymaga zalogowania)"""
    try:
        druzyna = Druzyna(
            nazwa=druzyna_data.nazwa,
            opis=druzyna_data.opis,
            link=druzyna_data.link,
            miasto=druzyna_data.miasto,
            dzielnica=druzyna_data.dzielnica,
            dokladny_adres=druzyna_data.dokladny_adres,
            pinezka=druzyna_data.pinezka
        )
        
        created_druzyna = druzyna_service.create_druzyna(druzyna)
        
        return DruzynaResponse(
            id=created_druzyna.id,
            nazwa=created_druzyna.nazwa,
            opis=created_druzyna.opis,
            link=created_druzyna.link,
            miasto=created_druzyna.miasto,
            dzielnica=created_druzyna.dzielnica,
            dokladny_adres=created_druzyna.dokladny_adres,
            pinezka=created_druzyna.pinezka,
            deleted=created_druzyna.deleted,
            created_at=created_druzyna.created_at,
            updated_at=created_druzyna.updated_at
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/druzyny", response_model=Dict[str, List[DruzynaResponse]])
def list_druzyny_by_pinezka(
    druzyna_service: DruzynaService = Depends(get_druzyna_service)
):
    """Listuje wszystkie drużyny pogrupowane przez pinezkę"""
    druzyny_by_pinezka = druzyna_service.get_all_by_pinezka()
    
    result = {}
    for pinezka, druzyny in druzyny_by_pinezka.items():
        result[pinezka] = [
            DruzynaResponse(
                id=druzyna.id,
                nazwa=druzyna.nazwa,
                opis=druzyna.opis,
                link=druzyna.link,
                miasto=druzyna.miasto,
                dzielnica=druzyna.dzielnica,
                dokladny_adres=druzyna.dokladny_adres,
                pinezka=druzyna.pinezka,
                deleted=druzyna.deleted,
                created_at=druzyna.created_at,
                updated_at=druzyna.updated_at
            )
            for druzyna in druzyny
        ]
    
    return result

@app.put("/druzyny/{druzyna_id}", response_model=DruzynaResponse)
@limiter.limit("60/minute")
async def update_druzyna(
    request: Request,
    druzyna_id: int,
    druzyna_data: DruzynaCreate,
    druzyna_service: DruzynaService = Depends(get_druzyna_service),
    current_user: User = Depends(get_current_user)
):
    """Aktualizuje drużynę (wymaga zalogowania)"""
    try:
        druzyna = Druzyna(
            id=druzyna_id,
            nazwa=druzyna_data.nazwa,
            opis=druzyna_data.opis,
            link=druzyna_data.link,
            miasto=druzyna_data.miasto,
            dzielnica=druzyna_data.dzielnica,
            dokladny_adres=druzyna_data.dokladny_adres,
            pinezka=druzyna_data.pinezka
        )
        
        updated_druzyna = druzyna_service.update_druzyna(druzyna)
        
        return DruzynaResponse(
            id=updated_druzyna.id,
            nazwa=updated_druzyna.nazwa,
            opis=updated_druzyna.opis,
            link=updated_druzyna.link,
            miasto=updated_druzyna.miasto,
            dzielnica=updated_druzyna.dzielnica,
            dokladny_adres=updated_druzyna.dokladny_adres,
            pinezka=updated_druzyna.pinezka,
            deleted=updated_druzyna.deleted,
            created_at=updated_druzyna.created_at,
            updated_at=updated_druzyna.updated_at
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/druzyny/{druzyna_id}")
@limiter.limit("60/minute")
def delete_druzyna(
    request: Request,
    druzyna_id: int,
    druzyna_service: DruzynaService = Depends(get_druzyna_service),
    current_user: User = Depends(get_current_user)
):
    """Usuwa (ukrywa) drużynę (wymaga zalogowania)"""
    success = druzyna_service.delete_druzyna(druzyna_id)
    if not success:
        raise HTTPException(status_code=404, detail="Drużyna nie została znaleziona")
    return {"message": "Drużyna została usunięta"}

# Endpointy dla wyjazdów
@app.get("/wyjazdy/upcoming", response_model=List[WyjazdResponse])
def list_upcoming_wyjazdy(
    wyjazd_service: WyjazdService = Depends(get_wyjazd_service)
):
    """Listuje nadchodzące wyjazdy"""
    wyjazdy = wyjazd_service.get_upcoming_wyjazdy()
    
    return [
        WyjazdResponse(
            id=wyjazd.id,
            tytul=wyjazd.tytul,
            opis=wyjazd.opis,
            miejsce=wyjazd.miejsce,
            data_rozpoczecia=wyjazd.data_rozpoczecia,
            data_zakonczenia=wyjazd.data_zakonczenia,
            kwota=wyjazd.kwota,
            deleted=wyjazd.deleted,
            created_at=wyjazd.created_at,
            updated_at=wyjazd.updated_at
        )
        for wyjazd in wyjazdy
    ]

@app.post("/wyjazdy", response_model=WyjazdResponse)
@limiter.limit("60/minute")
async def create_wyjazd(
    request: Request,
    wyjazd_data: WyjazdCreate,
    wyjazd_service: WyjazdService = Depends(get_wyjazd_service),
    current_user: User = Depends(get_current_user)
):
    """Tworzy nowy wyjazd (wymaga zalogowania)"""
    try:
        # Konwertuj stringi na datetime
        data_rozpoczecia = datetime.strptime(wyjazd_data.data_rozpoczecia, "%m-%d-%Y")
        data_zakonczenia = datetime.strptime(wyjazd_data.data_zakonczenia, "%m-%d-%Y")
        
        wyjazd = Wyjazd(
            tytul=wyjazd_data.tytul,
            opis=wyjazd_data.opis,
            miejsce=wyjazd_data.miejsce,
            data_rozpoczecia=data_rozpoczecia,
            data_zakonczenia=data_zakonczenia,
            kwota=wyjazd_data.kwota
        )
        
        created_wyjazd = wyjazd_service.create_wyjazd(wyjazd)
        
        return WyjazdResponse(
            id=created_wyjazd.id,
            tytul=created_wyjazd.tytul,
            opis=created_wyjazd.opis,
            miejsce=created_wyjazd.miejsce,
            data_rozpoczecia=created_wyjazd.data_rozpoczecia,
            data_zakonczenia=created_wyjazd.data_zakonczenia,
            kwota=created_wyjazd.kwota,
            deleted=created_wyjazd.deleted,
            created_at=created_wyjazd.created_at,
            updated_at=created_wyjazd.updated_at
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/wyjazdy/{wyjazd_id}", response_model=WyjazdResponse)
@limiter.limit("60/minute")
async def update_wyjazd(
    request: Request,
    wyjazd_id: int,
    wyjazd_data: WyjazdCreate,
    wyjazd_service: WyjazdService = Depends(get_wyjazd_service),
    current_user: User = Depends(get_current_user)
):
    """Aktualizuje wyjazd (wymaga zalogowania)"""
    try:
        # Konwertuj stringi na datetime
        data_rozpoczecia = datetime.strptime(wyjazd_data.data_rozpoczecia, "%m-%d-%Y")
        data_zakonczenia = datetime.strptime(wyjazd_data.data_zakonczenia, "%m-%d-%Y")
        
        wyjazd = Wyjazd(
            id=wyjazd_id,
            tytul=wyjazd_data.tytul,
            opis=wyjazd_data.opis,
            miejsce=wyjazd_data.miejsce,
            data_rozpoczecia=data_rozpoczecia,
            data_zakonczenia=data_zakonczenia,
            kwota=wyjazd_data.kwota
        )
        
        updated_wyjazd = wyjazd_service.update_wyjazd(wyjazd)
        
        return WyjazdResponse(
            id=updated_wyjazd.id,
            tytul=updated_wyjazd.tytul,
            opis=updated_wyjazd.opis,
            miejsce=updated_wyjazd.miejsce,
            data_rozpoczecia=updated_wyjazd.data_rozpoczecia,
            data_zakonczenia=updated_wyjazd.data_zakonczenia,
            kwota=updated_wyjazd.kwota,
            deleted=updated_wyjazd.deleted,
            created_at=updated_wyjazd.created_at,
            updated_at=updated_wyjazd.updated_at
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/wyjazdy/{wyjazd_id}")
@limiter.limit("60/minute")
def delete_wyjazd(
    request: Request,
    wyjazd_id: int,
    wyjazd_service: WyjazdService = Depends(get_wyjazd_service),
    current_user: User = Depends(get_current_user)
):
    """Usuwa (ukrywa) wyjazd (wymaga zalogowania)"""
    success = wyjazd_service.delete_wyjazd(wyjazd_id)
    if not success:
        raise HTTPException(status_code=404, detail="Wyjazd nie został znaleziony")
    return {"message": "Wyjazd został usunięty"}

# Endpointy dla komendy
@app.get("/komenda", response_model=List[KomendaResponse])
def list_komenda(
    komenda_service: KomendaService = Depends(get_komenda_service)
):
    """Listuje wszystkich członków komendy"""
    komenda = komenda_service.get_all_komenda()
    
    return [
        KomendaResponse(
            id=member.id,
            stopien=member.stopien,
            imie=member.imie,
            nazwisko=member.nazwisko,
            ksywka=member.ksywka,
            deleted=member.deleted,
            created_at=member.created_at,
            updated_at=member.updated_at
        )
        for member in komenda
    ]

@app.post("/komenda", response_model=KomendaResponse)
@limiter.limit("60/minute")
async def create_komenda(
    request: Request,
    komenda_data: KomendaCreate,
    komenda_service: KomendaService = Depends(get_komenda_service),
    current_user: User = Depends(get_current_user)
):
    """Tworzy nowego członka komendy (wymaga zalogowania)"""
    try:
        komenda = Komenda(
            stopien=komenda_data.stopien,
            imie=komenda_data.imie,
            nazwisko=komenda_data.nazwisko,
            ksywka=komenda_data.ksywka
        )
        
        created_komenda = komenda_service.create_komenda(komenda)
        
        return KomendaResponse(
            id=created_komenda.id,
            stopien=created_komenda.stopien,
            imie=created_komenda.imie,
            nazwisko=created_komenda.nazwisko,
            ksywka=created_komenda.ksywka,
            deleted=created_komenda.deleted,
            created_at=created_komenda.created_at,
            updated_at=created_komenda.updated_at
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/komenda/{komenda_id}", response_model=KomendaResponse)
@limiter.limit("60/minute")
async def update_komenda(
    request: Request,
    komenda_id: int,
    komenda_data: KomendaCreate,
    komenda_service: KomendaService = Depends(get_komenda_service),
    current_user: User = Depends(get_current_user)
):
    """Aktualizuje członka komendy (wymaga zalogowania)"""
    try:
        komenda = Komenda(
            id=komenda_id,
            stopien=komenda_data.stopien,
            imie=komenda_data.imie,
            nazwisko=komenda_data.nazwisko,
            ksywka=komenda_data.ksywka
        )
        
        updated_komenda = komenda_service.update_komenda(komenda)
        
        return KomendaResponse(
            id=updated_komenda.id,
            stopien=updated_komenda.stopien,
            imie=updated_komenda.imie,
            nazwisko=updated_komenda.nazwisko,
            ksywka=updated_komenda.ksywka,
            deleted=updated_komenda.deleted,
            created_at=updated_komenda.created_at,
            updated_at=updated_komenda.updated_at
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/komenda/{komenda_id}")
@limiter.limit("60/minute")
def delete_komenda(
    request: Request,
    komenda_id: int,
    komenda_service: KomendaService = Depends(get_komenda_service),
    current_user: User = Depends(get_current_user)
):
    """Usuwa (ukrywa) członka komendy (wymaga zalogowania)"""
    success = komenda_service.delete_komenda(komenda_id)
    if not success:
        raise HTTPException(status_code=404, detail="Członek komendy nie został znaleziony")
    return {"message": "Członek komendy został usunięty"}

# Endpointy dla komisji rewizyjnej
@app.get("/komisja-rewizyjna", response_model=List[KomisjaRewizyjnaResponse])
def list_komisja_rewizyjna(
    komisja_service: KomisjaRewizyjnaService = Depends(get_komisja_service)
):
    """Listuje wszystkich członków komisji rewizyjnej"""
    komisja = komisja_service.get_all_komisja()
    
    return [
        KomisjaRewizyjnaResponse(
            id=member.id,
            stopien=member.stopien,
            imie=member.imie,
            nazwisko=member.nazwisko,
            ksywka=member.ksywka,
            deleted=member.deleted,
            created_at=member.created_at,
            updated_at=member.updated_at
        )
        for member in komisja
    ]

@app.post("/komisja-rewizyjna", response_model=KomisjaRewizyjnaResponse)
@limiter.limit("60/minute")
async def create_komisja_rewizyjna(
    request: Request,
    komisja_data: KomisjaRewizyjnaCreate,
    komisja_service: KomisjaRewizyjnaService = Depends(get_komisja_service),
    current_user: User = Depends(get_current_user)
):
    """Tworzy nowego członka komisji rewizyjnej (wymaga zalogowania)"""
    try:
        komisja = KomisjaRewizyjna(
            stopien=komisja_data.stopien,
            imie=komisja_data.imie,
            nazwisko=komisja_data.nazwisko,
            ksywka=komisja_data.ksywka
        )
        
        created_komisja = komisja_service.create_komisja(komisja)
        
        return KomisjaRewizyjnaResponse(
            id=created_komisja.id,
            stopien=created_komisja.stopien,
            imie=created_komisja.imie,
            nazwisko=created_komisja.nazwisko,
            ksywka=created_komisja.ksywka,
            deleted=created_komisja.deleted,
            created_at=created_komisja.created_at,
            updated_at=created_komisja.updated_at
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/komisja-rewizyjna/{komisja_id}", response_model=KomisjaRewizyjnaResponse)
@limiter.limit("60/minute")
async def update_komisja_rewizyjna(
    request: Request,
    komisja_id: int,
    komisja_data: KomisjaRewizyjnaCreate,
    komisja_service: KomisjaRewizyjnaService = Depends(get_komisja_service),
    current_user: User = Depends(get_current_user)
):
    """Aktualizuje członka komisji rewizyjnej (wymaga zalogowania)"""
    try:
        komisja = KomisjaRewizyjna(
            id=komisja_id,
            stopien=komisja_data.stopien,
            imie=komisja_data.imie,
            nazwisko=komisja_data.nazwisko,
            ksywka=komisja_data.ksywka
        )
        
        updated_komisja = komisja_service.update_komisja(komisja)
        
        return KomisjaRewizyjnaResponse(
            id=updated_komisja.id,
            stopien=updated_komisja.stopien,
            imie=updated_komisja.imie,
            nazwisko=updated_komisja.nazwisko,
            ksywka=updated_komisja.ksywka,
            deleted=updated_komisja.deleted,
            created_at=updated_komisja.created_at,
            updated_at=updated_komisja.updated_at
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/komisja-rewizyjna/{komisja_id}")
@limiter.limit("60/minute")
def delete_komisja_rewizyjna(
    request: Request,
    komisja_id: int,
    komisja_service: KomisjaRewizyjnaService = Depends(get_komisja_service),
    current_user: User = Depends(get_current_user)
):
    """Usuwa (ukrywa) członka komisji rewizyjnej (wymaga zalogowania)"""
    success = komisja_service.delete_komisja(komisja_id)
    if not success:
        raise HTTPException(status_code=404, detail="Członek komisji rewizyjnej nie został znaleziony")
    return {"message": "Członek komisji rewizyjnej został usunięty"}

# Health check
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "ls-web-api"}

@app.get("/test-auth")
async def test_auth(current_user: User = Depends(get_current_user)):
    """Test endpoint to check if authentication is working"""
    return {
        "message": "Authentication successful",
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "name": current_user.name,
            "roles": current_user.roles,
            "is_active": current_user.is_active
        }
    } 