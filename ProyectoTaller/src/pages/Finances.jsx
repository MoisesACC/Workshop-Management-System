
import { useState, useEffect } from 'react';
import {
    TrendingUp, ArrowUpRight, ArrowDownRight,
    DollarSign, Calendar, Download, Filter, FileText
} from 'lucide-react';
import api from '../services/api';

const Finances = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFinances = async () => {
            try {
                const res = await api.get('/dashboard/stats');
                setStats(res.data);
            } catch (error) {
                console.error("Error fetching finance stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFinances();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Resumen Financiero</h2>
                    <p className="text-gray-400 text-sm mt-1">Monitorea tus ingresos, egresos y rentabilidad del taller.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-white bg-surface-dark border border-white/5 rounded-lg transition-colors">
                        <Calendar size={20} />
                    </button>
                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold border border-white/10 transition-all">
                        <Download size={18} /> <span>Exportar reporte</span>
                    </button>
                </div>
            </div>

            {/* Income Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Ingresos Totales", value: `$${stats?.totalRevenue?.toLocaleString() || '0.00'}`, icon: <DollarSign />, trend: "+12.5%", positive: true },
                    { label: "Pendiente de Cobro", value: "$0.00", icon: <FileText />, trend: "-2.1%", positive: false },
                    { label: "Margen Neto", value: "68.4%", icon: <TrendingUp />, trend: "+4.2%", positive: true },
                ].map((card, i) => (
                    <div key={i} className="bg-surface-dark p-6 rounded-xl border border-white/5 relative overflow-hidden group shadow-sm">
                        <div className="absolute top-0 right-0 p-6 opacity-5 text-white group-hover:scale-110 transition-transform">
                            {card.icon}
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-xl text-primary">
                                {card.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded ${card.positive ? 'text-emerald-500 bg-emerald-500/10' : 'text-primary bg-primary/10'}`}>
                                {card.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {card.trend}
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-400">{card.label}</h3>
                        <p className="text-3xl font-bold text-white mt-1">{loading ? '...' : card.value}</p>
                    </div>
                ))}
            </div>

            {/* Transaction Table Mockup (Placeholder for real data) */}
            <div className="bg-surface-dark rounded-xl border border-white/5 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Transacciones Recientes</h3>
                    <button className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                        <Filter size={14} /> Filtrar
                    </button>
                </div>
                <div className="p-20 text-center">
                    <DollarSign className="mx-auto text-gray-600 mb-4 opacity-20" size={64} />
                    <h4 className="text-white font-bold opacity-60">No hay movimientos registrados</h4>
                    <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">Las transacciones aparecerán aquí una vez que completes órdenes y generes facturas.</p>
                </div>
            </div>
        </div>
    );
};

export default Finances;
