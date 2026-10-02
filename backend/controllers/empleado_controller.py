import re
from flask import request, jsonify
from models.db import db
from models.empleado import Empleado

def validar_email(email):
    patron = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(patron, email) is not None

def listar_empleados():
    try:
        empleados = Empleado.query.all()
        return jsonify([emp.a_json() for emp in empleados]), 200
    except Exception as e:
        return jsonify({"error": f"Error al listar empleados: {str(e)}"}), 500

def obtener_empleado(id):
    try:
        empleado = Empleado.query.get(id)
        if not empleado:
            return jsonify({"error": "Empleado no encontrado"}), 404
        return jsonify(empleado.a_json()), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener empleado: {str(e)}"}), 500

def crear_empleado():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se enviaron datos en formato JSON"}), 400

        nombre = data.get('nombre', '').strip()
        apellido = data.get('apellido', '').strip()
        dni = data.get('dni', '').strip()
        email = data.get('email', '').strip()
        cargo = data.get('cargo', '').strip()

        # Validación de campos obligatorios según modelo (nullable=False)
        if not nombre or not apellido or not dni or not email or not cargo:
            return jsonify({"error": "Nombre, apellido, DNI, email y cargo son obligatorios"}), 400

        # Validación de formato de email
        if not validar_email(email):
            return jsonify({"error": "El formato del email no es válido"}), 400

        # Validación de unicidad de DNI
        if Empleado.query.filter_by(dni=dni).first():
            return jsonify({"error": "Ya existe un empleado registrado con ese DNI"}), 400

        nuevo_empleado = Empleado(
            nombre=nombre,
            apellido=apellido,
            dni=dni,
            email=email,
            cargo=cargo
        )

        db.session.add(nuevo_empleado)
        db.session.commit()

        return jsonify({
            "mensaje": "Empleado creado correctamente",
            "empleado": nuevo_empleado.a_json()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al crear empleado: {str(e)}"}), 500

def actualizar_empleado(id):
    try:
        empleado = Empleado.query.get(id)
        if not empleado:
            return jsonify({"error": "Empleado no encontrado"}), 404

        data = request.get_json()
        if not data:
            return jsonify({"error": "No se enviaron datos para actualizar"}), 400

        nombre = data.get('nombre', empleado.nombre).strip()
        apellido = data.get('apellido', empleado.apellido).strip()
        dni = data.get('dni', empleado.dni).strip()
        email = data.get('email', empleado.email).strip()
        cargo = data.get('cargo', empleado.cargo).strip()

        if not nombre or not apellido or not dni or not email or not cargo:
            return jsonify({"error": "Ningún campo puede quedar vacío"}), 400

        if not validar_email(email):
            return jsonify({"error": "El formato del email no es válido"}), 400

        # Comprobar unicidad si cambió el DNI
        dni_existente = Empleado.query.filter_by(dni=dni).first()
        if dni_existente and dni_existente.id != id:
            return jsonify({"error": "El DNI ya pertenece a otro empleado"}), 400

        empleado.nombre = nombre
        empleado.apellido = apellido
        empleado.dni = dni
        empleado.email = email
        empleado.cargo = cargo

        db.session.commit()

        return jsonify({
            "mensaje": "Empleado actualizado correctamente",
            "empleado": empleado.a_json()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar empleado: {str(e)}"}), 500

def eliminar_empleado(id):
    try:
        empleado = Empleado.query.get(id)
        if not empleado:
            return jsonify({"error": "Empleado no encontrado"}), 404

        db.session.delete(empleado)
        db.session.commit()

        return jsonify({"mensaje": f"Empleado con ID {id} eliminado correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al eliminar empleado: {str(e)}"}), 500