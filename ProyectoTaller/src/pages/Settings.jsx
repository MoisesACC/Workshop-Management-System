
import { useState } from 'react';
import {
    User, Lock, Bell, Shield, Camera, Save,
    CheckCircle, AlertCircle, Phone, Mail, FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Settings = () => {
    const { user, updateUserData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: user?.fullName || user?.name || '',
        phone: user?.phone || '',
        avatarUrl: user?.avatarUrl || '',
        documentId: '',
        documentType: 'DNI',
        address: '',
        city: ''
    });

    useEffect(() => {
        if (user?.role === 'USER') {
            fetchClientProfile();
        }
    }, [user]);

    const fetchClientProfile = async () => {
        try {
            const res = await api.get(`/clients/user/${user.id}`);
            const client = res.data;
            setFormData(prev => ({
                ...prev,
                documentId: client.documentId || '',
                documentType: client.documentType || 'DNI',
                address: client.address || '',
                city: client.city || ''
            }));
        } catch (err) {
            console.error("Error fetching client profile:", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess(false);
        setError('');
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Updated UserController endpoint with expanded formData (DNI, Address, City)
            const res = await api.patch(`/users/${user.id}/profile`, formData);
            if (res.data) {
                updateUserData(res.data);
                // Also update local state if needed
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (err) {
            console.error(err);
            setError('Error al actualizar el perfil profesional.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white">Configuración</h2>
                <p className="text-gray-400 text-sm mt-1">Gestiona tu perfil, seguridad y preferencias del sistema.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Navigation Menu */}
                <div className="md:col-span-1 space-y-1">
                    {[
                        { id: 'profile', label: 'Mi Perfil', icon: <User size={18} />, active: true },
                        { id: 'security', label: 'Seguridad', icon: <Lock size={18} /> },
                        { id: 'notifications', label: 'Notificaciones', icon: <Bell size={18} /> },
                        { id: 'workshop', label: 'Datos Taller', icon: <FileText size={18} />, active: false },
                        { id: 'system', label: 'Empresa', icon: <Shield size={18} /> },
                    ].map((item) => (
                        <button
                            key={item.id}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${item.active
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="md:col-span-3 space-y-6">
                    {/* Profile Section */}
                    <div className="bg-surface-dark rounded-xl border border-white/5 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-white/5">
                            <h3 className="text-lg font-bold text-white">Información del Perfil</h3>
                            <p className="text-sm text-gray-500 mt-1">Esta información será visible en el sistema y órdenes.</p>
                        </div>

                        <form onSubmit={handleSaveProfile} className="p-6 space-y-8">
                            {/* Avatar Upload */}
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full bg-surface-darker border-2 border-white/10 overflow-hidden flex items-center justify-center">
                                        {formData.avatarUrl ? (
                                            <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={40} className="text-gray-600" />
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white shadow-lg hover:bg-red-700 transition-colors"
                                        onClick={() => {
                                            const url = prompt('Ingresa la URL de la nueva foto de perfil:');
                                            if (url) setFormData({ ...formData, avatarUrl: url });
                                        }}
                                    >
                                        <Camera size={14} />
                                    </button>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h4 className="text-white font-bold text-sm">Foto de Perfil</h4>
                                    <p className="text-gray-500 text-xs mt-1">Recomendado: Cuadrada, mín. 400x400px.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Nombre Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                        <input
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full bg-surface-darker border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                            placeholder="Ej. Carlos Martínez"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Teléfono</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-surface-darker border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                            placeholder="+51 999 888 777"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Correo Electrónico</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                        <input
                                            value={user?.email || ''}
                                            disabled
                                            className="w-full bg-surface-darker/50 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Rol en el Sistema</label>
                                    <div className="relative">
                                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                        <input
                                            value={user?.role || ''}
                                            disabled
                                            className="w-full bg-surface-darker/50 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Workshop Specific Section */}
                            {user?.role === 'USER' && (
                                <div className="space-y-6 pt-6 border-t border-white/5">
                                    <h4 className="text-sm font-black text-primary uppercase italic tracking-widest flex items-center gap-2">
                                        <Shield size={16} /> Datos de Taller (Requerido para Cotizaciones)
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Tipo de Documento</label>
                                            <select
                                                name="documentType"
                                                value={formData.documentType}
                                                onChange={handleChange}
                                                className="w-full bg-surface-darker border border-white/5 rounded-lg py-2 px-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none appearance-none"
                                            >
                                                <option value="DNI">DNI</option>
                                                <option value="PASSPORT">Pasaporte</option>
                                                <option value="LICENSE">Licencia</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Número de Documento</label>
                                            <input
                                                name="documentId"
                                                value={formData.documentId}
                                                onChange={handleChange}
                                                className="w-full bg-surface-darker border border-white/5 rounded-lg py-2 px-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                                                placeholder="Ej. 77665544"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-6 sm:col-span-2">
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Número de DNI / Documento</label>
                                                    <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/10">
                                                        <Shield size={10} /> Requerido para Citas
                                                    </span>
                                                </div>
                                                <div className="relative group">
                                                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                                                    <input
                                                        type="text"
                                                        className="w-full bg-surface-darker/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all shadow-inner font-bold"
                                                        value={formData.documentId}
                                                        onChange={(e) => setFormData({ ...formData, documentId: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Dirección Oficial</label>
                                                    <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/10">
                                                        <MapPin size={10} /> Facturación Legal
                                                    </span>
                                                </div>
                                                <div className="relative group">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                                                    <input
                                                        type="text"
                                                        className="w-full bg-surface-darker/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all shadow-inner font-bold"
                                                        value={formData.address}
                                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Ciudad</label>
                                            <input
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="w-full bg-surface-darker border border-white/5 rounded-lg py-2 px-4 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                                                placeholder="Ej. Lima"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Status Messages */}
                            {success && (
                                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 text-sm animate-shrink-in">
                                    <CheckCircle size={18} />
                                    <span>Perfil actualizado correctamente.</span>
                                </div>
                            )}
                            {error && (
                                <div className="flex items-center gap-2 text-primary bg-primary/10 p-3 rounded-lg border border-primary/20 text-sm">
                                    <AlertCircle size={18} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="pt-4 border-t border-white/5 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-primary hover:bg-red-700 disabled:opacity-50 text-white px-8 py-2.5 rounded-lg shadow-lg shadow-primary/30 font-bold transition-all flex items-center gap-2"
                                >
                                    {loading ? 'Guardando...' : (
                                        <>
                                            <Save size={18} />
                                            <span>Guardar Cambios</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
