from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

# Schematy dla drużyn
class DruzynaCreate(BaseModel):
    nazwa: Optional[str] = None
    opis: Optional[str] = None
    link: Optional[str] = None
    miasto: Optional[str] = None
    dzielnica: Optional[str] = None
    dokladny_adres: Optional[str] = None
    pinezka: Optional[str] = None  # Format: "54.411705, 18.556049"

class DruzynaResponse(BaseModel):
    id: int
    nazwa: Optional[str] = None
    opis: Optional[str] = None
    link: Optional[str] = None
    miasto: Optional[str] = None
    dzielnica: Optional[str] = None
    dokladny_adres: Optional[str] = None
    pinezka: Optional[str] = None  # Format: "54.411705, 18.556049"
    deleted: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

class DruzynaGroupedResponse(BaseModel):
    pinezka: str
    druzyny: List[DruzynaResponse]

# Schematy dla wyjazdów
class WyjazdCreate(BaseModel):
    tytul: str
    opis: str = ""
    miejsce: str
    data_rozpoczecia: str  # mm-dd-yyyy format
    data_zakonczenia: str  # mm-dd-yyyy format
    kwota: float = 0.0

class WyjazdResponse(BaseModel):
    id: int
    tytul: str
    opis: str
    miejsce: str
    data_rozpoczecia: datetime
    data_zakonczenia: datetime
    kwota: float
    deleted: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

# Schematy dla komendy
class KomendaCreate(BaseModel):
    stopien: str
    imie: str
    nazwisko: str
    ksywka: str = ""

class KomendaResponse(BaseModel):
    id: int
    stopien: str
    imie: str
    nazwisko: str
    ksywka: str
    deleted: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

# Schematy dla komisji rewizyjnej
class KomisjaRewizyjnaCreate(BaseModel):
    stopien: str
    imie: str
    nazwisko: str
    ksywka: str = ""

class KomisjaRewizyjnaResponse(BaseModel):
    id: int
    stopien: str
    imie: str
    nazwisko: str
    ksywka: str
    deleted: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

# Schematy dla użytkowników
class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    roles: List[str]
    is_active: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class AzureLoginRequest(BaseModel):
    code: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    token: Optional[str] = None
    user: Optional[UserResponse] = None


class Anniversary45AccessRequest(BaseModel):
    password: str


class Anniversary45ScheduleItem(BaseModel):
    label: str
    value: str


class Anniversary45VenueCoordinates(BaseModel):
    lat: float
    lng: float


class Anniversary45Venue(BaseModel):
    name: str
    address: str
    coordinates: Anniversary45VenueCoordinates


class Anniversary45Image(BaseModel):
    src: str
    alt: str


class Anniversary45Content(BaseModel):
    title: str
    intro: str
    body: List[str]
    schedule: List[Anniversary45ScheduleItem]
    venue: Anniversary45Venue
    hero_image: Anniversary45Image
    gallery: List[Anniversary45Image]


class Anniversary45EncryptedResponse(BaseModel):
    salt: str
    iv: str
    ciphertext: str
