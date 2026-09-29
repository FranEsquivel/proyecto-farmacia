from flask import Blueprint
from controllers.categoria_controller import (
    listar_categoria,
    obtener_categoria,
    crear_categoria,
    actualizar_categoria,
    eliminar_categoria
)

# Definimos el Blueprint una sola vez
categorias_bp = Blueprint('categorias_bp', __name__)

# GET /api/categorias -> Listar todas las categorías
@categorias_bp.route('', methods=['GET'])
def get_categorias():
    return listar_categoria()

# GET /api/categorias/<id> -> Obtener una categoría específica
@categorias_bp.route('/<int:id>', methods=['GET'])
def get_categoria(id):
    return obtener_categoria(id)

# POST /api/categorias -> Crear una nueva categoría
@categorias_bp.route('', methods=['POST'])
def post_categoria():
    return crear_categoria()

# PUT /api/categorias/<id> -> Modificar una categoría
@categorias_bp.route('/<int:id>', methods=['PUT'])
def put_categoria(id):
    return actualizar_categoria(id)

# DELETE /api/categorias/<id> -> Eliminar una categoría
@categorias_bp.route('/<int:id>', methods=['DELETE'])
def delete_categoria(id):
    return eliminar_categoria(id)