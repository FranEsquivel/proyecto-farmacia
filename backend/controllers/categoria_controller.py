from flask import jsonify,request
from models.db import db
from models.categoria import Categoria

def listar_categoria():
    try:
        categorias = Categoria.query.all()
        data = [cat.a_json() for cat in categorias]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": f"Error al listar categorías: {str(e)}"}), 500
    
    
def obtener_categoria(id):
    try:
        categoria = Categoria.query.get(id)
        if not categoria:
            return jsonify({"error": "Categoría no encontrada"}), 404
        return jsonify(categoria.a_json()), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener categoría: {str(e)}"}), 500

def crear_categoria():
    try:
        data = request.get_json() or {}
        nombre = data.get('nombre', '').strip()
        
        if not nombre:
            return jsonify({"error": "El nombre de la categoría es obligatorio"}), 400
        
        categoria_existente = Categoria.query.filter_by(nombre=nombre).first()
        if categoria_existente:
            return jsonify({"error": "Ya existe una categoría con este nombre"}), 400
        
        nueva_categoria = Categoria(nombre=nombre)
        db.session.add(nueva_categoria)
        db.session.commit()
        
        return jsonify({
            "mensaje": "Categoría creada correctamente",
            "categoria": nueva_categoria.a_json()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al crear categoría: {str(e)}"}), 500

def actualizar_categoria(id):
    try:
        categoria = Categoria.query.get(id)
        if not categoria:
            return jsonify({"error": "Categoría no encontrada"}), 404
        
        data = request.get_json() or {}
        nombre = data.get('nombre', '').strip()
        if not nombre:
            return jsonify({"error": "El nombre de la categoría es obligatorio"}), 400
        
        duplicada = Categoria.query.filter(Categoria.nombre == nombre, Categoria.id != id).first()
        if duplicada:
            return jsonify({"error": "Ya existe otra categoría con ese nombre"}), 400
        
        categoria.nombre = nombre
        db.session.commit()
        
        return jsonify({
            "mensaje": "Categoría actualizada con éxito",
            "categoria": categoria.a_json()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar categoría: {str(e)}"}), 500
    
def eliminar_categoria(id):
    try:
        categoria = Categoria.query.get(id)
        if not categoria:
            return jsonify({"error": "Categoría no encontrada"}), 404
        
        # Validar si tiene relación con medicamentos antes de borrar
        if hasattr(categoria, 'medicamentos') and categoria.medicamentos:
            return jsonify({"error": "No se puede eliminar esta categoría porque tiene medicamentos asociados"}), 400
        
        db.session.delete(categoria)
        db.session.commit()
        
        return jsonify({"mensaje": "Categoría eliminada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al eliminar categoría: {str(e)}"}), 500
    
    
    