
import {
    LayoutDashboard, Construction, Users, Shield,
    Wrench, Settings, LogOut, FileText, Plus,
    Package, Map
} from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
        { icon: <Construction size={20} />, label: "Ordenes", path: "/admin/orders", count: 12 },
        { icon: <Users size={20} />, label: "Clientes", path: "/admin/clients" },
        { icon: <Shield size={20} />, label: "Cuentas", path: "/admin/users" },
        { icon: <Package size={20} />, label: "Inventario", path: "/admin/inventory", alert: true },
        { icon: <Wrench size={20} />, label: "Servicios", path: "/admin/services" },
    ];

    return (
        <aside className="w-64 bg-surface-darker border-r border-white/5 flex flex-col h-screen sticky left-0 top-0 z-20">
            <div className="h-20 flex items-center px-8 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20">
                        <Settings className="text-white" size={20} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight leading-none text-white font-display">FACTORÍA</h1>
                        <p className="text-xs text-primary font-semibold tracking-widest uppercase font-display">La Caravana</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-1">
                {menuItems.map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                            ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-primary'}
                        `}
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                        {item.count && <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${item.count > 0 ? 'bg-primary/20 text-primary' : 'bg-gray-800 text-gray-500'}`}>{item.count}</span>}
                        {item.alert && <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse"></span>}
                    </NavLink>
                ))}

                <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gestión</p>
                </div>
                <NavLink to="/admin/finances" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-primary'}`}>
                    <FileText size={20} /> <span className="font-medium">Finanzas</span>
                </NavLink>
                <NavLink to="/admin/settings" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-primary'}`}>
                    <Settings size={20} /> <span className="font-medium">Configuración</span>
                </NavLink>
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-10 h-10 rounded-full border-2 border-primary/50 overflow-hidden flex items-center justify-center bg-surface-dark">
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt="Admin" className="w-full h-full object-cover" />
                        ) : (
                            <Users className="text-gray-600" size={20} />
                        )}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{user?.fullName || user?.name || 'Administrador'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.role || 'Jefe de Taller'}</p>
                    </div>
                    <button onClick={handleLogout} className="ml-auto text-gray-400 hover:text-primary transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
