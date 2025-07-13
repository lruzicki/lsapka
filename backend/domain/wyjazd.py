from dataclasses import dataclass
from typing import Optional
from datetime import datetime

@dataclass
class Wyjazd:
    """Model wyjazdu w warstwie domain"""
    id: Optional[int] = None
    tytul: str = ""
    opis: str = ""
    miejsce: str = ""
    data_rozpoczecia: datetime = None
    data_zakonczenia: datetime = None
    kwota: float = 0.0
    deleted: bool = False
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None 