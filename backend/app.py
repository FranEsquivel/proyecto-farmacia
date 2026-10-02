from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models.db import db

# Importar modelos para que SQLAlchemy los detecte al crear tablas
from models.categoria import Categoria
from models.empleado import Empleado
from models.medicamento import Medicamento

# Importar rutas
from routes.categoria_routes import categorias_bp
from routes.empleado_routes import empleados_bp
from routes.medicamento_routes import medicamentos_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Habilitar CORS para que React pueda consumir la API
    CORS(app)

    # Inicializar la base de datos
    db.init_app(app)

    # Registrar Blueprints
    app.register_blueprint(categorias_bp, url_prefix='/api/categorias')
    app.register_blueprint(empleados_bp, url_prefix='/api/empleados')
    app.register_blueprint(medicamentos_bp, url_prefix='/api/medicamentos')

    # Ruta de verificación y dashboard
    @app.route('/')
    @app.route('/api/dashboard', methods=['GET'])
    def get_dashboard():
        try:
            total_medicamentos = Medicamento.query.count()
            total_categorias = Categoria.query.count()
            total_empleados = Empleado.query.count()

            return jsonify({
                "mensaje": "Servidor Flask y API REST de Farmacia funcionando",
                "total_medicamentos": total_medicamentos,
                "total_categorias": total_categorias,
                "total_empleados": total_empleados
            }), 200
        except Exception as e:
            return jsonify({"error": f"Error al obtener métricas del dashboard: {str(e)}"}), 500

    # Crear tablas en MySQL si aún no existen
    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)