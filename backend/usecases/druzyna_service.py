from typing import Dict
from domain.druzyna import Druzyna
from domain.interfaces import DruzynaRepository

class DruzynaService:
    def __init__(self, druzyna_repository: DruzynaRepository):
        self.druzyna_repository = druzyna_repository
    
    def create_druzyna(self, druzyna: Druzyna) -> Druzyna:
        """Tworzy nową drużynę"""
        return self.druzyna_repository.create_druzyna(druzyna)
    
    def get_druzyna_by_id(self, id: int) -> Druzyna:
        """Pobiera drużynę po ID"""
        druzyna = self.druzyna_repository.get_by_id(id)
        if not druzyna:
            raise ValueError("Drużyna nie została znaleziona")
        return druzyna
    
    def get_all_by_pinezka(self) -> Dict:
        """Pobiera wszystkie drużyny pogrupowane przez pinezkę"""
        return self.druzyna_repository.get_all_by_pinezka()
    
    def update_druzyna(self, druzyna: Druzyna) -> Druzyna:
        """Aktualizuje drużynę"""
        return self.druzyna_repository.update_druzyna(druzyna)
    
    def delete_druzyna(self, id: int) -> bool:
        """Usuwa (ukrywa) drużynę"""
        return self.druzyna_repository.delete_druzyna(id) 