from flask import Blueprint
from controllers.empleado_controller import (
    listar_empleados,
    obtener_empleado,
    crear_empleado,
    actualizar_empleado,
    eliminar_empleado
)

empleados_bp = Blueprint('empleados_bp', __name__)

# GET /api/empleados -> Listar todos
@empleados_bp.route('', methods=['GET'])
def get_empleados():
    return listar_empleados()

# GET /api/empleados/<id> -> Obtener uno por ID
@empleados_bp.route('/<int:id>', methods=['GET'])
def get_empleado(id):
    return obtener_empleado(id)

# POST /api/empleados -> Crear nuevo empleado
@empleados_bp.route('', methods=['POST'])
def post_empleado():
    return crear_empleado()

# PUT /api/empleados/<id> -> Actualizar empleado
@empleados_bp.route('/<int:id>', methods=['PUT'])
def put_empleado(id):
    return actualizar_empleado(id)

# DELETE /api/empleados/<id> -> Eliminar empleado
@empleados_bp.route('/<int:id>', methods=['DELETE'])
def delete_empleado(id):
    return eliminar_empleado(id)