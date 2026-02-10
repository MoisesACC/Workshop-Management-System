import { useState, useEffect } from 'react';
import {
    Activity, Box, Calendar, CheckCircle, ChevronRight,
    ClipboardList, Clock, CreditCard, Droplets, Gauge,
    History, MapPin, MessageSquare, ShieldCheck,
    Zap, AlertTriangle, Search, Info, UserPlus, FileText
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

const ProfileActivationCenter = ({ onComplete }) => {
    const { user, updateUserData } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        documentId: '',
        documentType: 'DNI',
        address: '',
        city: 'Lima',
        phone: user?.phone || '',
        // Vehicle Fields
        vehiclePlate: '',
        vehicleBrand: '',
        vehicleModel: '',
        vehicleYear: new Date().getFullYear(),
        vehicleMileage: '',
        vehicleRequirement: ''
    });

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await api.patch(`/users/${user.id}/profile`, {
                ...formData,
                fullName: user.fullName || user.name,
                vehicleYear: parseInt(formData.vehicleYear),
                vehicleMileage: parseInt(formData.vehicleMileage) || 0
            });
            updateUserData(res.data);
            onComplete();
        } catch (err) {
            console.error("Error al activar perfil:", err);
            alert("Hubo un error al guardar tus datos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#0a0a0b] border border-white/5 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden">
            {/* Dynamic background effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <div className="inline-flex p-4 rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-[0_0_30px_rgba(216,3,39,0.1)]">
                                    <ShieldCheck size={40} />
                                </div>
                                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">
                                    Activa tu Panel <span className="text-primary">Premium</span>
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                                    Para brindarte servicios en tiempo real, agendar citas y generar cotizaciones válidas, necesitamos verificar tu identidad legal y datos de contacto oficiales.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
                                    <MessageSquare className="text-primary mb-4 group-hover:scale-110 transition-transform" size={24} />
                                    <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2">Contacto de Especialista</h4>
                                    <p className="text-[10px] text-gray-500 uppercase leading-relaxed font-bold">Recibe notificaciones críticas y aprobaciones técnicas directas de tu mecánico.</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
                                    <ClipboardList className="text-primary mb-4 group-hover:scale-110 transition-transform" size={24} />
                                    <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2">Facturación y Garantía</h4>
                                    <p className="text-[10px] text-gray-500 uppercase leading-relaxed font-bold">Vincula tus comprobantes de pago y garantías de servicio a tu identidad fiscal.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 pt-8 items-center">
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full sm:w-auto bg-primary hover:bg-red-700 text-white font-black py-5 px-12 rounded-2xl uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-3 group"
                                >
                                    Iniciar Activación <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Toma menos de 60 segundos</p>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center gap-6">
                                <button onClick={() => setStep(1)} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 transition-colors border border-white/5">
                                    <History size={20} />
                                </button>
                                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Verificación de Identidad</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Número de DNI / Documento</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: 77665544"
                                        className="w-full bg-surface-darker/80 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner font-bold"
                                        value={formData.documentId}
                                        onChange={(e) => setFormData({ ...formData, documentId: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Teléfono de Contacto</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: 999 888 777"
                                        className="w-full bg-surface-darker/80 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner font-bold"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Dirección Física</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/50" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Dirección completa para facturación oficial"
                                            className="w-full bg-surface-darker/80 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner font-bold"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-white/5">
                                <button
                                    onClick={() => {
                                        if (!formData.documentId || !formData.address) return alert("Completa los campos.");
                                        setStep(3);
                                    }}
                                    className="bg-primary hover:bg-red-700 text-white font-black py-5 px-12 rounded-2xl uppercase tracking-[0.2em] shadow-xl transition-all flex items-center gap-3 active:scale-95"
                                >
                                    Siguiente Paso: Mi Auto <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center gap-6">
                                <button onClick={() => setStep(2)} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 transition-colors border border-white/5">
                                    <History size={20} />
                                </button>
                                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Mi Garaje Personal</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Placa / Patente</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: ABC-123"
                                        className="w-full bg-surface-darker/80 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-primary transition-all shadow-inner font-bold"
                                        value={formData.vehiclePlate}
                                        onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Marca</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Toyota / BMW"
                                        className="w-full bg-surface-darker/80 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-primary transition-all shadow-inner font-bold"
                                        value={formData.vehicleBrand}
                                        onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Modelo</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Corolla / X5"
                                        className="w-full bg-surface-darker/80 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-primary transition-all shadow-inner font-bold"
                                        value={formData.vehicleModel}
                                        onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Año</label>
                                    <input
                                        type="number"
                                        className="w-full bg-surface-darker/80 border border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-primary transition-all shadow-inner font-bold"
                                        value={formData.vehicleYear}
                                        onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary px-1">Kilometraje Aproximado</label>
                                    <div className="relative">
                                        <Gauge className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/50" size={20} />
                                        <input
                                            type="number"
                                            placeholder="Importante para el plan de mantenimiento"
                                            className="w-full bg-surface-darker/80 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:border-primary transition-all shadow-inner font-bold"
                                            value={formData.vehicleMileage}
                                            onChange={(e) => setFormData({ ...formData, vehicleMileage: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-white/5">
                                <button
                                    onClick={() => {
                                        if (!formData.vehiclePlate || !formData.vehicleBrand) return alert("Danos al menos la placa y marca.");
                                        setStep(4);
                                    }}
                                    className="bg-primary hover:bg-red-700 text-white font-black py-5 px-12 rounded-2xl uppercase tracking-[0.2em] shadow-xl transition-all flex items-center gap-3 active:scale-95"
                                >
                                    Siguiente Paso: Mi Consulta <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="flex items-center gap-6">
                                <button onClick={() => setStep(3)} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 transition-colors border border-white/5">
                                    <History size={20} />
                                </button>
                                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Plan de Servicio</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="p-8 rounded-[2rem] bg-surface-darker/50 border border-white/5">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                            <Zap size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black uppercase tracking-widest text-xs">¿Qué requiere tu unidad hoy?</h4>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Describe fallas, ruidos o el servicio preventivo que buscas.</p>
                                        </div>
                                    </div>
                                    <textarea
                                        rows="5"
                                        placeholder="Ej: Siento una vibración en el volante al frenar y requiero cambio de aceite sintético..."
                                        className="w-full bg-surface-darker/80 border border-white/5 rounded-3xl py-6 px-8 text-white focus:outline-none focus:border-primary transition-all shadow-inner font-medium resize-none text-sm"
                                        value={formData.vehicleRequirement}
                                        onChange={(e) => setFormData({ ...formData, vehicleRequirement: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="text-primary"><CheckCircle size={16} /></div>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Generación de Cotización Inicial</p>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="text-primary"><CheckCircle size={16} /></div>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Sincronización con Taller Físico</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3 text-orange-400 bg-orange-400/5 px-4 py-2 rounded-xl border border-orange-400/10">
                                    <Info size={14} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Activación Final de Panel</p>
                                </div>
                                <button
                                    disabled={loading || !formData.vehicleRequirement}
                                    onClick={handleSave}
                                    className="w-full sm:w-auto bg-white hover:bg-primary hover:text-white text-black font-black py-5 px-12 rounded-2xl uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? 'Inicializando Garage...' : 'Completar Activación'}
                                    {!loading && <CheckCircle size={20} />}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
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

    if (!data && !loading) {
        return (
            <div className="bg-[#050505] min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-4 mb-16">
                        <div className="inline-flex p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-4">
                            <UserPlus size={40} className="text-primary" />
                        </div>
                        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                            Bienvenido, <span className="text-primary truncate">{user?.fullName || user?.username}</span>
                        </h1>
                        <p className="text-gray-500 text-base max-w-2xl mx-auto font-medium">
                            Estamos preparando tu garage digital. Completa tu registro profesional para empezar a gestionar tus vehículos y servicios.
                        </p>
                    </div>
                    <ProfileActivationCenter onComplete={fetchDashboardData} />
                </div>
            </div>
        );
    }

    if (!data) return null;

    // IF PROFILE IS INCOMPLETE, SHOW ACTIVATION CENTER AS REDUCED DASHBOARD
    if (!data.profileComplete) {
        return (
            <div className="bg-[#050505] min-h-screen pt-12 pb-20 px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Persuasive Header */}
                    <div className="text-center space-y-4 mb-8">
                        <div className="inline-flex p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-4 animate-bounce">
                            <UserPlus size={40} className="text-primary" />
                        </div>
                        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                            Bienvenido a la <span className="text-primary truncate">Experiencia Premium</span>
                        </h1>
                        <p className="text-gray-500 text-base max-w-2xl mx-auto font-medium">
                            Antes de agendar tu primera cita, debemos sincronizar tu cuenta con el sistema legal del taller para garantizar tus cotizaciones y garantías.
                        </p>
                    </div>

                    <ProfileActivationCenter onComplete={fetchDashboardData} />
                </div>
            </div>
        );
    }

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
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-red-600 p-[2px]">
                                <img src={user?.avatarUrl || "https://i.pravatar.cc/100"} className="w-full h-full rounded-full object-cover border-2 border-[#0a0a0b]" alt="Profile" />
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
                    </div>
                    <div>Factoría La Caravana CRM v2.4.0</div>
                </div>
            </div>
        </div>
    );
};




export default UserDashboard;
