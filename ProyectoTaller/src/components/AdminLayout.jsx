import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search, Bell, Plus } from 'lucide-react';
import api from '../services/api';

const AdminLayout = () => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifs, setShowNotifs] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await api.get('/parts/low-stock');
                setNotifications(res.data.map(part => ({
                    id: part.id,
                    title: 'Stock Bajo',
                    message: `El repuesto ${part.name} tiene solo ${part.quantity} unidades.`,
                    type: 'alert'
                })));
            } catch (err) {
                console.error("Error fetching notifications:", err);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className="flex bg-background-dark text-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                {/* Abstract Background Pattern */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                {/* Top Header */}
                <header className="h-20 flex items-center justify-between px-8 bg-surface-darker/50 backdrop-blur-md border-b border-white/5 z-10 shrink-0">
                    <div className="hidden md:flex items-center flex-1 max-w-md">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input className="w-full bg-surface-dark border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 text-gray-200 placeholder-gray-500 transition-shadow" placeholder="Buscar órdenes, clientes o partes..." type="text" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifs(!showNotifs)}
                                className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            >
                                <Bell size={20} />
                                {notifications.length > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background-dark"></span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifs && (
                                <div className="absolute right-0 mt-2 w-80 bg-surface-dark border border-white/5 rounded-xl shadow-2xl z-50 overflow-hidden animate-slide-up">
                                    <div className="p-4 border-b border-white/5 bg-surface-darker/50 flex justify-between items-center">
                                        <h4 className="text-sm font-bold text-white">Notificaciones</h4>
                                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">{notifications.length} Nuevas</span>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.length > 0 ? notifications.map(n => (
                                            <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer last:border-none">
                                                <div className="flex gap-3">
                                                    <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0 h-max">
                                                        <Bell size={14} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-white">{n.title}</p>
                                                        <p className="text-[11px] text-gray-400 mt-0.5">{n.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-8 text-center text-gray-500 text-sm">
                                                No hay notificaciones nuevas.
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 bg-surface-darker/50 border-t border-white/5 text-center">
                                        <button className="text-[11px] font-bold text-primary hover:underline">Ver todas</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="h-8 w-px bg-white/10 mx-2"></div>
                        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                            <Plus size={18} />
                            <span className="text-sm font-semibold">Nueva Orden</span>
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
