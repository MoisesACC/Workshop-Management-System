
import {
    FileText, Clock, CheckCircle, TrendingUp, AlertTriangle,
    MoreVertical, Calendar as CalendarIcon, Wrench, UserPlus, Package
} from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [realStats, setRealStats] = useState(null);
    const [lowStockParts, setLowStockParts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, lowStockRes] = await Promise.all([
                    api.get('/dashboard/stats'),
                    api.get('/parts/low-stock')
                ]);
                setRealStats(statsRes.data);
                setLowStockParts(lowStockRes.data);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const stats = [
        { label: "Ordenes Totales", value: realStats?.totalWorkOrders || "0", trend: "0%", icon: <FileText />, color: "gray" },
        { label: "Pendientes", value: realStats?.pendingWorkOrders || "0", icon: <Clock />, color: "amber" },
        { label: "Completadas", value: realStats?.completedWorkOrders || "0", icon: <CheckCircle />, color: "green" },
        { label: "Ingresos Totales", value: `$${realStats?.totalRevenue?.toLocaleString() || '0.00'}`, icon: <TrendingUp />, color: "primary", special: true },
        { label: "Stock Bajo", value: `${realStats?.lowStockParts || 0} Items`, icon: <AlertTriangle />, color: "red", alert: (realStats?.lowStockParts > 0) }
    ];

    const alerts = [];

    const activities = realStats?.recentActivities || [];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Vista General del Taller</h2>
                    <p className="text-sm text-gray-400 mt-1">Lo que está sucediendo hoy en Factoría La Caravana.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 bg-surface-darker px-3 py-1.5 rounded-lg border border-white/5">
                    <CalendarIcon className="text-primary" size={18} />
                    <span>Feb 10, 2026</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className={`bg-surface-dark p-5 rounded-xl border border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-sm ${s.color === 'amber' ? 'border-l-4 border-l-amber-500' : ''} ${s.special ? 'border-primary/30 bg-gradient-to-br from-surface-dark to-surface-darker shadow-lg shadow-primary/5' : ''}`}>
                        {s.special && <div className="absolute inset-0 bg-primary/5 opacity-50 group-hover:opacity-70 transition-opacity"></div>}
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-2 rounded-lg ${s.color === 'amber' ? 'bg-amber-500/10 text-amber-500' : s.color === 'green' ? 'bg-green-500/10 text-green-500' : s.color === 'red' ? 'bg-primary/10 text-primary' : s.color === 'primary' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-300'}`}>
                                {s.icon}
                            </div>
                            {s.trend && <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded">{s.trend}</span>}
                            {s.alert && <span className="text-xs font-bold text-white bg-primary px-2 py-1 rounded animate-bounce">ALERTA</span>}
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-sm font-medium text-gray-400">{s.label}</h3>
                            <p className={`text-2xl font-bold mt-1 ${s.special ? 'text-primary' : 'text-white'}`}>{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Visualization */}
                <div className="xl:col-span-2 bg-surface-dark rounded-xl border border-white/5 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Resumen de Ingresos</h3>
                            <p className="text-xs text-gray-400">Tendencia mensual (Últimos 6 meses)</p>
                        </div>
                        <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                    <div className="h-64 w-full flex items-end justify-between px-2 pb-6 relative">
                        <div className="absolute inset-x-0 bottom-6 border-b border-white/5 border-dashed h-px w-full"></div>
                        <div className="absolute inset-x-0 bottom-24 border-b border-white/5 border-dashed h-px w-full"></div>
                        <div className="absolute inset-x-0 bottom-40 border-b border-white/5 border-dashed h-px w-full"></div>

                        {['Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'].map((month, i) => {
                            const heights = ['30%', '45%', '40%', '65%', '55%', '85%'];
                            return (
                                <div key={i} className="w-1/12 group relative flex flex-col justify-end h-full">
                                    <div className={`bg-gradient-to-t from-primary/20 to-primary rounded-t-sm transition-all group-hover:bg-primary/80 ${i === 5 ? 'shadow-[0_0_15px_rgba(216,3,39,0.5)]' : ''}`} style={{ height: heights[i] }}>
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-darker text-white text-xs px-2 py-1 rounded border border-white/10 pointer-events-none transition-opacity">
                                            $15k
                                        </div>
                                    </div>
                                    <div className={`absolute -bottom-6 w-full text-center text-xs ${i === 5 ? 'font-bold text-primary' : 'text-gray-500'}`}>{month}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-surface-dark rounded-xl border border-white/5 p-6 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-6">Actividad Reciente</h3>
                    <div className="flex-1 space-y-4">
                        {activities.map((act, i) => (
                            <div key={i} className="flex gap-4 items-start pb-4 border-b border-white/5 last:border-none">
                                <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${act.type === 'build' ? 'bg-blue-500/10 text-blue-500' : act.type === 'user' ? 'bg-purple-500/10 text-purple-500' : act.type === 'inventory' ? 'bg-primary/10 text-primary' : 'bg-amber-500/10 text-amber-500'}`}>
                                    {act.type === 'build' ? <Wrench size={14} /> : act.type === 'user' ? <UserPlus size={14} /> : act.type === 'inventory' ? <AlertTriangle size={14} /> : <FileText size={14} />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium">{act.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{act.subtitle}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`block text-xs font-semibold ${act.status === 'Listo' ? 'text-green-400' : act.status === 'Alerta' ? 'text-primary animate-pulse' : 'text-gray-400'}`}>{act.status}</span>
                                    <span className="block text-[10px] text-gray-500">{act.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-surface-dark rounded-xl border border-white/5 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-transparent to-primary/5">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="text-primary" size={20} />
                        <h3 className="text-lg font-bold text-white">Alertas Críticas de Inventario</h3>
                    </div>
                    <button className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded text-gray-300">Gestionar Inventario</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-surface-darker text-gray-500">
                            <tr>
                                <th className="px-6 py-3">Nombre Repuesto</th>
                                <th className="px-6 py-3">SKU</th>
                                <th className="px-6 py-3">Categoría</th>
                                <th className="px-6 py-3">Stock Actual</th>
                                <th className="px-6 py-3 text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {lowStockParts.length > 0 ? lowStockParts.map((part, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-surface-darker flex items-center justify-center text-gray-500">
                                            <Package size={14} />
                                        </div>
                                        {part.name}
                                    </td>
                                    <td className="px-6 py-4">{part.sku || 'N/A'}</td>
                                    <td className="px-6 py-4">{part.category || 'Varios'}</td>
                                    <td className="px-6 py-4 text-primary font-bold">{part.quantity}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="font-medium text-primary hover:underline">Repedir</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic font-medium">
                                        No hay alertas críticas en el inventario.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-500">
                <p>© 2026 Factoría La Caravana. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AdminDashboard;
