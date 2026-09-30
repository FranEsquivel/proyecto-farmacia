from flask import Blueprint
from controllers.medicamento_controller import (
    listar_medicamentos,
    obtener_medicamento,
    crear_medicamento,
    actualizar_medicamento,
    eliminar_medicamento
)

medicamentos_bp = Blueprint('medicamentos_bp', __name__)

# GET /api/medicamentos -> Listar todos
@medicamentos_bp.route('', methods=['GET'])
def get_medicamentos():
    return listar_medicamentos()

# GET /api/medicamentos/<id> -> Obtener por ID
@medicamentos_bp.route('/<int:id>', methods=['GET'])
def get_medicamento(id):
    return obtener_medicamento(id)

# POST /api/medicamentos -> Crear medicamento
@medicamentos_bp.route('', methods=['POST'])
def post_medicamento():
    return crear_medicamento()

# PUT /api/medicamentos/<id> -> Actualizar medicamento
@medicamentos_bp.route('/<int:id>', methods=['PUT'])
def put_medicamento(id):
    return actualizar_medicamento(id)

# DELETE /api/medicamentos/<id> -> Eliminar medicamento
@medicamentos_bp.route('/<int:id>', methods=['DELETE'])
def delete_medicamento(id):
    return eliminar_medicamento(id)