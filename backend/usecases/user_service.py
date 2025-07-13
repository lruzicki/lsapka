from domain.user import User
from domain.interfaces import UserRepository, AuthService

class UserService:
    def __init__(self, user_repository: UserRepository, auth_service: AuthService):
        self.user_repository = user_repository
        self.auth_service = auth_service
    
    async def authenticate_with_azure(self, code: str) -> User:
        """Autoryzacja przez Azure AD"""
        # Tutaj implementacja wymiany kodu na token Azure AD
        # To jest uproszczona wersja - w rzeczywistości potrzebujesz wymiany kodu na token
        pass
    
    def create_token(self, user: User) -> str:
        """Tworzy token JWT dla użytkownika"""
        return self.auth_service.create_token(user) 