from models.db import db
class Categoria(db.Model):
    __tablename__= 'categorias'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False, unique=True)
    
    medicamentos = db.relationship('Medicamento', backref='categorias', lazy=True)
    
    def a_json(self):
        return{
            'id':self.id,
            'nombre':self.nombre
        }