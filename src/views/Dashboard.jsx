import { useEffect, useState } from 'react';
import { getMedicamentos, getCategorias, getEmpleados } from '../services/api';
import { FaPills, FaTags, FaUsers, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

export default function Dashboard() {
    const [stats, setStats] = useState({ meds: 0, cats: 0, emps: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const medicamentos = await getMedicamentos();
                const categorias = await getCategorias();
                const empleados = await getEmpleados();

                setStats({
                    meds: Array.isArray(medicamentos) ? medicamentos.length : 0,
                    cats: Array.isArray(categorias) ? categorias.length : 0,
                    emps: Array.isArray(empleados) ? empleados.length : 0,
                });
            } catch (error) {
                console.error("El backend aún no responde:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="p-6 md:p-10 bg-slate-900 min-h-screen text-slate-100">
            {/* Encabezado */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
                        <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                            <FaChartLine />
                        </span>
                        Panel de Control
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        Bienvenido al sistema de gestión inteligente de farmacia. Aquí tienes el resumen general.
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Sistema Conectado
                    </span>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-slate-400 animate-pulse text-lg font-medium">Sincronizando métricas...</p>
                </div>
            ) : (
                <>
                    {/* Tarjetas de Estadísticas Principales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* Card Medicamentos */}
                        <div className="relative group overflow-hidden bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-xl hover:border-emerald-500/50 transition-all duration-300">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Medicamentos Totales</p>
                                    <h3 className="text-4xl font-black text-white mt-2">{stats.meds}</h3>
                                </div>
                                <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 text-xl">
                                    <FaPills />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                                <span>↑ Actualizado en tiempo real</span>
                            </div>
                        </div>

                        {/* Card Categorías */}
                        <div className="relative group overflow-hidden bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-xl hover:border-cyan-500/50 transition-all duration-300">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Categorías Activas</p>
                                    <h3 className="text-4xl font-black text-white mt-2">{stats.cats}</h3>
                                </div>
                                <div className="p-4 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20 text-xl">
                                    <FaTags />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs text-cyan-400 font-medium">
                                <span>Gestión de inventario</span>
                            </div>
                        </div>

                        {/* Card Empleados */}
                        <div className="relative group overflow-hidden bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-xl hover:border-indigo-500/50 transition-all duration-300">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Personal Registrado</p>
                                    <h3 className="text-4xl font-black text-white mt-2">{stats.emps}</h3>
                                </div>
                                <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 text-xl">
                                    <FaUsers />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs text-indigo-400 font-medium">
                                <span>Equipo activo</span>
                            </div>
                        </div>
                    </div>

                    {/* Sección inferior de avisos o accesos rápidos */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-xl">
                            <h2 className="text-lg font-bold text-white mb-2">Estado del Sistema Backend</h2>
                            <p className="text-slate-400 text-sm mb-4">
                                Monitoreo de conexiones y endpoints programados con Flask.
                            </p>
                            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/40 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                                        <FaExclamationTriangle />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Esperando conexión de Flask</p>
                                        <p className="text-xs text-slate-400">Los datos se actualizarán automáticamente al iniciar la API.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 shadow-xl flex flex-col justify-between text-white">
                            <div>
                                <h3 className="text-lg font-bold">Arquitectura Moderna</h3>
                                <p className="text-emerald-100 text-sm mt-2">
                                    Construido con React, Vite y Tailwind CSS, optimizado para un rendimiento ultrarrápido.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-emerald-500/30 text-xs font-semibold uppercase tracking-wider text-emerald-200">
                                Proyecto Farmacia 2026
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}