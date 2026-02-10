
import { useState, useEffect } from 'react';
import {
    Wrench, Plus, Search, DollarSign, Clock,
    ChevronRight, Edit, Trash2, Tag
} from 'lucide-react';
import api from '../services/api';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await api.get('/catalog'); // Based on CatalogController/Service domain
            setServices(res.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Catálogo de Servicios</h2>
                    <p className="text-gray-400 text-sm mt-1">Define los trabajos, precios base y tiempos estimados.</p>
                </div>
                <button className="bg-primary hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-primary/30 flex items-center gap-2 font-semibold transition-all group">
                    <Plus className="group-hover:rotate-90 transition-transform duration-300" size={20} />
                    Nuevo Servicio
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats Summary */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-surface-dark p-6 rounded-xl border border-white/5 shadow-sm">
                        <Tag className="text-primary mb-4" size={24} />
                        <h3 className="text-white font-bold text-lg mb-1">Categorías de Servicio</h3>
                        <p className="text-gray-400 text-xs mb-6">Distribución de servicios activos.</p>
                        <div className="space-y-3">
                            {[
                                { name: 'Mantenimiento', count: 12, color: 'bg-emerald-500' },
                                { name: 'Reparación', count: 8, color: 'bg-blue-500' },
                                { name: 'Diagnóstico', count: 5, color: 'bg-amber-500' },
                                { name: 'Estética', count: 3, color: 'bg-purple-500' }
                            ].map((cat, i) => (
                                <div key={i} className="flex flex-col gap-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-300">{cat.name}</span>
                                        <span className="text-gray-500 font-bold">{cat.count}</span>
                                    </div>
                                    <div className="w-full bg-surface-darker h-1.5 rounded-full overflow-hidden">
                                        <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${(cat.count / 28) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Services List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-surface-dark rounded-xl border border-white/5 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-white/5 bg-surface-darker/30">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    className="w-full bg-surface-darker border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="Buscar por nombre o descripción..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="divide-y divide-white/5">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <div key={i} className="p-6 h-24 animate-pulse bg-surface-dark"></div>
                                ))
                            ) : services.length > 0 ? (
                                services.map((svc) => (
                                    <div key={svc.id} className="p-6 hover:bg-white/5 transition-colors group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                                    <Wrench size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold mb-1">{svc.name}</h4>
                                                    <span className="text-[10px] uppercase font-bold text-gray-500 bg-surface-darker px-2 py-0.5 rounded border border-white/5">
                                                        {svc.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-500 hover:text-white"><Edit size={16} /></button>
                                                <button className="p-2 text-gray-500 hover:text-primary"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{svc.description}</p>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                                                <DollarSign size={14} />
                                                <span>${svc.basePrice?.toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                <Clock size={14} />
                                                <span>{svc.estimatedTime} min</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-20 text-center">
                                    <Tag className="mx-auto text-gray-600 mb-4" size={48} />
                                    <h3 className="text-white font-bold">Sin servicios en el catálogo</h3>
                                    <p className="text-gray-500 mt-1">Comienza agregando los servicios que ofrece tu taller.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
