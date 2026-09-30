from datetime import datetime
from flask import request, jsonify
from models.db import db
from models.medicamento import Medicamento
from models.categoria import Categoria

def listar_medicamentos():
    try:
        medicamentos = Medicamento.query.all()
        return jsonify([med.a_json() for med in medicamentos]), 200
    except Exception as e:
        return jsonify({"error": f"Error al listar medicamentos: {str(e)}"}), 500

def obtener_medicamento(id):
    try:
        medicamento = Medicamento.query.get(id)
        if not medicamento:
            return jsonify({"error": "Medicamento no encontrado"}), 404
        return jsonify(medicamento.a_json()), 200
    except Exception as e:
        return jsonify({"error": f"Error al obtener medicamento: {str(e)}"}), 500

def crear_medicamento():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se enviaron datos en formato JSON"}), 400

        nombre = data.get('nombre', '').strip()
        precio = data.get('precio')
        stock = data.get('stock', 0)
        fecha_vencimiento_str = data.get('fecha_vencimiento')
        categoria_id = data.get('categoria_id')

        # 1. Campos obligatorios
        if not nombre or precio is None or not fecha_vencimiento_str or categoria_id is None:
            return jsonify({"error": "Nombre, precio, fecha de vencimiento y categoría son obligatorios"}), 400

        # 2. Validaciones numéricas de precio y stock
        try:
            precio = float(precio)
            if precio <= 0:
                return jsonify({"error": "El precio debe ser un número mayor a cero"}), 400
        except ValueError:
            return jsonify({"error": "El precio debe ser un valor numérico válido"}), 400

        try:
            stock = int(stock)
            if stock < 0:
                return jsonify({"error": "El stock no puede ser un número negativo"}), 400
        except ValueError:
            return jsonify({"error": "El stock debe ser un número entero válido"}), 400

        # 3. Validación y conversión de fecha (espera formato YYYY-MM-DD)
        try:
            fecha_vencimiento = datetime.strptime(fecha_vencimiento_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"error": "La fecha de vencimiento debe tener el formato YYYY-MM-DD"}), 400

        # 4. Validar existencia de la categoría (Foreign Key)
        categoria = Categoria.query.get(categoria_id)
        if not categoria:
            return jsonify({"error": f"No existe ninguna categoría con ID {categoria_id}"}), 400

        nuevo_medicamento = Medicamento(
            nombre=nombre,
            precio=precio,
            stock=stock,
            fecha_vencimiento=fecha_vencimiento,
            categoria_id=categoria_id
        )

        db.session.add(nuevo_medicamento)
        db.session.commit()

        return jsonify({
            "mensaje": "Medicamento creado correctamente",
            "medicamento": nuevo_medicamento.a_json()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al crear medicamento: {str(e)}"}), 500

def actualizar_medicamento(id):
    try:
        medicamento = Medicamento.query.get(id)
        if not medicamento:
            return jsonify({"error": "Medicamento no encontrado"}), 404

        data = request.get_json()
        if not data:
            return jsonify({"error": "No se enviaron datos para actualizar"}), 400

        nombre = data.get('nombre', medicamento.nombre).strip()
        precio = data.get('precio', medicamento.precio)
        stock = data.get('stock', medicamento.stock)
        fecha_vencimiento_str = data.get('fecha_vencimiento')
        categoria_id = data.get('categoria_id', medicamento.categoria_id)

        if not nombre:
            return jsonify({"error": "El nombre no puede quedar vacío"}), 400

        try:
            precio = float(precio)
            if precio <= 0:
                return jsonify({"error": "El precio debe ser un número mayor a cero"}), 400
        except ValueError:
            return jsonify({"error": "El precio debe ser numérico"}), 400

        try:
            stock = int(stock)
            if stock < 0:
                return jsonify({"error": "El stock no puede ser negativo"}), 400
        except ValueError:
            return jsonify({"error": "El stock debe ser un número entero"}), 400

        if fecha_vencimiento_str:
            try:
                medicamento.fecha_vencimiento = datetime.strptime(fecha_vencimiento_str, '%Y-%m-%d').date()
            except ValueError:
                return jsonify({"error": "Formato de fecha inválido. Utilice YYYY-MM-DD"}), 400

        if categoria_id != medicamento.categoria_id:
            categoria = Categoria.query.get(categoria_id)
            if not categoria:
                return jsonify({"error": f"No existe la categoría con ID {categoria_id}"}), 400
            medicamento.categoria_id = categoria_id

        medicamento.nombre = nombre
        medicamento.precio = precio
        medicamento.stock = stock

        db.session.commit()

        return jsonify({
            "mensaje": "Medicamento actualizado correctamente",
            "medicamento": medicamento.a_json()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar medicamento: {str(e)}"}), 500

def eliminar_medicamento(id):
    try:
        medicamento = Medicamento.query.get(id)
        if not medicamento:
            return jsonify({"error": "Medicamento no encontrado"}), 404

        db.session.delete(medicamento)
        db.session.commit()

        return jsonify({"mensaje": f"Medicamento con ID {id} eliminado correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al eliminar medicamento: {str(e)}"}), 500