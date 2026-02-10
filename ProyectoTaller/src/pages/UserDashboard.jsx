import { useState, useEffect } from 'react';
import {
    Activity, Box, Calendar, CheckCircle, ChevronRight,
    ClipboardList, Clock, CreditCard, Droplets, Gauge,
    History, MapPin, MessageSquare, ShieldCheck,
    Zap, AlertTriangle, Search, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

/* --- SUB-COMPONENTS --- */

const CurrentServiceView = ({ data }) => {
    const steps = [
        { id: 'RECEPTION', label: 'Recepción', icon: <Box size={20} /> },
        { id: 'INSPECTION', label: 'Inspección', icon: <Search size={20} /> },
        { id: 'REPAIRING', label: 'Reparación', icon: <Zap size={20} /> },
        { id: 'TESTING', label: 'Pruebas', icon: <Activity size={20} /> },
        { id: 'READY', label: 'Listo', icon: <CheckCircle size={20} /> }
    ];

    const activeOrder = data.activeOrder || { status: 'RECEPTION', estimatedDelivery: 'Pendiente', timeline: [] };
    const vehicle = data.vehicle || { model: 'Vehículo', year: '----', plate: '----', vin: '-----------------', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800' };

    const currentStepIdx = steps.findIndex(s => s.id === activeOrder.status);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
        >
            {/* Header: Vehicle Main Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-8 bg-surface-dark/40 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="w-full md:w-1/2 relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img
                            src={vehicle.image}
                            className="w-full h-auto relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -scale-x-100"
                            alt="Vehicle"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-gray-800 text-[10px] font-black rounded uppercase tracking-widest">{vehicle.year} MODEL</span>
                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-black rounded uppercase tracking-widest">Premium Care</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white italic leading-none truncate uppercase tracking-tighter">
                            {vehicle.model}
                        </h1>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Placa</p>
                                <p className="text-lg font-bold text-white">{vehicle.plate}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Chasis / VIN</p>
                                <p className="text-lg font-bold text-white tracking-widest leading-none">...{vehicle.vin.slice(-6)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 bg-primary rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform"></div>
                    <div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Entrega Estimada</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-white">{activeOrder.estimatedDelivery.split(',')[0]}</span>
                        </div>
                        <p className="text-white font-bold mt-1 opacity-90">{activeOrder.estimatedDelivery.split(',')[1] || ''}</p>
                    </div>
                    <button className="w-full bg-white text-primary font-black py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors shadow-2xl">
                        Aprobar Reparaciones Adicionales <ChevronRight className="inline ml-1" size={16} />
                    </button>
                </div>
            </div>

            {/* Stepper Progress */}
            <div className="bg-surface-dark/40 border border-white/5 p-10 rounded-3xl">
                <div className="relative flex justify-between">
                    <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-white/10"></div>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                        className="absolute top-[22px] left-0 h-[2px] bg-primary shadow-[0_0_15px_#d80327]"
                    ></motion.div>

                    {steps.map((step, idx) => (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${idx <= currentStepIdx ? 'bg-primary border-primary shadow-[0_0_20px_rgba(216,3,39,0.4)]' : 'bg-[#0a0a0b] border-white/10 text-gray-600'}`}>
                                {idx < currentStepIdx ? <CheckCircle size={20} className="text-white" /> : step.icon}
                                {idx === currentStepIdx && (
                                    <motion.div
                                        layoutId="stepPulse"
                                        className="absolute inset-0 rounded-full bg-primary/30 animate-ping"
                                    />
                                )}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${idx <= currentStepIdx ? 'text-white' : 'text-gray-600'}`}>{step.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Gallery & Timeline */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Media Gallery (Mocked for premium feel) */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black flex items-center gap-2 italic uppercase tracking-tighter">
                                <span className="w-2 h-6 bg-primary rounded-full"></span>
                                Galería de Inspección
                            </h3>
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">4 Nuevas Fotos</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { img: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=400", label: "Carrocería Ext.", hot: true },
                                { img: "https://images.unsplash.com/photo-1592909265431-29474775836d?auto=format&fit=crop&q=80&w=400", label: "Motor Bay" },
                                { img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400", label: "Interiores" },
                                { img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400", label: "Chasis / Inf." }
                            ].map((item, i) => (
                                <div key={i} className="relative h-32 rounded-2xl overflow-hidden group cursor-pointer border border-white/5">
                                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute bottom-2 left-2 text-[8px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{item.label}</div>
                                    {item.hot && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full animate-ping"></div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-surface-dark/20 rounded-3xl p-8 border border-white/5">
                        <h3 className="text-lg font-black flex items-center gap-2 italic uppercase tracking-tighter mb-8">
                            <span className="w-2 h-6 bg-primary rounded-full"></span>
                            Live Timeline
                        </h3>
                        <div className="space-y-8">
                            {activeOrder.timeline.map((event, i) => (
                                <div key={i} className="relative pl-8 border-l border-white/10 pb-8 last:pb-0">
                                    <div className={`absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full ${event.completed ? 'bg-primary' : 'bg-gray-800'}`}></div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                        <div>
                                            <h4 className={`text-sm font-black uppercase tracking-widest ${event.completed ? 'text-white' : 'text-gray-500'}`}>{event.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-gray-400">{event.time}</p>
                                                <p className="text-[9px] font-medium text-gray-600">Por {event.technician}</p>
                                            </div>
                                            {event.technician !== 'Admin' && (
                                                <div className="w-8 h-8 rounded-full border border-primary/20 p-[1px]">
                                                    <img src="https://i.pravatar.cc/50?u=tech" className="w-full h-full rounded-full grayscale" alt="Tech" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Quote Breakdown */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-surface-dark/40 border border-white/5 p-8 rounded-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black italic uppercase tracking-tighter">Cotización en Vivo</h3>
                            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded uppercase tracking-widest">Estimado</span>
                        </div>
                        <div className="space-y-4">
                            {data.currentQuote.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-xs py-2 border-b border-white/5 last:border-0">
                                    <div className="flex gap-2 items-center">
                                        {item.isPart ? <Box size={14} className="text-gray-500" /> : <Zap size={14} className="text-primary" />}
                                        <span className="text-gray-300">{item.description}</span>
                                    </div>
                                    <span className="font-bold text-white">${item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex justify-between items-end">
                                <div className="text-left w-full">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Actual</p>
                                    <p className="text-gray-600 text-[10px]">Incl. impuestos y descuentos</p>
                                </div>
                                <div className="text-right w-full">
                                    <p className="text-3xl font-black text-white italic">${data.currentQuote.total.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col gap-3">
                                <button className="w-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-3 rounded-xl uppercase tracking-widex shadow-inner transition-all border border-white/5">Descargar PDF del Reporte</button>
                                <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold py-3 rounded-xl uppercase tracking-widex transition-all border border-primary/20">Solicitar Explicación del Técnico</button>
                            </div>
                        </div>
                    </div>

                    {/* Specialist Card */}
                    <div className="bg-[#0f0f12] border border-white/5 p-6 rounded-3xl flex items-center gap-4 group">
                        <div className="relative">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Specialist" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#0f0f12] rounded-full"></div>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Especialista Asignado</p>
                            <p className="font-black text-white uppercase italic tracking-tighter">Marc Silverstone</p>
                            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Master Technician • 12 years exp.</p>
                        </div>
                        <button className="ml-auto w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                            <MessageSquare size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const HealthView = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-12"
        >
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-2">
                    <span className="text-primary font-black uppercase tracking-widest text-xs">Biometría del Vehículo</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter shrink-0">Diagnóstico Digital</h2>
                </div>
                <div className="bg-surface-dark border border-white/5 p-4 rounded-2xl flex items-center gap-6">
                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Última Inspección</p>
                        <p className="text-sm font-black text-white tracking-widest uppercase">14 Oct, 2023</p>
                    </div>
                    <div className="w-px h-10 bg-white/10"></div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Odómetro</p>
                        <p className="text-sm font-black text-white tracking-widest uppercase">24,500 KM</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.healthReport.map((system, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-surface-dark/40 border border-white/5 p-6 rounded-3xl relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-30 ${system.status === 'OPTIMAL' ? 'bg-green-500' : system.status === 'ATTENTION' ? 'bg-orange-500' : 'bg-primary'}`}></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${system.status === 'OPTIMAL' ? 'bg-green-500/10 text-green-500' : system.status === 'ATTENTION' ? 'bg-orange-500/10 text-orange-500' : 'bg-primary/10 text-primary'}`}>
                                {system.icon === 'engine' && <Zap size={24} />}
                                {system.icon === 'disc' && <Droplets size={24} />}
                                {system.icon === 'shield' && <ShieldCheck size={24} />}
                                {system.icon === 'circle' && <Gauge size={24} />}
                            </div>
                            <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${system.status === 'OPTIMAL' ? 'bg-green-500 text-white' : system.status === 'ATTENTION' ? 'bg-orange-500 text-white' : 'bg-primary text-white'}`}>
                                {system.status === 'OPTIMAL' ? 'Óptimo' : system.status === 'ATTENTION' ? 'Atención' : 'Crítico'}
                            </div>
                        </div>
                        <h4 className="font-black uppercase tracking-tight text-gray-400 text-sm mb-4">{system.name}</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-gray-500">Estado de Salud</span>
                                <span className={system.status === 'OPTIMAL' ? 'text-green-500' : system.status === 'ATTENTION' ? 'text-orange-500' : 'text-primary'}>{system.health}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${system.health}%` }}
                                    className={`h-full ${system.status === 'OPTIMAL' ? 'bg-green-500' : system.status === 'ATTENTION' ? 'bg-orange-500' : 'bg-primary'}`}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface-dark/40 border border-white/5 p-8 rounded-3xl space-y-6">
                    <h3 className="text-lg font-black flex items-center gap-2 italic uppercase tracking-tighter">
                        <span className="w-2 h-6 bg-primary rounded-full"></span>
                        Recomendaciones del Experto
                    </h3>
                    <div className="space-y-4">
                        {[
                            { title: "Mantenimiento Preventivo Inmediato", desc: "Se recomienda el cambio de pastillas de freno delanteras en los próximos 500km.", type: "critical", cost: "$280.00" },
                            { title: "Monitoreo Trimestral", desc: "La batería presenta una carga estable, pero por la antigüedad se sugiere prueba de esfuerzo.", type: "attention", date: "Enero 2024" },
                            { title: "Detallado Estético Sugerido", desc: "Se detectaron micro-rayaduras en el capó. Aplicación de sellador cerámico recomendada.", type: "optimal", cost: "$150.00" }
                        ].map((rec, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-[#0a0a0b] border border-white/5 group hover:border-primary/30 transition-colors">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${rec.type === 'critical' ? 'bg-primary/20 text-primary' : rec.type === 'attention' ? 'bg-orange-500/20 text-orange-500' : 'bg-gray-800 text-gray-400'}`}>
                                    {rec.type === 'critical' && <AlertTriangle size={20} />}
                                    {rec.type === 'attention' && <Clock size={20} />}
                                    {rec.type === 'optimal' && <Droplets size={20} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h5 className="text-xs font-black uppercase tracking-widest text-white">{rec.title}</h5>
                                        <span className="text-[10px] font-bold text-gray-500">{rec.cost || rec.date}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{rec.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden group border border-white/5">
                    <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-1000" alt="Interior" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 space-y-4">
                        <div className="bg-primary px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest inline-block">Premium Care</div>
                        <h3 className="text-3xl font-black text-white uppercase italic leading-none tracking-tighter">Tu vehículo <br /> merecer un cuidado <br /> de élite</h3>
                        <button className="bg-white text-black font-black text-xs px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Agendar Mantenimiento</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const HistoryView = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
        >
            <div className="text-center space-y-4">
                <span className="text-primary font-black uppercase tracking-widest text-xs">Life Cycle Management</span>
                <h2 className="text-5xl md:text-7xl font-black text-white italic truncate uppercase tracking-tighter">Historial Completo</h2>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full shadow-[0_0_10px_#d80327]"></div>
            </div>

            <div className="relative max-w-4xl mx-auto py-10">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>

                <div className="space-y-20">
                    {data.history.map((entry, i) => (
                        <div key={i} className={`relative flex flex-col items-center md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Point on line */}
                            <div className="absolute left-1/2 top-0 w-4 h-4 bg-primary rounded-full -translate-x-1/2 shadow-[0_0_15px_#d80327] hidden md:block"></div>

                            <div className="md:w-1/2 space-y-4 text-center md:text-left">
                                <span className="p-2 bg-white/5 text-[10px] font-black rounded uppercase tracking-widest text-primary border border-primary/20">{entry.date}</span>
                                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">{entry.service}</h4>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Gauge size={14} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{entry.mileage}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <CreditCard size={14} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{entry.cost}</span>
                                    </div>
                                </div>
                                <button className="text-[10px] font-black text-primary uppercase tracking-widest border-b border-primary/30 pb-0.5 hover:border-primary transition-all">Ver Reporte Técnico</button>
                            </div>

                            <div className="md:w-1/2">
                                <div className="h-48 w-full bg-surface-dark/40 rounded-3xl border border-white/5 overflow-hidden group">
                                    <img src={`https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=500&sig=${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="History" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const UserDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('current'); // current, health, history
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            const res = await api.get(`/customer/${user.id}/dashboard`);
            setData(res.data);
        } catch (err) {
            console.error("Error fetching dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            />
        </div>
    );

    if (!data) return (
        <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full"
            >
                <div className="text-center mb-12">
                    <div className="inline-flex p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-6">
                        <Activity size={40} className="text-primary" />
                    </div>
                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Tu Garage está esperando</h2>
                    <p className="text-gray-400 text-lg">Actualmente no tienes un servicio en curso. Sigue estos pasos para activar tu panel premium:</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { step: "01", title: "Agenda", desc: "Usa el botón de 'Agendar Cita' en el menú superior.", icon: <Calendar size={20} /> },
                        { step: "02", title: "Check-in", desc: "Trae tu vehículo a Factoría La Caravana para la inspección inicial.", icon: <Box size={20} /> },
                        { step: "03", title: "Activa", desc: "Una vez ingresado, verás aquí el progreso y diagnóstico en vivo.", icon: <Zap size={20} /> }
                    ].map((item, i) => (
                        <div key={i} className="bg-surface-dark/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 text-primary/20 font-black text-2xl group-hover:text-primary/40 transition-colors">{item.step}</div>
                            <div className="text-primary mb-4">{item.icon}</div>
                            <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-widest">{item.title}</h4>
                            <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/#booking" className="bg-primary text-white font-black py-4 px-8 rounded-xl uppercase tracking-widest text-xs hover:bg-red-700 transition-all text-center">Agendar mi primera cita</a>
                    <button className="bg-white/5 text-gray-400 border border-white/10 font-black py-4 px-8 rounded-xl uppercase tracking-widest text-xs hover:bg-white/10 transition-all text-center">Ver servicios sugeridos</button>
                </div>
            </motion.div>
        </div>
    );

    const tabs = [
        { id: 'current', label: 'Servicio Actual', icon: <Activity size={18} /> },
        { id: 'health', label: 'Salud del Auto', icon: <ShieldCheck size={18} /> },
        { id: 'history', label: 'Historial Clínico', icon: <History size={18} /> }
    ];

    return (
        <div className="bg-[#0a0a0b] min-h-screen text-gray-200 font-display selection:bg-primary/30">
            {/* Header / Nav Tabs */}
            <div className="fixed top-16 left-0 right-0 z-40 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex gap-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative h-16 flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_#d80327]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
                                <MessageSquare size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-red-600 p-[2px]">
                                <img src={user.avatarUrl || "https://i.pravatar.cc/100"} className="w-full h-full rounded-full object-cover border-2 border-[#0a0a0b]" alt="Profile" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-40 pb-20">
                <AnimatePresence mode="wait">
                    {activeTab === 'current' && <CurrentServiceView data={data} key="current" />}
                    {activeTab === 'health' && <HealthView data={data} key="health" />}
                    {activeTab === 'history' && <HistoryView data={data} key="history" />}
                </AnimatePresence>
            </main>

            {/* Bottom Stats Floating Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-surface-dark/90 backdrop-blur-lg border-t border-white/5 py-4 z-40">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Conectado al Taller
                        </div>
                        <div className="hidden sm:block">Autoguardado: Activo (hace 2 min)</div>
                    </div>
                    <div>Factoría La Caravana CRM v2.4.0</div>
                </div>
            </div>
        </div>
    );
};




export default UserDashboard;
