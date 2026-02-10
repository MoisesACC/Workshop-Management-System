import { useState, useEffect } from 'react';
import {
    Package, TrendingUp, AlertTriangle, Truck, Search,
    Filter, Download, Printer, Plus, Edit, ChevronRight
} from 'lucide-react';
import api from '../services/api';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchParts();
    }, []);

    const fetchParts = async () => {
        try {
            const res = await api.get('/parts');
            setItems(res.data);
        } catch (error) {
            console.error("Error fetching parts:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Gestión de Inventario</h2>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>Inicio</span>
                        <ChevronRight size={12} />
                        <span className="text-primary font-medium">Repuestos</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            className="bg-surface-dark border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary w-64"
                            placeholder="Buscar repuestos..."
                            type="text"
                        />
                    </div>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Items Totales", value: "0", trend: "0%", icon: <Package />, color: "primary" },
                    { label: "Valor de Stock", value: "$0.00", icon: <TrendingUp />, color: "primary" },
                    { label: "Alertas Stock Bajo", value: "0 Items", icon: <AlertTriangle />, color: "red", highlight: false },
                    { label: "Ordenes Entrantes", value: "0 Ordenes", icon: <Truck />, color: "primary" },
                ].map((s, i) => (
                    <div key={i} className={`bg-surface-dark p-5 rounded-xl border border-white/5 shadow-sm hover:border-primary/30 transition-colors group relative overflow-hidden ${s.highlight ? 'border-l-4 border-l-primary' : ''}`}>
                        {s.highlight && <div className="absolute right-0 top-0 opacity-5 text-primary"><AlertTriangle size={80} className="-mr-4 -mt-4" /></div>}
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                {s.icon}
                            </div>
                            {s.trend && <span className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded">{s.trend}</span>}
                        </div>
                        <div className="relative z-10">
                            <p className="text-sm text-gray-400 font-medium">{s.label}</p>
                            <h3 className={`text-2xl font-bold mt-1 group-hover:text-primary transition-colors ${s.highlight ? 'text-primary' : 'text-white'}`}>{s.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-surface-dark rounded-xl border border-white/5 shadow-lg flex flex-col">
                <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <select className="appearance-none pl-9 pr-8 py-2 bg-surface-darker border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer min-w-[140px]">
                                <option>Todas las Categorías</option>
                                <option>Motor</option>
                                <option>Frenos</option>
                                <option>Electrónico</option>
                                <option>Fluidos</option>
                            </select>
                            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        </div>
                        <div className="relative">
                            <select className="appearance-none pl-9 pr-8 py-2 bg-surface-darker border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer min-w-[130px]">
                                <option>Estado: Todos</option>
                                <option>En Stock</option>
                                <option>Stock Bajo</option>
                                <option>Agotado</option>
                            </select>
                            <Package className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-400 hover:text-primary rounded-lg transition-all border border-transparent hover:border-white/5"><Download size={20} /></button>
                        <button className="p-2 text-gray-400 hover:text-primary rounded-lg transition-all border border-transparent hover:border-white/5"><Printer size={20} /></button>
                        <button className="flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary/30">
                            <Plus size={18} /> <span>Nuevo Repuesto</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-surface-darker/50 border-b border-white/5 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Detalle de Repuesto</th>
                                <th className="px-6 py-4">Categoría</th>
                                <th className="px-6 py-4">Precio</th>
                                <th className="px-6 py-4">Nivel de Stock</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {items.map((item) => (
                                <tr key={item.id} className="group hover:bg-white/5 transition-colors relative">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {item.status === 'Low Stock' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                                            <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                <Package className="text-gray-500" size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{item.name}</p>
                                                <p className="text-xs text-gray-500">Brand: {item.brand}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400">{item.category}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-white">${item.price.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <div className="w-full max-w-[100px]">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className={`font-bold ${item.status === 'Low Stock' ? 'text-primary' : 'text-gray-300'}`}>{item.stock} u</span>
                                                <span className="text-gray-600">/ {item.max}</span>
                                            </div>
                                            <div className="w-full bg-surface-darker rounded-full h-1.5 overflow-hidden">
                                                <div className={`h-1.5 rounded-full ${item.status === 'Low Stock' ? 'bg-primary' : 'bg-emerald-500'}`} style={{ width: `${(item.stock / item.max) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${item.status === 'Low Stock' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                                            {item.status === 'Low Stock' && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>}
                                            {item.status === 'Low Stock' ? 'Stock Bajo' : 'En Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-500 hover:text-white hover:bg-primary p-1.5 rounded transition-all"><Edit size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                        Mostrando <span className="font-bold text-white">0-0</span> de <span className="font-bold text-white">0</span> items
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-primary disabled:opacity-50 transition-colors" disabled>Anterior</button>
                        <div className="flex items-center gap-1">
                            <button className="w-7 h-7 flex items-center justify-center rounded bg-primary text-white text-xs font-bold">1</button>
                            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/5 text-gray-400 text-xs font-medium transition-colors">2</button>
                        </div>
                        <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-primary transition-colors">Siguiente</button>
                    </div>
                </div>
            </div>

            <footer className="mt-8 text-center text-xs text-gray-600 pb-4">
                © 2026 Factoría La Caravana Management System v2.4
            </footer>
        </div>
    );
};

export default Inventory;
