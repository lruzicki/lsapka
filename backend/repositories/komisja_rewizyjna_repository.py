import json
from typing import List, Optional
from sqlalchemy.orm import Session
from domain.komisja_rewizyjna import KomisjaRewizyjna
from domain.interfaces import KomisjaRewizyjnaRepository
from infrastructure.db_models import KomisjaRewizyjnaModel

class SqlAlchemyKomisjaRewizyjnaRepository(KomisjaRewizyjnaRepository):
    def __init__(self, db: Session):
        self.db = db
    
    def create_komisja(self, komisja: KomisjaRewizyjna) -> KomisjaRewizyjna:
        db_komisja = KomisjaRewizyjnaModel(
            stopien=komisja.stopien,
            imie=komisja.imie,
            nazwisko=komisja.nazwisko,
            ksywka=komisja.ksywka
        )
        self.db.add(db_komisja)
        self.db.commit()
        self.db.refresh(db_komisja)
        
        return KomisjaRewizyjna(
            id=db_komisja.id,
            stopien=db_komisja.stopien,
            imie=db_komisja.imie,
            nazwisko=db_komisja.nazwisko,
            ksywka=db_komisja.ksywka,
            deleted=db_komisja.deleted,
            created_at=db_komisja.created_at,
            updated_at=db_komisja.updated_at
        )
    
    def get_by_id(self, id: int) -> Optional[KomisjaRewizyjna]:
        db_komisja = self.db.query(KomisjaRewizyjnaModel).filter(
            KomisjaRewizyjnaModel.id == id,
            KomisjaRewizyjnaModel.deleted == False
        ).first()
        
        if not db_komisja:
            return None
        
        return KomisjaRewizyjna(
            id=db_komisja.id,
            stopien=db_komisja.stopien,
            imie=db_komisja.imie,
            nazwisko=db_komisja.nazwisko,
            ksywka=db_komisja.ksywka,
            deleted=db_komisja.deleted,
            created_at=db_komisja.created_at,
            updated_at=db_komisja.updated_at
        )
    
    def get_all(self) -> List[KomisjaRewizyjna]:
        db_komisja = self.db.query(KomisjaRewizyjnaModel).filter(
            KomisjaRewizyjnaModel.deleted == False
        ).all()
        
        return [
            KomisjaRewizyjna(
                id=db_komisja_item.id,
                stopien=db_komisja_item.stopien,
                imie=db_komisja_item.imie,
                nazwisko=db_komisja_item.nazwisko,
                ksywka=db_komisja_item.ksywka,
                deleted=db_komisja_item.deleted,
                created_at=db_komisja_item.created_at,
                updated_at=db_komisja_item.updated_at
            )
            for db_komisja_item in db_komisja
        ]
    
    def update_komisja(self, komisja: KomisjaRewizyjna) -> KomisjaRewizyjna:
        db_komisja = self.db.query(KomisjaRewizyjnaModel).filter(
            KomisjaRewizyjnaModel.id == komisja.id,
            KomisjaRewizyjnaModel.deleted == False
        ).first()
        
        if not db_komisja:
            raise ValueError("Komisja rewizyjna nie została znaleziona")
        
        db_komisja.stopien = komisja.stopien
        db_komisja.imie = komisja.imie
        db_komisja.nazwisko = komisja.nazwisko
        db_komisja.ksywka = komisja.ksywka
        
        self.db.commit()
        self.db.refresh(db_komisja)
        
        return KomisjaRewizyjna(
            id=db_komisja.id,
            stopien=db_komisja.stopien,
            imie=db_komisja.imie,
            nazwisko=db_komisja.nazwisko,
            ksywka=db_komisja.ksywka,
            deleted=db_komisja.deleted,
            created_at=db_komisja.created_at,
            updated_at=db_komisja.updated_at
        )
    
    def delete_komisja(self, id: int) -> bool:
        db_komisja = self.db.query(KomisjaRewizyjnaModel).filter(
            KomisjaRewizyjnaModel.id == id,
            KomisjaRewizyjnaModel.deleted == False
        ).first()
        
        if not db_komisja:
            return False
        
        db_komisja.deleted = True
        self.db.commit()
        return True 