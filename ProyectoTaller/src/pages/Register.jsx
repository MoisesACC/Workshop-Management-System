
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hammer, User, Mail, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import api from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: 'USER'
            });
            navigate('/login');
        } catch (error) {
            setError('Error al registrar. El usuario o correo podrían ya estar en uso.');
            console.error('Registration failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(216,3,39,0.15),transparent_70%)]"></div>
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="max-w-xl w-full relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-xl shadow-primary/20 mb-6">
                        <Hammer className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 font-display uppercase">Únete a la Élite</h1>
                    <p className="text-gray-400 font-medium">Crea tu cuenta en <span className="text-primary">Factoría La Caravana</span></p>
                </div>

                <div className="bg-surface-dark/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {error && (
                            <div className="md:col-span-2 bg-primary/10 border border-primary/20 text-primary text-sm p-4 rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre de Usuario</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="username"
                                    className="w-full bg-background-dark/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                    placeholder="Ej. JuanPerez88"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Correo Electrónico</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full bg-background-dark/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                    placeholder="juan@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contraseña</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full bg-background-dark/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirmar</label>
                            <div className="relative group">
                                <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full bg-background-dark/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                                    placeholder="********"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="md:col-span-2 w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transform hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 group mt-4"
                        >
                            {loading ? 'REGISTRANDO...' : 'CREAR MI CUENTA'} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-gray-500 text-sm font-medium">
                            ¿Ya formas parte?{' '}
                            <Link to="/login" className="text-primary font-bold hover:underline">Inicia Sesión</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-gray-500 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                        VOLVER AL INICIO
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
