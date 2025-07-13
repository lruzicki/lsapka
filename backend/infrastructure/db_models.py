from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, Text, ForeignKey
from sqlalchemy.sql import func
from .database import Base

class DruzynaModel(Base):
    """Model bazy danych dla drużyn"""
    __tablename__ = "druzyny"

    id = Column(Integer, primary_key=True, index=True)
    nazwa = Column(String, nullable=True)
    opis = Column(Text, nullable=True)
    link = Column(String, nullable=True)
    miasto = Column(String, nullable=True)
    dzielnica = Column(String, nullable=True)
    dokladny_adres = Column(String, nullable=True)
    pinezka = Column(String, nullable=True)  # Format: "54.411705, 18.556049"
    deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class WyjazdModel(Base):
    """Model bazy danych dla wyjazdów"""
    __tablename__ = "wyjazdy"

    id = Column(Integer, primary_key=True, index=True)
    tytul = Column(String, nullable=False)
    opis = Column(Text, nullable=True)
    miejsce = Column(String, nullable=False)
    data_rozpoczecia = Column(DateTime, nullable=False)
    data_zakonczenia = Column(DateTime, nullable=False)
    kwota = Column(Float, nullable=True)
    deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class KomendaModel(Base):
    """Model bazy danych dla komendy"""
    __tablename__ = "komenda"

    id = Column(Integer, primary_key=True, index=True)
    stopien = Column(String, nullable=False)
    imie = Column(String, nullable=False)
    nazwisko = Column(String, nullable=False)
    ksywka = Column(String, nullable=True)
    deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class KomisjaRewizyjnaModel(Base):
    """Model bazy danych dla komisji rewizyjnej"""
    __tablename__ = "komisja_rewizyjna"

    id = Column(Integer, primary_key=True, index=True)
    stopien = Column(String, nullable=False)
    imie = Column(String, nullable=False)
    nazwisko = Column(String, nullable=False)
    ksywka = Column(String, nullable=True)
    deleted = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class UserModel(Base):
    """Model bazy danych dla użytkowników"""
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)  # Azure AD Object ID
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    roles = Column(Text, nullable=False)  # JSON string z listą ról
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now()) 