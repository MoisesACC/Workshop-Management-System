
import { useState } from 'react';
import {
    Calendar, ArrowDown, MapPin,
    Wrench, PaintBucket, Sparkles,
    Check, ArrowRight, MessageCircle
} from 'lucide-react';
import '../css/home.css'; // Might need to clear this file later or use it for specific non-tailwind needs

const Home = () => {
    const [sliderPos, setSliderPos] = useState(50);

    const handleSliderChange = (e) => {
        setSliderPos(e.target.value);
    };

    return (
        <div className="bg-background-dark font-display text-gray-100 antialiased overflow-x-hidden">

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Luxury car in dark garage"
                        className="w-full h-full object-cover object-center translate-y-[-10%]"
                        src="/src/assets/img/carousel-bg-4.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-background-dark/40"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-20">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm text-primary text-sm font-semibold tracking-wider uppercase mb-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Especialistas en Alta Gama
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight">
                            TU CARRO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">COMO NUEVO</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-light border-l-4 border-primary pl-6">
                            Diagnóstico premium, reparación experta y detailing profesional para vehículos que merecen lo mejor. La excelencia mecánica es nuestro estándar.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a href="#booking" className="inline-flex justify-center items-center py-4 px-8 text-base font-bold text-center text-white rounded-lg bg-primary hover:bg-primary-dark focus:ring-4 focus:ring-primary/30 transition-all shadow-[0_0_20px_rgba(216,3,39,0.4)]">
                                Agendar Cita <Calendar className="ml-2" size={20} />
                            </a>
                            <a href="#services" className="inline-flex justify-center items-center py-4 px-8 text-base font-medium text-center text-white rounded-lg border border-white/30 hover:bg-white/10 hover:border-white focus:ring-4 focus:ring-gray-700 transition-all backdrop-blur-sm">
                                Ver Servicios <ArrowDown className="ml-2" size={20} />
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="pt-12 grid grid-cols-3 gap-8 border-t border-white/10 max-w-lg mt-8">
                            <div>
                                <p className="text-3xl font-bold text-white">15+</p>
                                <p className="text-sm text-gray-400 uppercase tracking-wider">Años Experiencia</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">5k+</p>
                                <p className="text-sm text-gray-400 uppercase tracking-wider">Clientes Felices</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">100%</p>
                                <p className="text-sm text-gray-400 uppercase tracking-wider">Garantía</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BRAND MARQUEE --- */}
            <div className="w-full py-10 bg-surface-dark border-y border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-gray-500 text-sm tracking-[0.2em] mb-8 uppercase">Trabajamos con las mejores marcas</p>

                    {/* Static logos for now, could be marquee */}
                    <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" alt="BMW" className="h-10" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" alt="Mercedes" className="h-10" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Toyota_Gazoo_Racing_logo_2019.svg/1200px-Toyota_Gazoo_Racing_logo_2019.svg.png" alt="Toyota" className="h-8" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/600px-Volkswagen_logo_2019.svg.png" alt="VW" className="h-10" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kia-logo.png/1200px-Kia-logo.png" alt="Kia" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Ford_Motor_Company_Logo.svg/1024px-Ford_Motor_Company_Logo.svg.png" alt="Ford" className="h-10" />
                    </div>
                </div>
            </div>

            {/* --- SERVICES SECTION --- */}
            <section className="py-20 bg-background-dark relative" id="services">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest text-sm uppercase">Nuestros Servicios</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white">Soluciones Integrales</h2>
                        <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group relative p-8 bg-surface-dark rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(216,3,39,0.2)]">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <Wrench className="text-primary text-3xl group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Mecánica General</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">Diagnóstico computarizado, reparación de motores y transmisiones con tecnología de punta.</p>
                            <a href="#" className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors">
                                Leer más <ArrowRight className="ml-1" size={16} />
                            </a>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative p-8 bg-surface-dark rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(216,3,39,0.2)]">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <PaintBucket className="text-primary text-3xl group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Pintura y Carrocería</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">Restauración estética completa, igualación de color exacta y reparación de abolladuras.</p>
                            <a href="#" className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors">
                                Leer más <ArrowRight className="ml-1" size={16} />
                            </a>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative p-8 bg-surface-dark rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(216,3,39,0.2)]">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <Sparkles className="text-primary text-3xl group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Detailing Premium</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">Lavado profundo, pulido cerámico y protección de interiores para un acabado de exhibición.</p>
                            <a href="#" className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors">
                                Leer más <ArrowRight className="ml-1" size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BEFORE / AFTER --- */}
            <section className="py-20 bg-surface-dark overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-4xl font-bold text-white">Transformación Total</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                No solo reparamos, restauramos la gloria de tu vehículo. Desliza para ver la diferencia que hace nuestro servicio de detailing cerámico.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Check size={16} /></span>
                                    <span className="text-gray-300">Eliminación de arañazos profundos</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Check size={16} /></span>
                                    <span className="text-gray-300">Recuperación de brillo original</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Check size={16} /></span>
                                    <span className="text-gray-300">Protección hidrofóbica de 2 años</span>
                                </li>
                            </ul>
                            <a href="#booking" className="inline-block mt-4 text-white border-b-2 border-primary pb-1 hover:text-primary transition-colors">Agendar Servicio</a>
                        </div>

                        {/* Interactive Comparison Slider */}
                        <div className="lg:w-1/2 relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group select-none">
                            {/* After Image (Background) */}
                            <div className="absolute inset-0 w-full h-full">
                                <img src="/src/assets/img/carousel-2.png" className="w-full h-full object-cover" alt="After" />
                                <div className="absolute top-4 right-4 bg-primary/90 text-white text-[10px] font-bold px-3 py-1 rounded tracking-widest backdrop-blur-sm">DESPUÉS</div>
                            </div>

                            {/* Before Image (Clipped) */}
                            <div
                                className="absolute inset-0 h-full overflow-hidden border-r-2 border-white/80"
                                style={{ width: `${sliderPos}%` }}
                            >
                                <img
                                    src="/src/assets/img/carousel-1.png"
                                    className="absolute top-0 left-0 h-full object-cover"
                                    alt="Before"
                                    style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }}
                                />
                                <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-bold px-3 py-1 rounded tracking-widest backdrop-blur-sm">ANTES</div>
                            </div>

                            {/* Handle Circle */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center z-10 pointer-events-none"
                                style={{ left: `${sliderPos}%` }}
                            >
                                <div className="flex gap-1 text-primary">
                                    <ArrowRight size={14} className="rotate-180" />
                                    <ArrowRight size={14} />
                                </div>
                            </div>

                            {/* Hidden Input Slider (Overlay) */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={sliderPos}
                                onChange={handleSliderChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BOOKING SECTION --- */}
            <section className="py-24 relative bg-background-dark" id="booking">
                <div className="relative max-w-4xl mx-auto px-6">
                    <div className="bg-surface-dark/80 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Reserva tu Cita</h2>
                            <p className="text-gray-400">Selecciona el servicio que necesitas y nos pondremos en contacto contigo.</p>
                        </div>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="name">Nombre Completo</label>
                                    <input className="bg-background-dark border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-3 placeholder-gray-500" id="name" placeholder="Juan Pérez" type="text" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="phone">Teléfono</label>
                                    <input className="bg-background-dark border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-3 placeholder-gray-500" id="phone" placeholder="+51 900 123 456" type="tel" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="car-model">Marca y Modelo</label>
                                    <input className="bg-background-dark border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-3 placeholder-gray-500" id="car-model" placeholder="BMW Serie 3, 2022" type="text" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="service-type">Servicio</label>
                                    <select className="bg-background-dark border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-3" id="service-type">
                                        <option>Mantenimiento General</option>
                                        <option>Diagnóstico Motor</option>
                                        <option>Pintura y Carrocería</option>
                                        <option>Detailing / Lavado</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="message">Detalles Adicionales</label>
                                <textarea className="block p-3 w-full text-sm text-white bg-background-dark rounded-lg border border-gray-700 focus:ring-primary focus:border-primary placeholder-gray-500" id="message" placeholder="Describe brevemente el problema..." rows="4"></textarea>
                            </div>
                            <button className="w-full text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary/30 font-bold rounded-lg text-lg px-5 py-4 text-center transition-all shadow-lg shadow-primary/20" type="submit">
                                Confirmar Solicitud
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* WhatsApp Float */}
            <a href="https://wa.me/51959078603" className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-colors">
                <MessageCircle size={32} />
            </a>
        </div>
    );
};

export default Home;
