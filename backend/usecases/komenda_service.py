from typing import List
from domain.komenda import Komenda
from domain.interfaces import KomendaRepository

class KomendaService:
    def __init__(self, komenda_repository: KomendaRepository):
        self.komenda_repository = komenda_repository
    
    def create_komenda(self, komenda: Komenda) -> Komenda:
        """Tworzy nowego członka komendy"""
        return self.komenda_repository.create_komenda(komenda)
    
    def get_komenda_by_id(self, id: int) -> Komenda:
        """Pobiera członka komendy po ID"""
        komenda = self.komenda_repository.get_by_id(id)
        if not komenda:
            raise ValueError("Członek komendy nie został znaleziony")
        return komenda
    
    def get_all_komenda(self) -> List[Komenda]:
        """Pobiera wszystkich członków komendy"""
        return self.komenda_repository.get_all()
    
    def update_komenda(self, komenda: Komenda) -> Komenda:
        """Aktualizuje członka komendy"""
        return self.komenda_repository.update_komenda(komenda)
    
    def delete_komenda(self, id: int) -> bool:
        """Usuwa (ukrywa) członka komendy"""
        return self.komenda_repository.delete_komenda(id) 