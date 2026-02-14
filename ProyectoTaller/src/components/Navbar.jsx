
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Hammer, User, Calendar as CalendarIcon, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAdmin, logout } = useAuth();

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/5 bg-background-dark/80 backdrop-blur-xl transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-2 md:py-3">
                {/* Logo - Increased size */}
                <NavLink to="/" className="flex items-center gap-2 group shrink-0">
                    <img src="/assets/img/logo.webp" alt="Factoría La Caravana" className="h-12 md:h-20 w-auto group-hover:scale-105 transition-transform" />
                </NavLink>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2 md:order-2">
                    {/* Access Button - Icon only on mobile to save space */}
                    {user ? (
                        <div className="flex items-center gap-2">
                            <NavLink
                                to={user.role?.toUpperCase() === 'ADMIN' ? "/admin" : "/dashboard"}
                                className="text-white hover:text-primary font-bold rounded-xl text-xs px-3 py-2 border border-white/10 hover:border-primary/40 transition-all flex items-center gap-2 bg-white/5"
                            >
                                <User size={16} />
                                <span className="hidden sm:inline">Mi Perfil</span>
                            </NavLink>
                        </div>
                    ) : (
                        <NavLink
                            to="/login"
                            className="text-white hover:text-primary font-bold rounded-xl text-xs px-3 py-2 border border-white/10 hover:border-primary/40 transition-all flex items-center gap-2 bg-white/5"
                        >
                            <User size={16} />
                            <span className="hidden sm:inline">Acceso</span>
                        </NavLink>
                    )}

                    {/* Booking Button - Redesigned for mobile */}
                    <a href="#booking" className="bg-primary hover:bg-primary-dark text-white p-2.5 md:px-5 md:py-2.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2 active:scale-95">
                        <CalendarIcon size={18} />
                        <span className="hidden md:inline font-bold text-sm">Agendar Cita</span>
                    </a>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center p-2 text-gray-400 rounded-xl md:hidden hover:bg-white/5 transition-colors"
                    >
                        {isOpen ? <X size={26} className="text-white" /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center justify-between w-auto order-1">
                    <ul className="flex flex-row space-x-8 font-bold text-sm tracking-widest uppercase italic">
                        <li>
                            <NavLink to="/" className={({ isActive }) => `transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/servicios" className={({ isActive }) => `transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                                Servicios
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/galeria" className={({ isActive }) => `transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                                Galería
                            </NavLink>
                        </li>
                        <li>
                            <a href="#contact" className="text-gray-400 hover:text-primary transition-colors">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Menu Dropdown - Improved Styling */}
            <div className={`md:hidden absolute w-full transition-all duration-300 ease-in-out border-b border-white/5 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-background-dark/95 backdrop-blur-2xl p-4 space-y-2">
                    <NavLink
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => `block py-4 px-6 rounded-2xl font-black italic uppercase tracking-tighter transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        Inicio
                    </NavLink>
                    <NavLink
                        to="/servicios"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => `block py-4 px-6 rounded-2xl font-black italic uppercase tracking-tighter transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        Servicios
                    </NavLink>
                    <NavLink
                        to="/galeria"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => `block py-4 px-6 rounded-2xl font-black italic uppercase tracking-tighter transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        Galería
                    </NavLink>
                    <a
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="block py-4 px-6 text-gray-400 hover:bg-white/5 hover:text-white rounded-2xl font-black italic uppercase tracking-tighter transition-all"
                    >
                        Contacto
                    </a>
                    {user && (
                        <button
                            onClick={() => { logout(); setIsOpen(false); }}
                            className="w-full text-left py-4 px-6 text-red-500 hover:bg-red-500/10 rounded-2xl font-black italic uppercase tracking-tighter transition-all"
                        >
                            Cerrar Sesión
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
