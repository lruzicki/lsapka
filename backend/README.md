# LS Web Backend

Backend API dla systemu Leśna Szkołka zbudowany w FastAPI z czystą architekturą.

## Struktura projektu

```
backend/
├── domain/                    # Warstwa domeny
│   ├── __init__.py
│   ├── interfaces.py          # Interfejsy abstrakcji
│   ├── user.py               # Model użytkownika
│   ├── druzyna.py            # Model drużyny
│   ├── wyjazd.py             # Model wyjazdu
│   ├── komenda.py            # Model komendy
│   └── komisja_rewizyjna.py  # Model komisji rewizyjnej
├── infrastructure/            # Warstwa infrastruktury
│   ├── __init__.py
│   ├── database.py           # Konfiguracja bazy danych
│   ├── db_models.py          # Modele SQLAlchemy
│   └── auth_service.py       # Serwis autoryzacji Azure AD
├── repositories/              # Warstwa repozytoriów
│   ├── __init__.py
│   ├── druzyna_repository.py
│   ├── wyjazd_repository.py
│   ├── komenda_repository.py
│   ├── komisja_rewizyjna_repository.py
│   └── user_repository.py
├── usecases/                  # Warstwa przypadków użycia
│   ├── __init__.py
│   ├── druzyna_service.py
│   ├── wyjazd_service.py
│   ├── komenda_service.py
│   ├── komisja_rewizyjna_service.py
│   └── user_service.py
├── middleware/                # Middleware
│   ├── __init__.py
│   └── auth_middleware.py    # Autoryzacja
├── main.py                   # Główny plik aplikacji
├── schemas.py                # Schematy Pydantic
├── requirements.txt          # Zależności Python
├── Dockerfile               # Konfiguracja Docker
└── README.md                # Ten plik
```

## Encje

### Drużyna
- **Pola**: nazwa, numer, opis, link, miasto, dzielnica, dokładny adres, pinezka
- **Endpointy**: POST, PUT, DELETE, GET (grupowane przez pinezkę)

### Wyjazd
- **Pola**: tytuł, opis, miejsce, data rozpoczęcia, data zakończenia, kwota
- **Endpointy**: POST, PUT, DELETE, GET (nadchodzące)

### Komenda
- **Pola**: stopień, imię, nazwisko, ksywka
- **Endpointy**: POST, PUT, DELETE, GET

### Komisja Rewizyjna
- **Pola**: stopień, imię, nazwisko, ksywka
- **Endpointy**: POST, PUT, DELETE, GET

## Autoryzacja

System używa Azure AD do autoryzacji. Wszystkie endpointy POST, PUT, DELETE wymagają zalogowania.

## Uruchomienie

### Lokalnie
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

### Docker
```bash
docker build -t ls-web-backend .
docker run -p 8001:8001 ls-web-backend
```

## Zmienne środowiskowe

Utwórz plik `.env` z następującymi zmiennymi:

```env
DATABASE_URL=postgresql://ino_user:ino_password@postgres:5432/ino_db
AZURE_AD_CLIENT_ID=your_azure_client_id
AZURE_AD_CLIENT_SECRET=your_azure_client_secret
AZURE_AD_TENANT_ID=your_azure_tenant_id
JWT_SECRET_KEY=your_jwt_secret_key
```

## API Endpoints

### Autoryzacja
- `POST /auth/azure-login` - Logowanie przez Azure AD
- `GET /auth/me` - Informacje o aktualnym użytkowniku

### Drużyny
- `GET /druzyny` - Lista drużyn pogrupowanych przez pinezkę
- `POST /druzyny` - Tworzenie nowej drużyny
- `PUT /druzyny/{id}` - Aktualizacja drużyny
- `DELETE /druzyny/{id}` - Usunięcie drużyny

### Wyjazdy
- `GET /wyjazdy/upcoming` - Lista nadchodzących wyjazdów
- `POST /wyjazdy` - Tworzenie nowego wyjazdu
- `PUT /wyjazdy/{id}` - Aktualizacja wyjazdu
- `DELETE /wyjazdy/{id}` - Usunięcie wyjazdu

### Komenda
- `GET /komenda` - Lista członków komendy
- `POST /komenda` - Dodanie członka komendy
- `PUT /komenda/{id}` - Aktualizacja członka komendy
- `DELETE /komenda/{id}` - Usunięcie członka komendy

### Komisja Rewizyjna
- `GET /komisja-rewizyjna` - Lista członków komisji rewizyjnej
- `POST /komisja-rewizyjna` - Dodanie członka komisji rewizyjnej
- `PUT /komisja-rewizyjna/{id}` - Aktualizacja członka komisji rewizyjnej
- `DELETE /komisja-rewizyjna/{id}` - Usunięcie członka komisji rewizyjnej

### Health Check
- `GET /health` - Sprawdzenie stanu API 