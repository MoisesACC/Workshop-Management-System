
import {
    Check, Search, Filter, ArrowLeft, CheckCircle,
    User, Car, ChevronRight, X, Receipt
} from 'lucide-react';
import { useState } from 'react';

const NewOrder = () => {
    const [step, setStep] = useState(4);

    const catalog = [
        { id: "SVC-001", type: "Servicio", name: "Cambio de Aceite Sintético", desc: "Incluye hasta 5 cuartos de aceite, filtro nuevo e inspección de 20 puntos.", price: 180.00 },
        { id: "BRK-pads-F", type: "Parte", name: "Pastillas de Freno Cerámicas (Delanteras)", desc: "Pastillas cerámicas de alto rendimiento. Bajo polvo y ruido.", price: 240.00, added: true },
        { id: "SVC-004", type: "Servicio", name: "Purga de Sistema de Frenos", desc: "Intercambio completo de fluido y purga del sistema.", price: 120.00 },
        { id: "FLT-air-09", type: "Parte", name: "Filtro de Aire de Motor", desc: "Repuesto OEM para mejorar el flujo de aire.", price: 45.00 },
        { id: "LBR-Gen", type: "Labor", name: "Mano de Obra General (Hora)", desc: "Tiempo adicional para diagnósticos personalizados.", price: 80.00 },
    ];

    const cart = [
        { name: "Pastillas de Freno (Delantera)", price: 240.00, type: "Parte", qty: 1 },
        { name: "Tarifa de Diagnóstico", price: 50.00, type: "Servicio", qty: 1 }
    ];

    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden -m-8"> {/* Adjusted to fit within AdminLayout content area or standalone */}
            {/* Main Content Area */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left Panel: Wizard Workflow */}
                <div className="flex-1 flex flex-col relative z-10">
                    {/* Wizard Stepper */}
                    <div className="px-8 py-6 bg-surface-darker/50 backdrop-blur-sm border-b border-white/5">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex justify-between items-center relative">
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -z-10 transform -translate-y-1/2 rounded"></div>
                                <div className="absolute top-1/2 left-0 w-3/4 h-0.5 bg-primary -z-10 transform -translate-y-1/2 rounded shadow-[0_0_10px_rgba(216,3,39,0.5)]"></div>

                                {[
                                    { label: "Cliente", done: true },
                                    { label: "Vehículo", done: true },
                                    { label: "Detalles", done: true },
                                    { label: "Servicios", active: true }
                                ].map((s, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 relative z-10 group cursor-pointer">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg transition-transform ${s.done ? 'bg-primary text-white shadow-primary/40' : s.active ? 'bg-surface-dark border-2 border-primary text-primary' : 'bg-gray-800 text-gray-500'}`}>
                                            {s.done ? <Check size={18} /> : (i + 1)}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${s.active ? 'text-primary' : 'text-gray-400'}`}>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Step Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gradient-to-b from-background-dark to-surface-darker custom-scrollbar">
                        <div className="max-w-5xl mx-auto space-y-8">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-white mb-2">Seleccionar Servicios y Partes</h2>
                                    <p className="text-gray-400">Busca en el catálogo para añadir items a la orden actual.</p>
                                </div>
                                <button className="px-4 py-2 rounded-lg bg-surface-dark border border-gray-700 hover:border-primary/50 text-gray-300 text-sm font-medium transition-colors flex items-center gap-2">
                                    <Filter size={16} /> Filtrar
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    className="w-full pl-12 pr-4 py-4 bg-surface-dark border border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500 transition-all shadow-lg"
                                    placeholder="Buscar servicio (ej. Cambio de Aceite) o número de parte..."
                                    type="text"
                                />
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                    <span className="text-[10px] text-gray-500 bg-black/20 px-2 py-1 rounded border border-gray-700">CTRL + K</span>
                                </div>
                            </div>

                            {/* Results Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {catalog.map((item, i) => (
                                    <div key={i} className={`bg-surface-dark border rounded-xl p-4 transition-all cursor-pointer group hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col justify-between h-full relative overflow-hidden ${item.added ? 'border-primary' : 'border-gray-800 hover:border-primary/50'}`}>
                                        {item.added && (
                                            <div className="absolute inset-0 bg-primary/5 z-0 pointer-events-none"></div>
                                        )}
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border ${item.type === 'Servicio' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                                                    {item.type}
                                                </div>
                                                <span className="text-gray-500 text-[10px]">ID: {item.id}</span>
                                            </div>
                                            <h3 className={`text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors ${item.added ? 'text-primary' : ''}`}>{item.name}</h3>
                                            <p className="text-gray-400 text-xs leading-relaxed mb-4">{item.desc}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-800 relative z-10">
                                            <span className="text-xl font-bold text-white">S/. {item.price.toFixed(2)}</span>
                                            <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${item.added ? 'bg-surface-darker border border-primary text-primary' : 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-red-600 active:scale-95'}`}>
                                                {item.added ? <X size={18} /> : <Plus size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Action Bar */}
                    <div className="h-20 bg-surface-dark border-t border-gray-800 px-8 flex items-center justify-between shrink-0">
                        <button className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 text-gray-300 font-bold transition-all flex items-center gap-2">
                            <ArrowLeft size={16} /> Atrás
                        </button>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-500 text-xs hidden md:inline">Paso 4 de 4</span>
                            <button className="px-8 py-3 rounded-lg bg-primary hover:bg-red-600 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                                Crear Orden de Trabajo <CheckCircle size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Summary */}
                <aside className="w-80 bg-surface-dark border-l border-gray-800 shadow-2xl flex flex-col shrink-0 relative z-20">
                    <div className="p-6 border-b border-gray-800 bg-surface-darker/50">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Receipt className="text-primary" size={20} /> Resumen
                        </h3>
                        <p className="text-[10px] text-gray-500 mt-1">Orden #WO-2023-8921 • <span className="text-primary font-medium">Borrador</span></p>
                    </div>

                    <div className="p-4 space-y-3 bg-surface-darker/30">
                        <div className="bg-surface-dark border border-gray-700 rounded-lg p-3 flex items-start gap-3">
                            <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center shrink-0">
                                <User className="text-gray-500" size={16} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[8px] text-primary font-bold uppercase mb-0.5">Cliente</p>
                                <p className="text-xs font-bold text-white truncate">Roberto Sanchez</p>
                            </div>
                        </div>
                        <div className="bg-surface-dark border border-gray-700 rounded-lg p-3 flex items-start gap-3">
                            <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center shrink-0">
                                <Car className="text-gray-500" size={16} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[8px] text-primary font-bold uppercase mb-0.5">Vehículo</p>
                                <p className="text-xs font-bold text-white truncate">Toyota Corolla 2018</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                        {cart.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 group">
                                <div className="flex items-start gap-2">
                                    <button className="text-gray-600 hover:text-primary transition-colors mt-0.5 opacity-0 group-hover:opacity-100">
                                        <X size={14} />
                                    </button>
                                    <div>
                                        <p className="text-xs text-gray-200 font-medium">{item.name}</p>
                                        <p className="text-[10px] text-gray-500">{item.type} • Cant: {item.qty}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-white">S/. {item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 bg-surface-darker border-t border-gray-800 space-y-3">
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Subtotal</span>
                            <span>S/. {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>IGV (18%)</span>
                            <span>S/. {tax.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-gray-800 my-2"></div>
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Est.</span>
                            <span className="text-2xl font-extrabold text-primary leading-none">S/. {total.toFixed(2)}</span>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default NewOrder;
