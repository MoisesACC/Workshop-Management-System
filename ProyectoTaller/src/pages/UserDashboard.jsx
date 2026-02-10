
import {
    Bell, Warehouse, Plus, CheckCircle, Settings, Wrench,
    Calendar, CreditCard, RefreshCw, ClipboardList, Phone, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
    const { user } = useAuth();

    // Mock data for the UI
    const vehicles = [
        {
            id: 1,
            make: "Ford",
            model: "Mustang",
            year: 2018,
            trim: "GT Premium Fastback",
            plate: "ABC-1234",
            mileage: "45,201 km",
            status: "In Service",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlJIorhLuycvE6JRD1IvTDMwiR-eqdZl_BDVn4FWNZfKspHPp0ZW--AkeoKFCtuTEZdPozvi5nUFbYwLWhvMxaSMWGwqMtk9DPCy2GX9V9fKxCAi7PdPZ5wkjmUaOT20EKu2FAJuitM4dYHtxGZgYhGnOd6pSL-kSwS2d-nqQwTrZUNuQB2ptusnGFcvNKyyCYpPovf2qkiJ54kIFTRQU5vvUfi08ObQpvoyNAfCrpS7o2n9iE__dmoRZ5kvI1TKveWpZ_RgqjrA"
        },
        {
            id: 2,
            make: "Toyota",
            model: "RAV4",
            year: 2021,
            trim: "Hybrid XLE",
            plate: "XYZ-9876",
            mileage: "12,500 km",
            status: "Ready",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUljv3XHzAIS5N4Kf4hgb-av0RzkJatY-zHJn3AZVVVjl39q4VlZ9Rba_2riwnE-vO6S_FlJZgIi2dDu1S64xtUhKIz-VFAuCs61bsqVhvRmog3xb5qurKz4KhKtSMk_Czsw1Z-vrgKaWT50EM9_pliVaICPObJyMtLV1AOPpTPei56rbjOUYAN2Ygv0PNeUUHwxocPetCpL6iY0qy4lTi_dqOrZl3FeF0TarbnQcTUS7TU78o3ZXNulijJ58WIYmqTbJABtxu1Q"
        }
    ];

    const activeOrder = {
        number: "WO-8921",
        date: "Oct 24, 2023",
        status: "Repair In Progress",
        step: 3,
        estDelivery: "Oct 28, 2023",
        estTime: "Morning",
        total: 452.00,
        tasks: [
            { id: 1, name: "Visual Inspection", cost: "Included", status: "Done" },
            { id: 2, name: "Computer Diagnostics", cost: "$85.00", status: "Done" },
            { id: 3, name: "Alternator Replacement", cost: "$320.00", status: "Active", part: "ALT-9921" },
            { id: 4, name: "Final Test Drive", cost: "Included", status: "Pending" }
        ],
        notes: [
            { time: "10:42 AM", text: "Found significant wear on the alternator belt. Proceeding with replacement as authorized. Battery levels are normal, no need to replace battery at this time." }
        ]
    };

    return (
        <div className="bg-background-dark font-display text-gray-100 min-h-screen">
            <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pt-24">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Mi Garage y Estado</h1>
                    <p className="text-gray-400 mt-1">Administra tus vehículos y sigue tus servicios activos en tiempo real.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: My Garage List */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <span className="text-primary"><Warehouse size={20} /></span>
                                Mis Vehículos
                            </h2>
                            <button className="text-sm text-primary hover:text-red-400 font-semibold flex items-center gap-1">
                                <Plus size={16} /> Agregar Nuevo
                            </button>
                        </div>

                        {vehicles.map((v) => (
                            <div key={v.id} className={`group relative bg-surface-dark rounded-xl p-4 border-2 transition-transform hover:-translate-y-1 cursor-pointer ${v.status === 'In Service' ? 'border-primary shadow-[0_0_20px_rgba(216,3,39,0.15)]' : 'border-gray-800'}`}>
                                {v.status === 'In Service' && (
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                                            En Taller
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-start gap-4">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                                        <img src={v.img} alt={v.model} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight">{v.year} {v.make} {v.model}</h3>
                                        <p className="text-sm text-gray-400 mt-1">{v.trim}</p>
                                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                                            <span className="bg-gray-800 px-2 py-1 rounded">{v.plate}</span>
                                            <span>{v.mileage}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Active Work Order Details */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-surface-dark rounded-xl border border-gray-800 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold">Orden #{activeOrder.number}</h2>
                                        <p className="text-gray-400 text-sm mt-1">Creada el {activeOrder.date}</p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
                                        <span className="text-primary animate-spin"><RefreshCw size={18} /></span>
                                        <span className="text-primary font-bold">{activeOrder.status}</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative mb-14 mt-4">
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 rounded-full"></div>
                                    <div className="absolute top-1/2 left-0 w-3/5 h-1 bg-gradient-to-r from-primary/50 to-primary -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(216,3,39,0.5)]"></div>

                                    <div className="relative flex justify-between w-full">
                                        {[
                                            { label: 'Recibido', icon: <CheckCircle size={14} />, active: activeOrder.step >= 1 },
                                            { label: 'Diagnóstico', icon: <CheckCircle size={14} />, active: activeOrder.step >= 2 },
                                            { label: 'Reparación', icon: <Wrench size={16} />, active: activeOrder.step >= 3, pulse: true },
                                            { label: 'Control', icon: null, stepNum: 4, active: activeOrder.step >= 4 },
                                            { label: 'Listo', icon: null, stepNum: 5, active: activeOrder.step >= 5 }
                                        ].map((s, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2 group relative">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 ring-4 ring-surface-dark shadow-lg ${s.active ? 'bg-primary text-white' : 'bg-gray-800 text-gray-500'} ${s.pulse ? 'w-10 h-10 -mt-1 shadow-[0_0_15px_rgba(216,3,39,0.6)]' : ''}`}>
                                                    {s.icon ? (s.pulse ? <span className="animate-pulse">{s.icon}</span> : s.icon) : (s.stepNum)}
                                                </div>
                                                <span className={`text-xs absolute -bottom-8 w-24 text-center ${s.active ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                                                    {s.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Estimate Block */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-800">
                                    <div className="bg-gray-900/50 p-4 rounded-lg flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Entrega Estimada</p>
                                            <p className="text-lg font-bold text-white">{activeOrder.estDelivery} <span className="text-sm font-normal text-gray-500">({activeOrder.estTime})</span></p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                                            <CreditCard size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Actual</p>
                                            <p className="text-lg font-bold text-white">${activeOrder.total.toFixed(2)} <span className="text-sm font-normal text-gray-500">USD</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Split Details View */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Service Breakdown */}
                            <div className="bg-surface-dark rounded-xl border border-gray-800 p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
                                    Detalle de Servicios
                                    <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-1 rounded">2/4 Completados</span>
                                </h3>
                                <div className="space-y-3">
                                    {activeOrder.tasks.map((task) => (
                                        <div key={task.id} className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${task.status === 'Active' ? 'bg-primary/5 border border-primary/20' : 'hover:bg-gray-800/50'} ${task.status === 'Pending' ? 'opacity-60' : ''}`}>
                                            <div className={`mt-0.5 ${task.status === 'Done' ? 'text-primary' : task.status === 'Active' ? 'text-primary animate-spin' : 'text-gray-600'}`}>
                                                {task.status === 'Done' ? <CheckCircle size={18} /> : task.status === 'Active' ? <RefreshCw size={18} /> : <span>○</span>}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <p className={`text-sm ${task.status === 'Active' ? 'font-bold text-primary' : 'font-semibold'}`}>{task.name}</p>
                                                    <span className={`text-xs font-bold ${task.status === 'Done' ? 'text-green-500' : task.status === 'Active' ? 'text-primary' : 'text-gray-500'}`}>
                                                        {task.status === 'Done' ? 'Listo' : task.status === 'Active' ? 'Activo' : 'Pendiente'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {task.part ? `Parte #${task.part} • ` : ''}{task.cost}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-800 text-right">
                                    <button className="text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center justify-end gap-1 w-full">
                                        Ver Factura Completa <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Mechanic Notes */}
                            <div className="space-y-6">
                                <div className="bg-surface-dark rounded-xl border border-gray-800 p-6 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                        <span className="text-gray-500"><ClipboardList size={20} /></span>
                                        Notas del Mecánico
                                    </h3>
                                    <div className="bg-gray-900 p-4 rounded-lg text-sm text-gray-300 leading-relaxed font-mono border border-gray-800">
                                        {activeOrder.notes.map((n, i) => (
                                            <div key={i}>
                                                <span className="text-primary font-bold block mb-1">@ {n.time}:</span>
                                                {n.text}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">
                                            Responder
                                        </button>
                                        <button className="flex-1 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-primary/20">
                                            Llamar Taller
                                        </button>
                                    </div>
                                </div>

                                {/* Upsell */}
                                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">Oferta Especial</span>
                                        <h4 className="font-bold text-white text-lg">¿Añadir Detallado Premium?</h4>
                                        <p className="text-gray-400 text-xs mt-1 mb-4">Obtén 20% de descuento en limpieza interior mientras tu auto está en el taller.</p>
                                        <button className="text-white text-sm font-bold border-b border-primary pb-0.5 hover:text-primary transition-colors">
                                            Añadir a la Orden (+$45)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
