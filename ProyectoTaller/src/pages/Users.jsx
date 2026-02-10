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
    MessageSquare,
    Trash2,
    Car,
    Info
} from 'lucide-react';
import api from '../services/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, complete, incomplete
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const deleteUser = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta cuenta permanentemente?")) return;

        setIsDeleting(true);
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter(u => u.id !== id));
            if (selectedUser?.id === id) setSelectedUser(null);
        } catch (error) {
            alert("Error al eliminar usuario.");
        } finally {
            setIsDeleting(false);
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
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="text-gray-600 hover:text-primary transition-colors p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="text-gray-500 hover:text-white transition-colors p-2"
                                        >
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </div>
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
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        ID: #{user.id}
                                    </div>
                                    <button
                                        onClick={() => setSelectedUser(user)}
                                        className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform"
                                    >
                                        Detalles Completos <Info size={12} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* User Details Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedUser(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-surface-darker w-full max-w-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
                        >
                            <div className="p-8 md:p-12 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-3xl font-black italic text-primary border border-primary/20">
                                            {getInitials(selectedUser.fullName || selectedUser.username)}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                                                {selectedUser.fullName || selectedUser.username}
                                            </h2>
                                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">{selectedUser.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="p-2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        <ExternalLink className="rotate-45" size={24} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Personal Info */}
                                    <div className="space-y-6">
                                        <h4 className="text-primary font-black uppercase text-xs tracking-[0.3em] flex items-center gap-2">
                                            <Shield size={14} /> Información Legal
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">Documento Identidad</p>
                                                <p className="text-white font-black">{selectedUser.clientDocumentId || 'No proporcionado'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">Dirección Registrada</p>
                                                <p className="text-white font-medium text-sm leading-relaxed">{selectedUser.clientAddress || 'Sin dirección'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">Contacto Directo</p>
                                                <p className="text-primary font-black">{selectedUser.clientPhone || 'Sin teléfono'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vehicle Info */}
                                    <div className="space-y-6">
                                        <h4 className="text-primary font-black uppercase text-xs tracking-[0.3em] flex items-center gap-2">
                                            <Car size={14} /> Unidad Detectada
                                        </h4>
                                        {selectedUser.vehiclePlate ? (
                                            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-500 font-bold uppercase">Placa / ID</span>
                                                    <span className="bg-gray-800 px-3 py-1 rounded text-white font-black">{selectedUser.vehiclePlate}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-500 font-bold uppercase">Marca/Modelo</span>
                                                    <span className="text-white font-black italic uppercase">{selectedUser.vehicleBrand} {selectedUser.vehicleModel}</span>
                                                </div>
                                                <div className="pt-4 border-t border-white/5">
                                                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2 flex items-center gap-2"><MessageSquare size={10} /> Requerimiento de Cliente</p>
                                                    <p className="text-gray-400 text-xs italic font-medium leading-relaxed">
                                                        "{selectedUser.lastRequirement || 'Sin solicitud específica'}"
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-8 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                                                <Car size={32} className="text-gray-700 mx-auto mb-4" />
                                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Sin vehículos registrados</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => window.location.href = `/admin/orders/new?clientId=${selectedUser.clientId}`}
                                        disabled={!selectedUser.clientId}
                                        className="flex-1 bg-primary text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                                    >
                                        <Plus size={16} /> Crear Orden
                                    </button>
                                    <button
                                        onClick={() => deleteUser(selectedUser.id)}
                                        className="flex-1 bg-white/5 border border-white/10 text-gray-500 font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-red-900/20 hover:text-red-500 hover:border-red-500/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Trash2 size={16} /> Eliminar Cuenta
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminUsers;
