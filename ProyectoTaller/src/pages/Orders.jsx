import { useState, useEffect } from 'react';
import {
    Plus, Filter, Grid, List as ListIcon, MoreHorizontal,
    Edit, Clock, Check, Trash2, Receipt
} from 'lucide-react';
import api from '../services/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/work-orders');
            setOrders(res.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const getColumnCards = (status) => {
        return orders.filter(o => o.status === status).map(o => ({
            id: o.orderNumber || `#${o.id}`,
            priority: o.priority || 'Medium',
            client: o.clientName || 'Cliente General',
            vehicle: o.vehicleInfo || 'Sin vehículo',
            time: 'Reciente',
            status: o.status
        }));
    };

    const columns = [
        {
            id: "PENDING",
            title: "Pendiente",
            count: orders.filter(o => o.status === 'PENDING').length,
            color: "gray-500",
            cards: getColumnCards('PENDING')
        },
        {
            id: "IN_PROGRESS",
            title: "En Proceso",
            count: orders.filter(o => o.status === 'IN_PROGRESS').length,
            color: "blue-500",
            pulse: true,
            cards: getColumnCards('IN_PROGRESS')
        },
        {
            id: "COMPLETED",
            title: "Completado",
            count: orders.filter(o => o.status === 'COMPLETED').length,
            color: "green-500",
            cards: getColumnCards('COMPLETED')
        }
    ];

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Controls Bar */}
            <div className="mb-6 shrink-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            Órdenes de Trabajo
                            <span className="text-sm font-normal text-gray-400 bg-surface-darker px-2 py-0.5 rounded border border-white/5">0 Activas</span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Administra el flujo de reparaciones y asignaciones.</p>
                    </div>
                    <button className="bg-primary hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-primary/30 flex items-center gap-2 font-semibold transition-all group">
                        <Plus className="group-hover:rotate-90 transition-transform duration-300" size={20} />
                        Nueva Orden
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative grow max-w-md">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input className="w-full bg-surface-darker border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="Filtrar por placa, cliente o mecánico..." type="text" />
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="bg-surface-darker border border-white/5 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-300 focus:ring-primary focus:border-primary appearance-none">
                            <option>Todas las Prioridades</option>
                            <option>Alta</option>
                            <option>Media</option>
                            <option>Baja</option>
                        </select>
                        <button className="p-2 text-gray-400 hover:text-white bg-surface-darker border border-white/5 rounded-lg hover:border-primary transition-colors"><Grid size={18} /></button>
                        <button className="p-2 text-gray-400 hover:text-white bg-surface-darker border border-white/5 rounded-lg hover:border-primary transition-colors"><ListIcon size={18} /></button>
                    </div>
                </div>
            </div>

            {/* Kanban columns */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar">
                <div className="flex gap-6 h-full min-w-max">
                    {columns.map((col) => (
                        <div key={col.id} className="w-80 flex flex-col h-full bg-surface-darker/40 rounded-xl border border-white/5 backdrop-blur-sm">
                            <div className="p-4 border-b border-white/5 flex justify-between items-center sticky top-0 bg-surface-darker/90 rounded-t-xl backdrop-blur-md z-10">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full bg-${col.color} ${col.pulse ? 'animate-pulse' : ''}`}></div>
                                    <span className="font-bold text-gray-200 uppercase tracking-wider text-sm font-display">{col.title}</span>
                                    <span className="bg-surface-dark text-gray-500 text-xs px-2 py-0.5 rounded-full border border-white/5">{col.count}</span>
                                </div>
                                <button className="text-gray-500 hover:text-white"><MoreHorizontal size={18} /></button>
                            </div>

                            <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                                {col.cards.map((card, i) => (
                                    <div key={i} className="group bg-surface-dark hover:bg-surface-dark/80 border border-transparent hover:border-primary/50 p-4 rounded-lg shadow-sm transition-all cursor-grab active:cursor-grabbing relative overflow-hidden">
                                        <div className={`absolute top-0 left-0 w-1 h-full ${card.priority === 'High' ? 'bg-primary' : card.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'} transition-colors`}></div>
                                        <div className="flex justify-between items-start mb-3 pl-2">
                                            <div>
                                                {card.priority && (
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border ${card.priority === 'High' ? 'bg-primary/20 text-primary border-primary/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                                        {card.priority}
                                                    </span>
                                                )}
                                                {card.status === 'Done' && (
                                                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide flex items-center gap-1 w-max">
                                                        <Check size={10} /> Listo
                                                    </span>
                                                )}
                                                <h3 className={`text-white font-mono font-bold text-lg mt-1 ${card.status === 'Done' ? 'line-through decoration-gray-500' : ''}`}>
                                                    {card.id}
                                                </h3>
                                            </div>
                                            <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                {col.id === 'completed' ? <Receipt size={18} /> : <Edit size={18} />}
                                            </button>
                                        </div>
                                        <div className="pl-2 space-y-2">
                                            <div>
                                                <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">Cliente</p>
                                                <p className="text-gray-200 text-sm font-semibold">{card.client}</p>
                                            </div>
                                            {card.vehicle && <p className="text-gray-400 text-sm">{card.vehicle}</p>}
                                            {card.issue && <p className="text-gray-400 text-sm truncate italic">"{card.issue}"</p>}
                                            {card.progress !== undefined && (
                                                <div className="bg-surface-darker/50 p-2 rounded border border-white/5">
                                                    <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                                        <span>Diagnóstico</span>
                                                        <span>{card.progress}%</span>
                                                    </div>
                                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${card.progress}%` }}></div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="pt-2 mt-2 border-t border-white/5 flex justify-between items-center">
                                                <div className="flex -space-x-2">
                                                    <div className="w-6 h-6 rounded-full bg-surface-darker border border-white/5 flex items-center justify-center text-[10px] text-gray-500">M1</div>
                                                </div>
                                                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                                    <Clock size={12} /> {card.time || 'Ahora'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button className="w-12 h-12 mt-4 rounded-full border-2 border-dashed border-white/10 text-gray-500 hover:text-primary hover:border-primary flex items-center justify-center transition-all shrink-0">
                        <Plus size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Orders;
