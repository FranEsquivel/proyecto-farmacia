from flask import jsonify,request
from models.db import db
from models.categoria import Categoria

def listar_categoria():
    categoria = Categoria.querry.all()
    data = [cat.a_json() for cat in categoria]
    
def obtener_categoria(id):
    categoria = Categoria.querry.get(id)
    if not categoria:
        return jsonify({"error": "Categoria no encontrada"}),404
    return jsonify(categoria.a_json()), 200

def crear_categoria():
    data = request.get_json or {}
    nombre = data.get('nombre', '').strip()
    
    if not nombre:
        return jsonify({"error": "El nombre de la categoria es obligatorio"}),400
    
    categoria_existente = Categoria.filter.by(nombre=nombre).first()
    if categoria_existente:
        return jsonify({"error": "Ya existe una categoria con este nombre"}), 400
    
    nueva_categoria= Categoria(nombre=nombre)
    db.session.add(nueva_categoria)
    db.session.commit()
    
    return jsonify({
        "mensaje": "Categoria creada correctamente",
        "categoria": nueva_categoria.a_json()
    }), 201

def actualizar_categoria(id):
    categoria = Categoria.querry.get(id)
    
    if not categoria:
        return jsonify({"error": "Categoria no encontrada"}), 404
    
    data = request.get_json() or {}
    nombre = data.get('nombre', '').strip()
    if not nombre:
        return jsonify({"error": "El nombre de la categoria es obligatorio"}),400
    
    duplicada = Categoria.query.filter(Categoria.nombre == nombre, Categoria.id != id).first()
    if duplicada:
        return jsonify({"error": "Ya existe otra categoria con ese nombre"}),404
    
    categoria.nombre= nombre
    db.session.commit()
    
    return jsonify({
        "mensaje": "Categoria actualizada con exito",
        "categoria": categoria.a_json()
    }),200
    
def eliminar_categoria(id):
    categoria = Categoria.querry.get(id)
    if not categoria:
        return jsonify({"error": "categoria no encontrada"}),404
    
    if categoria.medicamentos:
        return jsonify({"error": "No se puede eliminar esta categoria porque tiene medicamentos asociados"}), 400
    
    db.session.delete(categoria)
    db.session.commit()
    
    return jsonify({"mensaje": "Categoria eliminada correctamente"}), 200
    
    
    