from typing import List
from domain.komisja_rewizyjna import KomisjaRewizyjna
from domain.interfaces import KomisjaRewizyjnaRepository

class KomisjaRewizyjnaService:
    def __init__(self, komisja_repository: KomisjaRewizyjnaRepository):
        self.komisja_repository = komisja_repository
    
    def create_komisja(self, komisja: KomisjaRewizyjna) -> KomisjaRewizyjna:
        """Tworzy nowego członka komisji rewizyjnej"""
        return self.komisja_repository.create_komisja(komisja)
    
    def get_komisja_by_id(self, id: int) -> KomisjaRewizyjna:
        """Pobiera członka komisji rewizyjnej po ID"""
        komisja = self.komisja_repository.get_by_id(id)
        if not komisja:
            raise ValueError("Członek komisji rewizyjnej nie został znaleziony")
        return komisja
    
    def get_all_komisja(self) -> List[KomisjaRewizyjna]:
        """Pobiera wszystkich członków komisji rewizyjnej"""
        return self.komisja_repository.get_all()
    
    def update_komisja(self, komisja: KomisjaRewizyjna) -> KomisjaRewizyjna:
        """Aktualizuje członka komisji rewizyjnej"""
        return self.komisja_repository.update_komisja(komisja)
    
    def delete_komisja(self, id: int) -> bool:
        """Usuwa (ukrywa) członka komisji rewizyjnej"""
        return self.komisja_repository.delete_komisja(id) 