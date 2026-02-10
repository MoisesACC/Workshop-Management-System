
import { useState, useEffect } from 'react';
import {
    Users, Search, Filter, Plus, Mail, Phone,
    MoreVertical, Edit, Trash2, Calendar, FileText
} from 'lucide-react';
import api from '../services/api';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await api.get('/clients');
            setClients(res.data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredClients = clients.filter(c =>
        (c.firstName + ' ' + c.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.documentId.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Gestión de Clientes</h2>
                    <p className="text-gray-400 text-sm mt-1">Administra la base de datos de clientes y sus vehículos.</p>
                </div>
                <button className="bg-primary hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-primary/30 flex items-center gap-2 font-semibold transition-all group">
                    <Plus className="group-hover:rotate-90 transition-transform duration-300" size={20} />
                    Nuevo Cliente
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 bg-surface-dark p-4 rounded-xl border border-white/5">
                <div className="relative grow max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        className="w-full bg-surface-darker border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                        placeholder="Buscar por nombre, correo o DNI..."
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <select className="bg-surface-darker border border-white/10 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-300 focus:ring-primary focus:border-primary appearance-none cursor-pointer">
                        <option>Todos los Estados</option>
                        <option>Activos</option>
                        <option>Inactivos</option>
                    </select>
                    <button className="p-2 text-gray-400 hover:text-white bg-surface-darker border border-white/5 rounded-lg hover:border-primary transition-colors">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Clients List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="bg-surface-dark h-48 rounded-xl border border-white/5 animate-pulse"></div>
                    ))
                ) : filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                        <div key={client.id} className="bg-surface-dark p-6 rounded-xl border border-white/5 group hover:border-primary/50 transition-all shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl uppercase">
                                    {client.firstName[0]}{client.lastName[0]}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded"><Edit size={16} /></button>
                                    <button className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/5 rounded"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-1 capitalize">
                                {client.firstName} {client.lastName}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4 font-mono">{client.documentId}</p>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Mail size={14} className="text-primary/70" />
                                    <span>{client.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Phone size={14} className="text-primary/70" />
                                    <span>{client.phone}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                                    <FileText size={14} /> Ver Historial
                                </button>
                                <button className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1">
                                    <Calendar size={14} /> Agendar Turno
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-surface-dark rounded-xl border border-dashed border-white/10">
                        <Users className="mx-auto text-gray-600 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-white">No se encontraron clientes</h3>
                        <p className="text-gray-500 mt-2">Prueba ajustando tu búsqueda o agrega un nuevo cliente.</p>
                        <button className="mt-6 text-primary font-semibold hover:underline">Agregar mi primer cliente</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Clients;
