from dataclasses import dataclass
from typing import Optional
from datetime import datetime

@dataclass
class Druzyna:
    """Model drużyny w warstwie domain"""
    id: Optional[int] = None
    nazwa: str = ""
    opis: str = ""
    link: str = ""
    miasto: str = ""
    dzielnica: str = ""
    dokladny_adres: str = ""
    pinezka: str = ""  # Format: "54.411705, 18.556049"
    deleted: bool = False
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None 