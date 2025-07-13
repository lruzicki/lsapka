from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime
from domain.wyjazd import Wyjazd
from domain.interfaces import WyjazdRepository
from infrastructure.db_models import WyjazdModel

class SqlAlchemyWyjazdRepository(WyjazdRepository):
    def __init__(self, db: Session):
        self.db = db
    
    def create_wyjazd(self, wyjazd: Wyjazd) -> Wyjazd:
        db_wyjazd = WyjazdModel(
            tytul=wyjazd.tytul,
            opis=wyjazd.opis,
            miejsce=wyjazd.miejsce,
            data_rozpoczecia=wyjazd.data_rozpoczecia,
            data_zakonczenia=wyjazd.data_zakonczenia,
            kwota=wyjazd.kwota
        )
        self.db.add(db_wyjazd)
        self.db.commit()
        self.db.refresh(db_wyjazd)
        
        return Wyjazd(
            id=db_wyjazd.id,
            tytul=db_wyjazd.tytul,
            opis=db_wyjazd.opis,
            miejsce=db_wyjazd.miejsce,
            data_rozpoczecia=db_wyjazd.data_rozpoczecia,
            data_zakonczenia=db_wyjazd.data_zakonczenia,
            kwota=db_wyjazd.kwota,
            deleted=db_wyjazd.deleted,
            created_at=db_wyjazd.created_at,
            updated_at=db_wyjazd.updated_at
        )
    
    def get_by_id(self, id: int) -> Optional[Wyjazd]:
        db_wyjazd = self.db.query(WyjazdModel).filter(
            WyjazdModel.id == id,
            WyjazdModel.deleted == False
        ).first()
        
        if not db_wyjazd:
            return None
        
        return Wyjazd(
            id=db_wyjazd.id,
            tytul=db_wyjazd.tytul,
            opis=db_wyjazd.opis,
            miejsce=db_wyjazd.miejsce,
            data_rozpoczecia=db_wyjazd.data_rozpoczecia,
            data_zakonczenia=db_wyjazd.data_zakonczenia,
            kwota=db_wyjazd.kwota,
            deleted=db_wyjazd.deleted,
            created_at=db_wyjazd.created_at,
            updated_at=db_wyjazd.updated_at
        )
    
    def get_upcoming(self) -> List[Wyjazd]:
        now = datetime.now()
        db_wyjazdy = self.db.query(WyjazdModel).filter(
            WyjazdModel.deleted == False,
            WyjazdModel.data_rozpoczecia > now
        ).order_by(WyjazdModel.data_rozpoczecia).all()
        
        return [
            Wyjazd(
                id=db_wyjazd.id,
                tytul=db_wyjazd.tytul,
                opis=db_wyjazd.opis,
                miejsce=db_wyjazd.miejsce,
                data_rozpoczecia=db_wyjazd.data_rozpoczecia,
                data_zakonczenia=db_wyjazd.data_zakonczenia,
                kwota=db_wyjazd.kwota,
                deleted=db_wyjazd.deleted,
                created_at=db_wyjazd.created_at,
                updated_at=db_wyjazd.updated_at
            )
            for db_wyjazd in db_wyjazdy
        ]
    
    def update_wyjazd(self, wyjazd: Wyjazd) -> Wyjazd:
        db_wyjazd = self.db.query(WyjazdModel).filter(
            WyjazdModel.id == wyjazd.id,
            WyjazdModel.deleted == False
        ).first()
        
        if not db_wyjazd:
            raise ValueError("Wyjazd nie został znaleziony")
        
        db_wyjazd.tytul = wyjazd.tytul
        db_wyjazd.opis = wyjazd.opis
        db_wyjazd.miejsce = wyjazd.miejsce
        db_wyjazd.data_rozpoczecia = wyjazd.data_rozpoczecia
        db_wyjazd.data_zakonczenia = wyjazd.data_zakonczenia
        db_wyjazd.kwota = wyjazd.kwota
        
        self.db.commit()
        self.db.refresh(db_wyjazd)
        
        return Wyjazd(
            id=db_wyjazd.id,
            tytul=db_wyjazd.tytul,
            opis=db_wyjazd.opis,
            miejsce=db_wyjazd.miejsce,
            data_rozpoczecia=db_wyjazd.data_rozpoczecia,
            data_zakonczenia=db_wyjazd.data_zakonczenia,
            kwota=db_wyjazd.kwota,
            deleted=db_wyjazd.deleted,
            created_at=db_wyjazd.created_at,
            updated_at=db_wyjazd.updated_at
        )
    
    def delete_wyjazd(self, id: int) -> bool:
        db_wyjazd = self.db.query(WyjazdModel).filter(
            WyjazdModel.id == id,
            WyjazdModel.deleted == False
        ).first()
        
        if not db_wyjazd:
            return False
        
        db_wyjazd.deleted = True
        self.db.commit()
        return True 