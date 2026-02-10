import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Search,
    Filter,
    Shield,
    User as UserIcon,
    CheckCircle,
    AlertCircle,
    MoreHorizontal,
    Mail,
    Phone,
    FileText,
    Clock,
    ExternalLink,
    Plus,
    MessageSquare
} from 'lucide-react';
import api from '../services/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, complete, incomplete

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users/admin/management');
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users for management:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filter === 'all') return matchesSearch;
        if (filter === 'complete') return matchesSearch && user.isProfileComplete;
        if (filter === 'incomplete') return matchesSearch && !user.isProfileComplete;
        return matchesSearch;
    });

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs mb-2">
                        <Shield size={14} />
                        Control de Acceso
                    </div>
                    <h1 className="text-4xl font-extrabold italic uppercase tracking-tighter">
                        Gestión de <span className="text-primary truncate">Usuarios</span>
                    </h1>
                    <p className="text-gray-500 text-sm">Monitoreo de cuentas y estados de perfil comercial.</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-surface-dark/40 border border-white/5 p-4 rounded-2xl">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Usuarios</p>
                        <p className="text-2xl font-black italic">{users.length}</p>
                    </div>
                    <div className="bg-surface-dark/40 border border-white/5 p-4 rounded-2xl">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Incompletos</p>
                        <p className="text-2xl font-black italic text-orange-500">
                            {users.filter(u => !u.isProfileComplete && u.role === 'USER').length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                <div className="md:col-span-8 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por usuario, nombre o email..."
                        className="w-full bg-surface-dark/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="md:col-span-4 flex gap-2">
                    {['all', 'complete', 'incomplete'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${filter === f
                                ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(216,3,39,0.3)]'
                                : 'bg-surface-dark/40 border-white/10 text-gray-500 hover:border-white/20'
                                }`}
                        >
                            {f === 'all' ? 'Todos' : f === 'complete' ? 'Completos' : 'Pendientes'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Users Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-48 bg-surface-dark/20 border border-white/5 rounded-3xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredUsers.map((user) => (
                            <motion.div
                                layout
                                key={user.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-surface-dark/40 border border-white/5 p-6 rounded-3xl hover:border-primary/30 transition-all group relative overflow-hidden"
                            >
                                {/* Background Pattern */}
                                <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>

                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center text-lg font-black italic border border-white/10 text-gray-400">
                                            {getInitials(user.fullName || user.username)}
                                        </div>
                                        <div>
                                            <h3 className="font-black uppercase italic tracking-tighter text-white">
                                                {user.fullName || user.username}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-widest ${user.role === 'ADMIN' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                                {user.role === 'USER' && (
                                                    <span className={`flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest ${user.isProfileComplete ? 'text-green-500' : 'text-orange-500'
                                                        }`}>
                                                        {user.isProfileComplete ? <CheckCircle size={8} /> : <AlertCircle size={8} />}
                                                        {user.isProfileComplete ? 'Vínculo Ok' : 'Pendiente Datos'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-gray-500 hover:text-white transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>

                                <div className="space-y-3 relative z-10">
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <Mail size={14} className="text-gray-600" />
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <Phone size={14} className="text-gray-600" />
                                        <span>{user.clientPhone || 'No registrado'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <FileText size={14} className="text-gray-600" />
                                        <span>{user.clientDocumentId || 'S/D (Pendiente)'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 italic">
                                        <Clock size={14} className="text-gray-700" />
                                        <span className="truncate">{user.clientAddress || 'Sin dirección registrada'}</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col gap-2">
                                    <button
                                        onClick={() => window.location.href = `/admin/orders/new?clientId=${user.clientId}`}
                                        disabled={!user.clientId}
                                        className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${user.clientId
                                            ? 'bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-white'
                                            : 'bg-white/5 border-white/5 text-gray-600 cursor-not-allowed'
                                            }`}
                                    >
                                        <Plus size={14} /> Generar Cotización
                                    </button>
                                    <button
                                        className="w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <MessageSquare size={14} /> Contactar
                                    </button>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        ID: #{user.id}
                                    </div>
                                    {user.clientId && (
                                        <button
                                            onClick={() => window.location.href = `/admin/clients?search=${user.documentId}`}
                                            className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform"
                                        >
                                            Ver Perfil <ExternalLink size={10} />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
