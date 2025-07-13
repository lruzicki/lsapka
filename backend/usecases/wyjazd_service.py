from typing import List
from domain.wyjazd import Wyjazd
from domain.interfaces import WyjazdRepository

class WyjazdService:
    def __init__(self, wyjazd_repository: WyjazdRepository):
        self.wyjazd_repository = wyjazd_repository
    
    def create_wyjazd(self, wyjazd: Wyjazd) -> Wyjazd:
        """Tworzy nowy wyjazd"""
        return self.wyjazd_repository.create_wyjazd(wyjazd)
    
    def get_wyjazd_by_id(self, id: int) -> Wyjazd:
        """Pobiera wyjazd po ID"""
        wyjazd = self.wyjazd_repository.get_by_id(id)
        if not wyjazd:
            raise ValueError("Wyjazd nie został znaleziony")
        return wyjazd
    
    def get_upcoming_wyjazdy(self) -> List[Wyjazd]:
        """Pobiera nadchodzące wyjazdy"""
        return self.wyjazd_repository.get_upcoming()
    
    def update_wyjazd(self, wyjazd: Wyjazd) -> Wyjazd:
        """Aktualizuje wyjazd"""
        return self.wyjazd_repository.update_wyjazd(wyjazd)
    
    def delete_wyjazd(self, id: int) -> bool:
        """Usuwa (ukrywa) wyjazd"""
        return self.wyjazd_repository.delete_wyjazd(id) 