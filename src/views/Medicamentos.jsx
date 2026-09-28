import { useEffect, useState } from 'react';
import { getMedicamentos } from '../services/api';
import { FaPills, FaSearch, FaPlus, FaBoxOpen, FaEdit, FaTrash } from 'react-icons/fa';

export default function Medicamentos() {
    const [medicamentos, setMedicamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        async function cargarMedicamentos() {
            try {
                const data = await getMedicamentos();
                if (Array.isArray(data)) {
                    setMedicamentos(data);
                }
            } catch (error) {
                console.error("Error al cargar medicamentos:", error);
            } finally {
                setLoading(false);
            }
        }

        cargarMedicamentos();
    }, []);

    // Filtro de búsqueda en tiempo real (cuando tu compañero conecte el backend, esto buscará entre los productos)
    const medicamentosFiltrados = medicamentos.filter((med) =>
        med.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="p-6 md:p-10 bg-slate-900 min-h-screen text-slate-100">
            {/* Encabezado de la vista */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
                        <span className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                            <FaPills />
                        </span>
                        Gestión de Medicamentos
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        Administra el inventario, precios y stock de los productos farmacéuticos.
                    </p>
                </div>

                {/* Botón de acción principal */}
                <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-200">
                    <FaPlus size={14} />
                    <span>Nuevo Medicamento</span>
                </button>
            </div>

            {/* Barra de herramientas / Buscador */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-4 rounded-2xl mb-6 flex items-center gap-3">
                <span className="text-slate-400 pl-2">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    placeholder="Buscar medicamentos por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="bg-transparent border-none outline-none text-white placeholder-slate-500 w-full text-sm"
                />
            </div>

            {/* Contenedor de la tabla */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700/60 bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider font-bold">
                                <th className="py-4 px-6">ID</th>
                                <th className="py-4 px-6">Nombre</th>
                                <th className="py-4 px-6">Descripción</th>
                                <th className="py-4 px-6">Precio</th>
                                <th className="py-4 px-6">Stock</th>
                                <th className="py-4 px-6 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/40 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-400 animate-pulse">
                                        Cargando inventario de medicamentos...
                                    </td>
                                </tr>
                            ) : medicamentosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-400">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <FaBoxOpen className="text-3xl text-slate-600 mb-1" />
                                            <p>No se encontraron medicamentos registrados o el backend no está conectado.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                medicamentosFiltrados.map((med) => (
                                    <tr key={med.id} className="hover:bg-slate-700/20 transition-colors">
                                        <td className="py-4 px-6 font-mono text-xs text-slate-400">#{med.id}</td>
                                        <td className="py-4 px-6 font-semibold text-white">{med.nombre}</td>
                                        <td className="py-4 px-6 text-slate-300">{med.descripcion}</td>
                                        <td className="py-4 px-6 font-medium text-emerald-400">${med.precio}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${med.stock > 10 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                }`}>
                                                {med.stock} unidades
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 bg-slate-700/50 hover:bg-blue-600/20 hover:text-blue-400 text-slate-300 rounded-xl transition-colors">
                                                    <FaEdit size={14} />
                                                </button>
                                                <button className="p-2 bg-slate-700/50 hover:bg-rose-600/20 hover:text-rose-400 text-slate-300 rounded-xl transition-colors">
                                                    <FaTrash size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}