

W skrócie, są dwa repozytoria. W azure jest aplikacja. Z jej glownego poziomu uzywasz configa do dockera, który buduje wszystkie serwisy.

# INO - Impreza na Orientację - Deployment Guide

## Azure Portal Setup

1. **Link do Azure Portal**: [https://portal.azure.com](https://portal.azure.com/#home)
2. **Wybór serwisu**: `ls-web-app` (Virtual Machine)
<img width="1131" height="806" alt="image" src="https://github.com/user-attachments/assets/7675262e-671f-42fa-87d4-738bec38efcc" />

3. **Połączenie przez SSH w przeglądarce**: 
   - W Azure Portal → Virtual Machines → ls-web-app
   - Kliknij "Connect" → "SSH" → "Connect"
<img width="516" height="276" alt="image" src="https://github.com/user-attachments/assets/5015918a-bf1b-4044-8376-f9f6fcd5db95" />
<img width="506" height="261" alt="image" src="https://github.com/user-attachments/assets/60bdf58f-272a-43b7-a10b-32460fe38026" />
<img width="700" height="560" alt="image" src="https://github.com/user-attachments/assets/1dfec680-bbbf-4a68-856b-a33804613db5" />

## Struktura folderów na serwerze
/home/azureuser/
├── inols/ # Frontend (Next.js + Tailwind)
├── lsapka/ # Backend API
├── docker-compose.production.yml
├── nginx-inols.conf
└── nginx-lsapka.conf


## Repozytoria GitHub

1. **Backend API**: https://github.com/lruzicki/lsapka
2. **Frontend**: https://github.com/lruzicki/inols

## Tech Stack

- **Frontend**: Next.js + Tailwind CSS
- **UI Components**: 
  - https://v0.app/ (AI-powered components)
  - https://ui.shadcn.com/docs/installation/next (shadcn/ui)

## Lokalny development

```bash
# Wejdź do folderu repozytorium
cd inols/

# Instalacja i uruchomienie
npm run tsc
npm i
npm run start
npm run dev
```

## Deployment na serwerze

### lsapka (Backend API)
```bash
# Z folderu lsapka/
sudo docker compose -f docker-compose.production.yml build lsapka 
sudo docker compose -f docker-compose.production.yml up -d lsapka 
```

### inols (Frontend)
```bash
# Z folderu głównego (zawierającego oba repozytoria)
sudo docker compose -f docker-compose.production.yml build inols_web api
sudo docker compose -f docker-compose.production.yml up -d inols_web api
```

## TODO List

- [ ] Dodać zapis archiwum wydarzeń aby były dodawane na dole
- [ ] Zmienić karuzele aby pobierała poprzednie wydarzenia a nie hardkodowane

## Uwagi

- lsapka ma ograniczenia pamięci - build lokalnie i deploy
- Używaj docker-compose.production.yml dla produkcji
- Nginx configs są w głównym folderze

---------------------------------------------------------------------
## Opis

Strona internetowa Niezależnego Kręgu Instruktorów Harcerskich "Leśna Szkółka" z pełnym systemem zarządzania treścią.

## Funkcjonalności

### Dashboard
- **Zarządzanie drużynami** - dodawanie, edycja, usuwanie drużyn z pogrupowaniem przez pinezki
- **Zarządzanie wyjazdami** - dodawanie, edycja, usuwanie nadchodzących wydarzeń
- **Zarządzanie komendą** - dodawanie, edycja, usuwanie członków komendy
- **Zarządzanie komisją rewizyjną** - dodawanie, edycja, usuwanie członków komisji rewizyjnej
- **Dokumenty** - zarządzanie dokumentami organizacji
- **Galerie** - zarządzanie galeriami zdjęć
- **Preliminarz** - zarządzanie budżetem
- **Pomysły** - zarządzanie pomysłami i inicjatywami

### Strona główna
- **Wydarzenia** - dynamiczne wyświetlanie nadchodzących wyjazdów z API
- **Mapa drużyn** - interaktywna mapa z drużynami pogrupowanymi przez pinezki
- **O nas** - wyświetlanie komendy i komisji rewizyjnej z API
- **Dokumenty** - link do sekcji dokumentów

## Technologie

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - typowanie
- **Tailwind CSS** - stylowanie
- **NextAuth.js** - autoryzacja przez Azure AD
- **Leaflet** - interaktywne mapy

### Backend
- **FastAPI** - Python API
- **SQLAlchemy** - ORM
- **PostgreSQL** - baza danych
- **Azure AD** - autoryzacja
- **Pydantic** - walidacja danych

## Struktura projektu

```
ls-web/
├── app/                    # Next.js aplikacja
│   ├── api/               # API routes (proxy do backendu)
│   ├── dashboard/         # Strony dashboardu
│   └── ...
├── backend/               # FastAPI backend
│   ├── domain/           # Modele domenowe
│   ├── infrastructure/   # Konfiguracja bazy danych
│   ├── repositories/     # Repozytoria
│   ├── usecases/         # Logika biznesowa
│   ├── middleware/       # Middleware autoryzacji
│   └── main.py          # Główny plik aplikacji
├── components/           # Komponenty React
└── ...
```

## Instalacja i uruchomienie

### Wymagania
- Docker i Docker Compose
- Node.js 18+
- Python 3.9+

### 1. Konfiguracja zmiennych środowiskowych

Utwórz plik `.env.local` w katalogu `ls-web/`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
AZURE_AD_CLIENT_ID=your_azure_ad_client_id
AZURE_AD_CLIENT_SECRET=your_azure_ad_client_secret
AZURE_AD_TENANT_ID=your_azure_ad_tenant_id
BIWAK_NOTIFICATION_EMAIL=your_email@example.com
API_BASE_URL=http://localhost:8001
```

Utwórz plik `.env` w katalogu `ls-web/backend/`:
```env
DATABASE_URL=postgresql://ino_user:ino_password@postgres:5432/ino_db
AZURE_AD_CLIENT_ID=your_azure_ad_client_id
AZURE_AD_CLIENT_SECRET=your_azure_ad_client_secret
AZURE_AD_TENANT_ID=your_azure_ad_tenant_id
JWT_SECRET=your_jwt_secret_key_here
```

### 2. Uruchomienie z Docker Compose

#### Lokalne testowanie (tylko ls-web)
```bash
# Uruchomienie tylko ls-web z własną bazą danych
docker-compose -f docker-compose.local.yml up -d

# Dostępne na:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8001
# - Baza danych: localhost:5432
```

#### Produkcja (cały stos)
```bash
# Uruchomienie całego stosu z nginx
docker-compose -f docker-compose.production.yml up -d
```

#### Zatrzymanie i czyszczenie
```bash
# Zatrzymanie lokalnego testowania
docker-compose -f docker-compose.local.yml down

# Zatrzymanie z usunięciem danych (baza danych zostanie wyczyszczona)
docker-compose -f docker-compose.local.yml down -v

# Zatrzymanie produkcji
docker-compose -f docker-compose.production.yml down
```

### 3. Uruchomienie lokalne

#### Backend
```bash
cd ls-web/backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

#### Frontend
```bash
cd ls-web
npm install
npm run dev
```

## API Endpoints

### Drużyny
- `GET /api/druzyny` - Pobierz wszystkie drużyny pogrupowane przez pinezki
- `POST /api/druzyny` - Dodaj nową drużynę (wymaga autoryzacji)
- `PUT /api/druzyny/{id}` - Edytuj drużynę (wymaga autoryzacji)
- `DELETE /api/druzyny/{id}` - Usuń drużynę (wymaga autoryzacji)

### Wyjazdy
- `GET /api/wyjazdy/upcoming` - Pobierz nadchodzące wyjazdy
- `POST /api/wyjazdy` - Dodaj nowy wyjazd (wymaga autoryzacji)
- `PUT /api/wyjazdy/{id}` - Edytuj wyjazd (wymaga autoryzacji)
- `DELETE /api/wyjazdy/{id}` - Usuń wyjazd (wymaga autoryzacji)

### Komenda
- `GET /api/komenda` - Pobierz wszystkich członków komendy
- `POST /api/komenda` - Dodaj członka komendy (wymaga autoryzacji)
- `PUT /api/komenda/{id}` - Edytuj członka komendy (wymaga autoryzacji)
- `DELETE /api/komenda/{id}` - Usuń członka komendy (wymaga autoryzacji)

### Komisja Rewizyjna
- `GET /api/komisja-rewizyjna` - Pobierz wszystkich członków komisji rewizyjnej
- `POST /api/komisja-rewizyjna` - Dodaj członka komisji rewizyjnej (wymaga autoryzacji)
- `PUT /api/komisja-rewizyjna/{id}` - Edytuj członka komisji rewizyjnej (wymaga autoryzacji)
- `DELETE /api/komisja-rewizyjna/{id}` - Usuń członka komisji rewizyjnej (wymaga autoryzacji)

## Autoryzacja

System używa Azure AD do autoryzacji. Wszystkie operacje modyfikujące dane (POST, PUT, DELETE) wymagają tokenu autoryzacyjnego.

## Baza danych

Aplikacja używa wspólnej bazy danych PostgreSQL z projektem inols. Tabele:
- `druzyny` - informacje o drużynach
- `wyjazdy` - informacje o wyjazdach
- `komenda` - członkowie komendy
- `komisja_rewizyjna` - członkowie komisji rewizyjnej
- `users` - użytkownicy systemu

## Deployment

Aplikacja jest skonfigurowana do uruchomienia w kontenerach Docker z nginx jako reverse proxy. Wszystkie usługi są zdefiniowane w `docker-compose.production.yml`.

## Rozwój

### Dodawanie nowych encji
1. Utwórz model domenowy w `backend/domain/`
2. Utwórz model bazy danych w `backend/infrastructure/db_models.py`
3. Utwórz repozytorium w `backend/repositories/`
4. Utwórz serwis w `backend/usecases/`
5. Dodaj endpointy w `backend/main.py`
6. Utwórz API routes w `app/api/`
7. Utwórz komponenty React w `components/`
8. Dodaj strony w `app/dashboard/`

