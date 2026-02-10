
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Hammer, User, Calendar as CalendarIcon, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAdmin, logout } = useAuth();

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
                <NavLink to="/" className="flex items-center gap-2 group">
                    <span className="text-primary text-3xl group-hover:scale-110 transition-transform"><Hammer size={32} /></span>
                    <span className="self-center text-xl font-bold whitespace-nowrap text-white tracking-wide">FACTORÍA <span className="text-primary">LA CARAVANA</span></span>
                </NavLink>

                <div className="flex md:order-2 space-x-3 md:space-x-4">
                    {user ? (
                        <>
                            <NavLink
                                to={isAdmin ? "/admin" : "/dashboard"}
                                className="text-white hover:text-primary font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors flex items-center gap-2 border border-white/20 hover:border-primary/50"
                            >
                                <User size={18} />
                                {user.username}
                            </NavLink>
                            <button onClick={logout} className="text-gray-400 hover:text-white text-sm">Salir</button>
                        </>
                    ) : (
                        <NavLink
                            to="/login"
                            className="text-white hover:text-primary font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors flex items-center gap-2 border border-white/20 hover:border-primary/50"
                        >
                            <User size={18} />
                            Acceso Clientes
                        </NavLink>
                    )}

                    <a href="#booking" className="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary/30 font-medium rounded-lg text-sm px-5 py-2 text-center transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                        <CalendarIcon size={18} />
                        <span className="hidden sm:inline">Agendar Cita</span>
                    </a>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg bg-surface-dark md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <NavLink to="/" className={({ isActive }) => `block py-2 px-3 rounded md:p-0 transition-colors ${isActive ? 'text-primary' : 'text-gray-300 hover:text-primary'}`}>
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <a href="#services" className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors">
                                Servicios
                            </a>
                        </li>
                        <li>
                            <a href="#gallery" className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors">
                                Galería
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
