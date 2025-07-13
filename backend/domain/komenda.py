from dataclasses import dataclass
from typing import Optional
from datetime import datetime

@dataclass
class Komenda:
    """Model komendy w warstwie domain"""
    id: Optional[int] = None
    stopien: str = ""
    imie: str = ""
    nazwisko: str = ""
    ksywka: str = ""
    deleted: bool = False
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None 