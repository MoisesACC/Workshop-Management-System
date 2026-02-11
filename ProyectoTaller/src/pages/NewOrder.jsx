
import {
    Check, Search, Filter, ArrowLeft, CheckCircle,
    User, Car, ChevronRight, X, Receipt, Plus, Wrench, Package, Info, Calendar, Clock, Minus
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const NewOrder = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Data States
    const [clients, setClients] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [services, setServices] = useState([]);
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Selection States
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [notes, setNotes] = useState('');
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isQuote, setIsQuote] = useState(false);

    useEffect(() => {
        fetchInitialData();
        const cid = searchParams.get('clientId');
        if (cid) {
            handleClientSelectById(parseInt(cid));
        }
    }, [searchParams]);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [clientsRes, servicesRes, partsRes] = await Promise.all([
                api.get('/clients'),
                api.get('/catalog'),
                api.get('/parts')
            ]);
            setClients(clientsRes.data);
            setServices(servicesRes.data);
            setParts(partsRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClientSelectById = async (id) => {
        try {
            const res = await api.get('/clients');
            const client = res.data.find(c => c.id === id);
            if (client) {
                setSelectedClient(client);
                fetchVehicles(id);
                setStep(2);
            }
        } catch (error) {
            console.error("Error selecting client:", error);
        }
    };

    const fetchVehicles = async (clientId) => {
        try {
            const res = await api.get(`/vehicles/client/${clientId}`);
            setVehicles(res.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const addToCart = (item, type) => {
        const existing = cart.find(i => i.id === item.id && i.type === type);
        if (existing) {
            setCart(cart.map(i => (i.id === item.id && i.type === type) ? { ...i, qty: i.qty + 1 } : i));
        } else {
            setCart([...cart, {
                id: item.id,
                name: item.name,
                price: type === 'Servicio' ? item.basePrice : item.unitPrice,
                type,
                qty: 1
            }]);
        }
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const handleSubmit = async () => {
        if (!selectedClient || !selectedVehicle) {
            alert("Favor selecciona cliente y vehículo");
            return;
        }

        setLoading(true);
        try {
            const request = {
                clientId: selectedClient.id,
                vehicleId: selectedVehicle.id,
                notes: notes,
                status: isQuote ? 'QUOTE' : 'PENDING',
                items: cart.map(item => ({
                    description: item.name,
                    price: item.price,
                    quantity: item.qty,
                    isPart: item.type === 'Parte',
                    id: item.id
                }))
            };

            await api.post('/work-orders/quote', request);
            alert(isQuote ? "Cotización generada" : "Orden de trabajo creada");
            navigate('/admin/orders');
        } catch (error) {
            console.error("Error generating order:", error);
            alert("Error al generar la orden");
        } finally {
            setLoading(false);
        }
    };

    const filteredCatalog = [
        ...services.map(s => ({ ...s, type: 'Servicio' })),
        ...parts.map(p => ({ ...p, type: 'Parte' }))
    ].filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const clientSearchFilter = clients.filter(c =>
        (c.firstName + ' ' + c.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.documentId.includes(searchTerm)
    );

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden -m-8">
            <main className="flex-1 flex overflow-hidden">
                {/* Left Panel: Wizard Content */}
                <div className="flex-1 flex flex-col relative z-10 bg-background-dark/50">
                    {/* Stepper Header */}
                    <div className="px-8 py-6 bg-surface-darker/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex justify-between items-center relative">
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -z-10 transform -translate-y-1/2 rounded"></div>
                                <div
                                    className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 transform -translate-y-1/2 rounded transition-all duration-500 shadow-[0_0_15px_rgba(216,3,39,0.5)]"
                                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                                ></div>

                                {[
                                    { label: "Cliente", icon: <User size={16} /> },
                                    { label: "Vehículo", icon: <Car size={16} /> },
                                    { label: "Detalles", icon: <Info size={16} /> },
                                    { label: "Servicios", icon: <Wrench size={16} /> }
                                ].map((s, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center gap-2 relative z-10"
                                        onClick={() => step > (i + 1) && setStep(i + 1)}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-2xl transition-all duration-300 ${step > (i + 1) ? 'bg-primary text-white scale-90' : step === (i + 1) ? 'bg-surface-dark border-2 border-primary text-primary scale-110' : 'bg-surface-darker text-gray-500 border border-white/5'}`}>
                                            {step > (i + 1) ? <Check size={20} /> : s.icon}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${step === (i + 1) ? 'text-primary' : 'text-gray-500'}`}>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar overflow-x-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-5xl mx-auto space-y-8"
                            >
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Seleccionar Cliente</h2>
                                            <p className="text-gray-400 font-medium">Busca o selecciona el cliente para esta orden.</p>
                                        </div>
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                                            <input
                                                className="w-full bg-surface-dark border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-primary outline-none transition-all"
                                                placeholder="Buscar por nombre o DNI..."
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {clientSearchFilter.map(c => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => {
                                                        setSelectedClient(c);
                                                        fetchVehicles(c.id);
                                                        setStep(2);
                                                        setSearchTerm('');
                                                    }}
                                                    className="flex items-center gap-4 p-4 bg-surface-dark border border-white/5 rounded-2xl hover:border-primary/50 text-left transition-all hover:translate-x-2 group"
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                                                        {c.firstName[0]}{c.lastName[0]}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-white font-bold group-hover:text-primary transition-colors">{c.firstName} {c.lastName}</h4>
                                                        <p className="text-xs text-gray-500 uppercase tracking-widest">{c.documentId}</p>
                                                    </div>
                                                    <ChevronRight className="text-gray-700 group-hover:text-primary" size={20} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Seleccionar Vehículo</h2>
                                                <p className="text-gray-400 font-medium">Vehículos registrados de {selectedClient?.firstName}.</p>
                                            </div>
                                            <button className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                                Registrar Nuevo
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {vehicles.length > 0 ? vehicles.map(v => (
                                                <button
                                                    key={v.id}
                                                    onClick={() => {
                                                        setSelectedVehicle(v);
                                                        setStep(3);
                                                    }}
                                                    className="p-6 bg-surface-dark border border-white/5 rounded-3xl hover:border-primary/50 text-left transition-all group overflow-hidden relative"
                                                >
                                                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                        <Car size={120} />
                                                    </div>
                                                    <div className="relative z-10">
                                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{v.licensePlate}</p>
                                                        <h3 className="text-2xl font-black text-white italic mb-1 uppercase tracking-tighter">{v.brand} {v.model}</h3>
                                                        <div className="flex items-center gap-4 mt-4">
                                                            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                                                <Calendar size={14} /> <span>{v.year}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                                                <Clock size={14} /> <span>{v.mileage} km</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            )) : (
                                                <div className="col-span-full py-12 text-center bg-surface-dark border border-dashed border-white/10 rounded-3xl">
                                                    <Car className="mx-auto text-gray-700 mb-4" size={48} />
                                                    <p className="text-gray-500 font-bold uppercase tracking-widest">No hay vehículos registrados</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Detalles Generales</h2>
                                            <p className="text-gray-400 font-medium">Información adicional sobre el ingreso del vehículo.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Observaciones / Motivo de Ingreso</label>
                                            <textarea
                                                className="w-full bg-surface-dark border border-white/10 rounded-3xl py-6 px-8 text-white placeholder-gray-600 focus:ring-2 focus:ring-primary outline-none transition-all min-h-[250px] resize-none"
                                                placeholder="Describe lo que el cliente reporta..."
                                                value={notes}
                                                onChange={e => setNotes(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setStep(4)}
                                                className="flex-1 bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:bg-red-700 transition-all hover:-translate-y-1"
                                            >
                                                Continuar a Servicios
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-8">
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                            <div>
                                                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Servicios y Repuestos</h2>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <button
                                                        onClick={() => setIsQuote(false)}
                                                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${!isQuote ? 'bg-primary text-white' : 'bg-surface-dark text-gray-500 border border-white/5'}`}
                                                    >
                                                        Orden de Trabajo
                                                    </button>
                                                    <button
                                                        onClick={() => setIsQuote(true)}
                                                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isQuote ? 'bg-blue-600 text-white' : 'bg-surface-dark text-gray-500 border border-white/5'}`}
                                                    >
                                                        Solo Cotización
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="relative group min-w-[300px]">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                    <input
                                                        className="w-full bg-surface-dark border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white"
                                                        placeholder="Buscar en catálogo..."
                                                        value={searchTerm}
                                                        onChange={e => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                                <button className="p-2 bg-surface-dark border border-white/10 rounded-xl text-gray-500 hover:text-white">
                                                    <Filter size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {/* Custom Item Card */}
                                            <div
                                                onClick={() => {
                                                    const desc = prompt("Descripción del concepto:");
                                                    const price = prompt("Precio estimado:");
                                                    if (desc && price) {
                                                        addToCart({ id: Date.now(), name: desc, basePrice: parseFloat(price) }, 'Servicio');
                                                    }
                                                }}
                                                className="bg-surface-dark border border-dashed border-white/10 rounded-3xl p-6 transition-all cursor-pointer group hover:border-primary/50 flex flex-col items-center justify-center text-center gap-4 hover:bg-white/5"
                                            >
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors">
                                                    <Plus size={24} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Concepto Ádoc</h3>
                                                    <p className="text-[10px] text-gray-500 font-medium">Añadir servicio o parte personalizada</p>
                                                </div>
                                            </div>

                                            {filteredCatalog.map((item, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => addToCart(item, item.type)}
                                                    className="bg-surface-dark border border-white/5 rounded-3xl p-6 transition-all cursor-pointer group hover:border-primary/50 relative overflow-hidden"
                                                >
                                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                                        <div className={`p-2 rounded-xl ${item.type === 'Servicio' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>
                                                            {item.type === 'Servicio' ? <Wrench size={18} /> : <Package size={18} />}
                                                        </div>
                                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest font-mono">#{item.id}</span>
                                                    </div>
                                                    <h3 className="text-lg font-black text-white italic uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                                                    <p className="text-[11px] text-gray-500 line-clamp-2 mb-6 font-medium leading-relaxed">{item.description}</p>

                                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 relative z-10">
                                                        <span className="text-xl font-black text-white italic">${(item.basePrice || item.unitPrice || 0).toFixed(2)}</span>
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                            <Plus size={16} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer Nav */}
                    <div className="h-24 bg-surface-darker border-t border-white/5 px-8 flex items-center justify-between shrink-0 sticky bottom-0 z-30">
                        <button
                            onClick={() => step > 1 && setStep(step - 1)}
                            disabled={step === 1}
                            className="px-8 py-3 rounded-xl border border-white/10 text-gray-500 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white/5 disabled:opacity-30 transition-all"
                        >
                            <ArrowLeft size={16} /> Atrás
                        </button>

                        <div className="flex items-center gap-6">
                            <div className="hidden lg:flex flex-col items-end">
                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Paso Actual</span>
                                <span className="text-white font-black italic tracking-tighter">0{step} / 04</span>
                            </div>

                            {step === 4 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || cart.length === 0}
                                    className="bg-primary hover:bg-red-700 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 flex items-center gap-3 transition-all hover:-translate-y-1 disabled:opacity-50"
                                >
                                    {loading ? 'Procesando...' : 'Finalizar Registro'} <CheckCircle size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        if (step === 1 && !selectedClient) return alert("Selecciona un cliente");
                                        if (step === 2 && !selectedVehicle) return alert("Selecciona un vehículo");
                                        setStep(step + 1);
                                    }}
                                    className="bg-white text-black hover:bg-gray-200 px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all hover:-translate-y-1"
                                >
                                    Siguiente Paso <ChevronRight size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Premium Summary */}
                <aside className="w-96 bg-surface-dark border-l border-white/5 shadow-2xl flex flex-col shrink-0 relative z-20">
                    <div className="p-8 border-b border-white/5 bg-gradient-to-br from-primary/5 to-transparent">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                <Receipt size={20} />
                            </div>
                            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Resumen de Orden</h3>
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Ticket #{Math.random().toString(36).substring(7).toUpperCase()} • <span className="text-primary">Draft Mode</span></p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                        {/* Selected Entities */}
                        <div className="space-y-3">
                            {selectedClient ? (
                                <div className="bg-surface-darker/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <User size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cliente</p>
                                        <p className="text-sm font-bold text-white truncate">{selectedClient.firstName} {selectedClient.lastName}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 rounded-2xl border border-dashed border-white/5 text-center text-[10px] font-black text-gray-600 uppercase tracking-widest bg-black/10">
                                    Cliente no seleccionado
                                </div>
                            )}

                            {selectedVehicle ? (
                                <div className="bg-surface-darker/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500">
                                        <div className="flex items-center justify-center w-full h-full"><Car size={18} /></div>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Vehículo</p>
                                        <p className="text-sm font-bold text-white truncate">{selectedVehicle.brand} {selectedVehicle.model}</p>
                                        <p className="text-[10px] text-primary font-black uppercase font-mono">{selectedVehicle.licensePlate}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 rounded-2xl border border-dashed border-white/5 text-center text-[10px] font-black text-gray-600 uppercase tracking-widest bg-black/10">
                                    Vehículo no seleccionado
                                </div>
                            )}
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Conceptos Añadidos</label>
                            {cart.length > 0 ? (
                                <div className="space-y-2">
                                    {cart.map((item, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={i}
                                            className="flex justify-between items-start py-3 group border-b border-white/5 last:border-0"
                                        >
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => removeFromCart(i)}
                                                    className="p-1.5 text-gray-700 hover:text-primary transition-all opacity-0 group-hover:opacity-100 bg-white/5 rounded-lg"
                                                >
                                                    <X size={12} />
                                                </button>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-gray-200 truncate">{item.name}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{item.type}</span>
                                                        <div className="flex items-center gap-2 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                                                            <button
                                                                onClick={() => {
                                                                    if (item.qty > 1) {
                                                                        const newCart = [...cart];
                                                                        newCart[i].qty -= 1;
                                                                        setCart(newCart);
                                                                    } else {
                                                                        removeFromCart(i);
                                                                    }
                                                                }}
                                                                className="text-gray-600 hover:text-primary transition-colors"
                                                            >
                                                                <Minus size={10} />
                                                            </button>
                                                            <span className="text-[10px] font-bold text-primary">{item.qty}</span>
                                                            <button
                                                                onClick={() => {
                                                                    const newCart = [...cart];
                                                                    newCart[i].qty += 1;
                                                                    setCart(newCart);
                                                                }}
                                                                className="text-gray-600 hover:text-white transition-colors"
                                                            >
                                                                <Plus size={10} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-sm font-black text-white italic">${(item.price * item.qty).toFixed(2)}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-700">
                                        <Receipt size={24} />
                                    </div>
                                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">El carrito está vacío</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="p-8 bg-surface-darker border-t border-white/5 space-y-4">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 font-bold uppercase tracking-widest">Subtotal</span>
                            <span className="text-white font-black">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 font-bold uppercase tracking-widest">Impuestos (18%)</span>
                            <span className="text-white font-black">${tax.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-white/5 my-2"></div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Total Final</p>
                                <p className="text-4xl font-black text-white italic leading-none tracking-tighter">${total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default NewOrder;
