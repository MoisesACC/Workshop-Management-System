import { useState } from 'react';
import { X, Plus, Trash2, Save, Calculator } from 'lucide-react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const QuickQuoteModal = ({ isOpen, onClose, client, onQuoteCreated }) => {
    const [items, setItems] = useState([
        { description: '', price: '', quantity: 1, isPart: false }
    ]);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const addItem = () => {
        setItems([...items, { description: '', price: '', quantity: 1, isPart: false }]);
    };

    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const total = items.reduce((acc, item) => acc + (parseFloat(item.price || 0) * item.quantity), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const request = {
                clientId: client.id,
                vehicleId: client.vehicles?.[0]?.id || null, // Pick first vehicle if available
                notes,
                items: items.map(item => ({
                    ...item,
                    price: parseFloat(item.price)
                }))
            };
            await api.post('/work-orders/quote', request);
            onQuoteCreated();
            onClose();
        } catch (error) {
            console.error("Error creating quote:", error);
            alert("Error al crear la cotización");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-surface-dark border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-primary/10 to-transparent">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-xl text-primary">
                                <Calculator size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Nueva Cotización Rápida</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Cliente: {client.firstName} {client.lastName}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Items List */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Servicios y Repuestos</label>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="text-[10px] font-black text-primary hover:text-white flex items-center gap-1 uppercase tracking-widest transition-colors"
                                >
                                    <Plus size={14} /> Añadir Concepto
                                </button>
                            </div>

                            <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                {items.map((item, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={index}
                                        className="flex gap-3 items-start"
                                    >
                                        <div className="flex-1">
                                            <input
                                                required
                                                className="w-full bg-surface-darker border border-white/5 rounded-xl py-2 px-4 text-sm text-white placeholder-gray-600 focus:ring-1 focus:ring-primary outline-none"
                                                placeholder="Descripción del servicio o parte..."
                                                value={item.description}
                                                onChange={(e) => updateItem(index, 'description', e.target.value)}
                                            />
                                        </div>
                                        <div className="w-24">
                                            <input
                                                required
                                                type="number"
                                                step="0.01"
                                                className="w-full bg-surface-darker border border-white/5 rounded-xl py-2 px-4 text-sm text-white placeholder-gray-600 focus:ring-1 focus:ring-primary outline-none"
                                                placeholder="Precio"
                                                value={item.price}
                                                onChange={(e) => updateItem(index, 'price', e.target.value)}
                                            />
                                        </div>
                                        <div className="w-16">
                                            <input
                                                required
                                                type="number"
                                                className="w-full bg-surface-darker border border-white/5 rounded-xl py-2 px-4 text-sm text-white placeholder-gray-600 focus:ring-1 focus:ring-primary outline-none"
                                                placeholder="Cant"
                                                value={item.quantity}
                                                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            className="p-2.5 text-gray-600 hover:text-primary transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Observaciones Internas</label>
                            <textarea
                                className="w-full bg-surface-darker border border-white/5 rounded-2xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:ring-1 focus:ring-primary outline-none min-h-[80px]"
                                placeholder="Notas sobre esta cotización..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

                        {/* Footer / Total */}
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Estimado</p>
                                <p className="text-3xl font-black text-white italic tracking-tighter">${total.toFixed(2)}</p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Generando...' : 'Generar y Enviar'} <Save size={16} />
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickQuoteModal;
