from abc import ABC, abstractmethod
from typing import List, Optional
from .druzyna import Druzyna
from .wyjazd import Wyjazd
from .komenda import Komenda
from .komisja_rewizyjna import KomisjaRewizyjna
from .user import User

class DruzynaRepository(ABC):
    @abstractmethod
    def create_druzyna(self, druzyna: Druzyna) -> Druzyna:
        pass
    
    @abstractmethod
    def get_by_id(self, id: int) -> Optional[Druzyna]:
        pass
    
    @abstractmethod
    def get_all_by_pinezka(self) -> dict:
        pass
    
    @abstractmethod
    def update_druzyna(self, druzyna: Druzyna) -> Druzyna:
        pass
    
    @abstractmethod
    def delete_druzyna(self, id: int) -> bool:
        pass

class WyjazdRepository(ABC):
    @abstractmethod
    def create_wyjazd(self, wyjazd: Wyjazd) -> Wyjazd:
        pass
    
    @abstractmethod
    def get_by_id(self, id: int) -> Optional[Wyjazd]:
        pass
    
    @abstractmethod
    def get_upcoming(self) -> List[Wyjazd]:
        pass
    
    @abstractmethod
    def update_wyjazd(self, wyjazd: Wyjazd) -> Wyjazd:
        pass
    
    @abstractmethod
    def delete_wyjazd(self, id: int) -> bool:
        pass

class KomendaRepository(ABC):
    @abstractmethod
    def create_komenda(self, komenda: Komenda) -> Komenda:
        pass
    
    @abstractmethod
    def get_by_id(self, id: int) -> Optional[Komenda]:
        pass
    
    @abstractmethod
    def get_all(self) -> List[Komenda]:
        pass
    
    @abstractmethod
    def update_komenda(self, komenda: Komenda) -> Komenda:
        pass
    
    @abstractmethod
    def delete_komenda(self, id: int) -> bool:
        pass

class KomisjaRewizyjnaRepository(ABC):
    @abstractmethod
    def create_komisja(self, komisja: KomisjaRewizyjna) -> KomisjaRewizyjna:
        pass
    
    @abstractmethod
    def get_by_id(self, id: int) -> Optional[KomisjaRewizyjna]:
        pass
    
    @abstractmethod
    def get_all(self) -> List[KomisjaRewizyjna]:
        pass
    
    @abstractmethod
    def update_komisja(self, komisja: KomisjaRewizyjna) -> KomisjaRewizyjna:
        pass
    
    @abstractmethod
    def delete_komisja(self, id: int) -> bool:
        pass

class UserRepository(ABC):
    @abstractmethod
    def get_by_id(self, id: str) -> Optional[User]:
        pass
    
    @abstractmethod
    def get_by_email(self, email: str) -> Optional[User]:
        pass
    
    @abstractmethod
    def create_user(self, user: User) -> User:
        pass

class AuthService(ABC):
    @abstractmethod
    async def verify_azure_token(self, token: str) -> Optional[User]:
        pass 