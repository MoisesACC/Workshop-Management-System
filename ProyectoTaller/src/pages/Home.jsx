
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Calendar, ArrowDown, MapPin,
    Wrench, PaintBucket, Sparkles,
    Check, ArrowRight, MessageCircle, Clock,
    ShieldCheck, Award, Zap, ClipboardList, Hammer,
    Facebook, Instagram, Twitter, Star, Quote
} from 'lucide-react';
import '../css/home.css'; // Might need to clear this file later or use it for specific non-tailwind needs

const brands = [
    { name: 'Chery', logo: 'https://insideautosperu.com/wp-content/uploads/2020/12/Chery-logo.jpg' },
    { name: 'Audi', logo: 'https://www.shutterstock.com/image-vector/audi-logo-icon-metal-circle-600nw-2269704655.jpg' },
    { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1024px-BMW.svg.png' },
    { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Toyota_logo_%28Red%29.svg/960px-Toyota_logo_%28Red%29.svg.png' },
    { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/1024px-Hyundai_Motor_Company_logo.svg.png' },
    { name: 'Chevrolet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/1024px-Chevrolet-logo.png' },
    { name: 'Suzuki', logo: 'https://static.vecteezy.com/system/resources/thumbnails/014/414/680/small/suzuki-logo-on-transparent-background-free-vector.jpg' },
    { name: 'Mazda', logo: 'https://cdn.worldvectorlogo.com/logos/mazda-2.svg' },
    { name: 'Mitsubishi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/1024px-Mitsubishi_logo.svg.png' },
    { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/1024px-Honda_Logo.svg.png' }
];

const luxuryBrands = [
    { name: 'Mercedes-Benz', logo: 'https://images.seeklogo.com/logo-png/33/1/mercedes-benz-logo-png_seeklogo-332844.png' },
    { name: 'Kia', logo: 'https://i.pinimg.com/736x/29/a0/e6/29a0e6d7e71f8ad6fcf30e36ad038e6e.jpg' },
    { name: 'Peugeot', logo: 'https://static.vecteezy.com/system/resources/previews/020/500/602/non_2x/peugeot-brand-logo-symbol-with-name-black-design-french-car-automobile-illustration-free-vector.jpg' },
    { name: 'Volvo', logo: 'https://brandemia.org/contenido/subidas/2014/03/logo_volvo-rincipal.jpg' },
    { name: 'Lexus', logo: 'https://i.pinimg.com/736x/23/10/46/2310462e9af663d3a207ecba7d63e233.jpg' },
    { name: 'JAC', logo: 'https://www.jac.pe/media/evhlcfn0/jac-logo-2024-opt.webp' },
    { name: 'Subaru', logo: 'https://thumbs.dreamstime.com/b/logo-subaru-124401322.jpg' },
    { name: 'Jeep', logo: 'https://static.vecteezy.com/system/resources/thumbnails/020/500/247/small/jeep-brand-logo-car-symbol-black-design-usa-automobile-illustration-free-vector.jpg' }
];

const testimonials = [
    {
        name: "Edgar Cruz",
        handle: "@edgarcruz",
        text: "¡Increíble trabajo! La precisión en el planchado de Factoría La Caravana es impresionante. Mi vehículo quedó impecable, sin arrugas ni marcas. Definitivamente, mi primera opción para futuros detalles.",
        source: "facebook",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Dj Zenkoo",
        handle: "@djzenkoo",
        text: "Factoría La Caravana hizo un trabajo excepcional con el planchado y la pintura de mi coche. La atención al detalle y la dedicación al trabajo son notables. ¡Mi vehículo parece nuevo! No dudaría en volver.",
        source: "instagram",
        img: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
        name: "Alex Palomino",
        handle: "@alexpalomino",
        text: "Se nota que tienen experiencia y saben lo que hacen. Sin duda, volveré para más detalles. Excelente acabado en pintura al horno.",
        source: "twitter",
        img: "https://randomuser.me/api/portraits/men/86.jpg"
    }
];

const productBrands = [
    { name: 'Werku', logo: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/4d95a22e-916a-4719-b326-2e3808bdfa97.__CR0,0,970,300_PT0_SX970_V1___.jpg' },
    { name: 'Sherwin Williams', logo: 'https://www.thelokengroup.com/site/wp-content/uploads/2019/07/Sherwin-Williams-Logos-Vector-Free-Download.jpg' },
    { name: 'Glasurit', logo: 'https://knowhow.glasurit.com/themes/custom/glasurit/logo.svg' },
    { name: 'Norton', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmnUGlzsZX-VN4d9DKPEUjt2LylYH9uU80TA&s' },
    { name: 'Sika', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1EOqJPJD6scFEnogyrPVbCKoU9P0JysUJqw&s' },
    { name: '3M', logo: 'https://static.vecteezy.com/system/resources/previews/014/414/669/non_2x/3m-logo-on-transparent-background-free-vector.jpg' },
    { name: 'Anypsa', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0je368vDyTFjDozDIijmHGVgtBaNaDZ9OFQ&s' }
];

const productBrands2 = [
    { name: 'Makita', logo: 'https://1000marcas.net/wp-content/uploads/2020/02/Makita-Logo-1.png' },
    { name: 'Roberlo', logo: 'https://www.roberlo.com/wp-content/uploads/logo-roberlo-1.svg' },
    { name: 'Liqui Moly', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Liqui-moly.svg' },
    { name: 'Castrol', logo: 'https://static.vecteezy.com/system/resources/previews/014/414/709/non_2x/castrol-logo-on-transparent-background-free-vector.jpg' },
    { name: 'Mobil', logo: 'https://thumbs.dreamstime.com/b/logo-mobil-127603560.jpg' },
    { name: 'Sikkens', logo: 'https://scontent.flim30-1.fna.fbcdn.net/v/t39.30808-6/302240885_363636279316340_8547595804044342023_n.png?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=RVHS3zIf6mIQ7kNvwG-q1lw&_nc_oc=AdnxSUQ-f1Sf4R2edQLR4ctspp2RDGBGLRrqgS8wfEiLAwf_r4PZd7TKyi_LQis0ONFjbFh1Bsu31LAzvYpWg_Sc&_nc_zt=23&_nc_ht=scontent.flim30-1.fna&_nc_gid=TwSStfrYbfbF2tRyPzGtEw&oh=00_AfvFekfJuVMyU0w8EyoSnx_fCVRMelXg24bMCblTedHq5Q&oe=69969496' },
    { name: 'Danny Color\'s', logo: 'https://dannycolors.com/wp-content/uploads/2024/09/Logo-danny-color%C2%B4s-1400x340.png' }
];

const Home = () => {
    const [sliderPos, setSliderPos] = useState(50);
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    const [activeHeroImg, setActiveHeroImg] = useState(0);
    const heroImages = ["/assets/img/slider.webp", "/assets/img/slider2.webp"];

    const handleSliderChange = (e) => {
        setSliderPos(e.target.value);
    };

    useEffect(() => {
        // Countdown Logic
        let targetDate = localStorage.getItem('countdown_target');
        if (!targetDate) {
            targetDate = Date.now() + 10 * 24 * 60 * 60 * 1000;
            localStorage.setItem('countdown_target', targetDate);
        }

        const tick = () => {
            const now = Date.now();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({
                    days: days.toString().padStart(2, '0'),
                    hours: hours.toString().padStart(2, '0'),
                    minutes: minutes.toString().padStart(2, '0'),
                    seconds: seconds.toString().padStart(2, '0')
                });
            }
        };

        const timer = setInterval(tick, 1000);
        const heroTimer = setInterval(() => {
            setActiveHeroImg((prev) => (prev + 1) % heroImages.length);
        }, 4000);

        return () => {
            clearInterval(timer);
            clearInterval(heroTimer);
        };
    }, [heroImages.length]);

    return (
        <div className="bg-background-dark font-display text-gray-100 antialiased overflow-x-hidden">

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-20 lg:py-0">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Luxury car in dark garage"
                        className="w-full h-full object-cover object-center translate-y-[-10%]"
                        src="/assets/img/carousel-bg-4.webp"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-background-dark/40"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-20 lg:pt-20">
                    {/* Left Column Text (Restored Design) */}
                    <div className="lg:col-span-6 space-y-6 w-full max-w-full overflow-hidden">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm text-primary text-[10px] md:text-sm font-semibold tracking-wider uppercase mb-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Especialistas en Alta Gama
                        </div>
                        <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight whitespace-normal break-words">
                            TU CARRO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600 block sm:inline">¡COMO NUEVO!</span>
                        </h1>
                        <p className="text-gray-300 text-base md:text-xl max-w-2xl font-light border-l-4 border-primary pl-4 md:pl-6 leading-relaxed">
                            Diagnóstico premium, reparación experta y detailing profesional para vehículos que merecen lo mejor. La excelencia mecánica es nuestro estándar.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a href="#booking" className="inline-flex justify-center items-center py-4 px-8 text-sm md:text-base font-bold text-center text-white rounded-lg bg-primary hover:bg-primary-dark focus:ring-4 focus:ring-primary/30 transition-all shadow-[0_0_20px_rgba(216,3,39,0.4)] active:scale-95">
                                Agendar Cita <Calendar className="ml-2" size={20} />
                            </a>
                            <NavLink to="/servicios" className="inline-flex justify-center items-center py-4 px-8 text-sm md:text-base font-medium text-center text-white rounded-lg border border-white/30 hover:bg-white/10 hover:border-white focus:ring-4 focus:ring-gray-700 transition-all backdrop-blur-sm active:scale-95">
                                Ver Servicios <ArrowRight className="ml-2" size={20} />
                            </NavLink>
                        </div>

                        {/* Stats */}
                        <div className="pt-8 md:pt-12 grid grid-cols-3 gap-2 md:gap-8 border-t border-white/10 max-w-lg mt-8">
                            <div className="text-left">
                                <p className="text-xl xs:text-2xl md:text-3xl font-bold text-white leading-none">15+</p>
                                <p className="text-[8px] md:text-sm text-gray-400 uppercase tracking-tighter sm:tracking-widest mt-2">Años Exp.</p>
                            </div>
                            <div className="text-left border-x border-white/5 px-2 md:px-0">
                                <p className="text-xl xs:text-2xl md:text-3xl font-bold text-white leading-none">5k+</p>
                                <p className="text-[8px] md:text-sm text-gray-400 uppercase tracking-tighter sm:tracking-widest mt-2">Clientes</p>
                            </div>
                            <div className="text-left">
                                <p className="text-xl xs:text-2xl md:text-3xl font-bold text-white leading-none">100%</p>
                                <p className="text-[8px] md:text-sm text-gray-400 uppercase tracking-tighter sm:tracking-widest mt-2">Garantía</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Visual (Infinite Carousel) */}
                    <div className="lg:col-span-6 relative w-full max-w-full overflow-hidden">
                        <div className="relative group">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-transparent opacity-20 blur-xl"></div>

                            {/* Carousel Container */}
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/10] bg-surface-darker">
                                {heroImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === activeHeroImg ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                            }`}
                                    >
                                        <img src={img} className="w-full h-full object-contain" alt={`Slide ${index}`} />
                                    </div>
                                ))}

                                {/* Dots */}
                                <div className="absolute bottom-6 right-6 flex gap-2">
                                    {heroImages.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-1.5 transition-all duration-500 rounded-full ${index === activeHeroImg ? 'w-6 bg-primary' : 'w-2 bg-white/30'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Overlay Text - Single Line Style */}
                        <div className="mt-8 flex flex-col items-end justify-center">
                            <h2 className="text-3xl md:text-5xl lg:text-5xl font-black italic uppercase tracking-tighter leading-none">
                                <span className="text-white">FACTORÍA</span> <span className="text-primary whitespace-nowrap">LA CARAVANA</span>
                            </h2>
                            <p className="text-yellow-500 font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mt-3">
                                SERVICIOS DE PLANCHADO Y PINTURA AUTOMOTRIZ
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* --- PROMO COUNTDOWN SECTION --- */}
            <section className="bg-red-600 py-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.webp')] opacity-20"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
                            ¡Pintura General <br />
                            <span className="text-yellow-400">+ PULIDO GRATIS!</span>
                        </h2>
                        <p className="text-white/90 text-xl font-bold uppercase tracking-[0.2em] italic">¡Solo por tiempo limitado!</p>
                    </div>

                    <div className="flex gap-4 md:gap-6">
                        {[
                            { label: 'Días', value: timeLeft.days },
                            { label: 'Horas', value: timeLeft.hours },
                            { label: 'Minutos', value: timeLeft.minutes },
                            { label: 'Segundos', value: timeLeft.seconds }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-16 h-20 md:w-24 md:h-28 bg-black rounded-xl flex items-center justify-center border border-white/10 shadow-2xl">
                                    <span className="text-3xl md:text-5xl font-black text-white tabular-nums">{item.value}</span>
                                </div>
                                <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest mt-2">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex-shrink-0">
                        <a href="https://wa.me/51959078603" className="inline-flex items-center gap-3 bg-black hover:bg-zinc-900 text-white font-black px-8 py-5 rounded-2xl transition-all shadow-xl uppercase italic tracking-tighter border border-white/20 hover:scale-105">
                            ¡LLAMA AHORA Y APROVECHA! <MessageCircle size={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* --- BRAND MARQUEE LABEL (Outside) --- */}
            <div className="w-full bg-background-dark py-12 relative z-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center justify-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-1 bg-primary w-12 rounded-full"></div>
                            <h3 className="text-white text-3xl md:text-5xl text-center font-black italic uppercase tracking-tighter">
                                Marcas de <span className="text-primary">Clase Mundial</span>
                            </h3>
                            <div className="h-1 bg-primary w-12 rounded-full"></div>
                        </div>
                        <p className="text-gray-500 text-sm text-center font-bold uppercase tracking-[0.3em] opacity-80">Excelencia en cada restauración</p>
                    </div>
                </div>
            </div>

            {/* --- BRAND MARQUEE --- */}
            <div className="w-full py-8 bg-white relative overflow-hidden group">
                {/* Side Fades for smooth entry/exit */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex animate-marquee w-max items-center pb-4 will-change-transform">
                    {/* Double the array for infinite effect, using padding instead of gap for perfect alignment */}
                    {[...brands, ...brands].map((brand, i) => (
                        <div key={i} className="flex-shrink-0 w-64 h-24 flex items-center justify-center px-8 transition-all duration-500 transform hover:scale-110">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="max-h-16 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Second row - Luxury brands */}
                <div className="flex animate-marquee-reverse w-max items-center pt-4 border-t border-gray-100/50 will-change-transform">
                    {[...luxuryBrands, ...luxuryBrands].map((brand, i) => (
                        <div key={i} className="flex-shrink-0 w-64 h-24 flex items-center justify-center px-8 transition-all duration-500 transform hover:scale-110">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="max-h-16 w-auto object-contain"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* --- INFO BAR --- */}
            <div className="w-full bg-surface-darker/90 backdrop-blur-md border-y border-white/5 py-8">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm uppercase tracking-widest">Horarios</p>
                            <p className="text-gray-400 text-xs mt-1">Lunes a Domingo de 8.00 AM - 6:00 PM</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm uppercase tracking-widest">Ubicación</p>
                            <p className="text-gray-400 text-xs mt-1">Av. Alisos cdra. 17 Mz.O. Lt.35 - SMP</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                            <Check className="size-6" />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm uppercase tracking-widest">Garantía</p>
                            <p className="text-gray-400 text-xs mt-1">100% Calidad y Respaldo Profesional</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- WHATSAPP PROMO --- */}
            <section className="py-16 bg-background-dark relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-gradient-to-r from-surface-dark to-surface-dark/50 p-8 md:p-12 rounded-3xl border border-white/5">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                                ¡Ofertas increíbles solo <span className="text-primary">por WhatsApp!</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl font-medium leading-relaxed">
                                Envía una foto del estado de tu auto por WhatsApp y conoce nuestras promociones especiales en pintura y planchado.
                            </p>
                        </div>
                        <a href="https://wa.me/51959078603" className="flex-shrink-0 bg-primary hover:bg-primary-dark text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-primary/30 transform hover:-translate-y-1 transition-all active:scale-95 uppercase italic tracking-tighter">
                            Cotiza por WhatsApp aquí
                        </a>
                    </div>
                </div>
            </section>

            {/* --- WORKFLOW PROCESS SECTION (panel.webp Integration) --- */}
            <section className="py-24 bg-background-dark relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <p className="text-primary text-xs font-black tracking-[0.5em] uppercase">Infografía de Servicio</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
                            Nuestro <span className="text-primary">Proceso</span> de Trabajo
                        </h2>
                        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <img
                            src="/assets/img/panel.webp"
                            alt="Proceso de trabajo Factoría La Caravana"
                            className="w-full h-auto rounded-2xl"
                        />
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest opacity-60 italic">
                            * Seguimos rigurosos estándares de calidad en cada etapa de la reparación
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SERVICES SECTION --- */}
            <section className="py-24 bg-background-dark relative" id="services">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
                            Nuestros <span className="text-primary">Servicios</span>
                        </h2>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <div className="h-px bg-primary w-12"></div>
                            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Servicios Premium</span>
                            <div className="h-px bg-primary w-12"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                        {/* Service 1 */}
                        <div className="group bg-surface-dark border-r border-white/5 last:border-0 hover:bg-surface-darker/80 transition-all duration-500">
                            <div className="relative h-64 overflow-hidden">
                                <img src="/assets/img/1.webp" alt="Planchado y Pintura" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
                            </div>
                            <div className="p-10 space-y-6">
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Planchado / Pintura</h3>
                                <p className="text-gray-400 text-sm font-medium">Especialistas en restauración de autos de alta gama con acabados de fábrica.</p>
                                <a href="https://wa.me/51959078603" className="w-full inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-primary/20">
                                    MÁS INFORMACIÓN <MessageCircle size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className="group bg-surface-dark border-r border-white/5 last:border-0 hover:bg-surface-darker/80 transition-all duration-500">
                            <div className="relative h-64 overflow-hidden">
                                <img src="/assets/img/2.webp" alt="Mantenimiento" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                </div>
                            </div>
                            <div className="p-10 space-y-6">
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Mantenimiento / Pulido</h3>
                                <p className="text-gray-400 text-sm font-medium">Protección cerámica y corrección de pintura para un brillo espectacular y duradero.</p>
                                <a href="https://wa.me/51959078603" className="w-full inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-primary/20">
                                    MÁS INFORMACIÓN <MessageCircle size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className="group bg-surface-dark border-r border-white/5 last:border-0 hover:bg-surface-darker/80 transition-all duration-500">
                            <div className="relative h-64 overflow-hidden">
                                <img src="/assets/img/3.webp" alt="Pintura de Aros" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
                            </div>
                            <div className="p-10 space-y-6">
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Pintura de Aros</h3>
                                <p className="text-gray-400 text-sm font-medium">Personalización estética de rines con pintura electrostática de alta resistencia.</p>
                                <a href="https://wa.me/51959078603" className="w-full inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-primary/20">
                                    MÁS INFORMACIÓN <MessageCircle size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <NavLink to="/servicios" className="inline-flex items-center gap-4 text-white bg-primary hover:bg-primary-dark px-12 py-5 rounded-2xl font-black italic uppercase tracking-tighter transition-all hover:scale-105 shadow-xl shadow-primary/30 group">
                            VER CATÁLOGO COMPLETO <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </NavLink>
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS SECTION --- */}
            <section className="py-24 bg-background-dark relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
                            OPINIONES DE <span className="text-primary">USUARIOS</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-2xl space-y-6 relative group overflow-hidden border border-gray-100 italic">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100" />
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.name}</h4>
                                            <p className="text-gray-500 text-xs font-semibold">{t.handle}</p>
                                        </div>
                                    </div>
                                    <div className="text-blue-600">
                                        {t.source === 'facebook' && <Facebook size={20} />}
                                        {t.source === 'instagram' && <Instagram size={20} className="text-pink-600" />}
                                        {t.source === 'twitter' && <Twitter size={20} className="text-blue-400" />}
                                    </div>
                                </div>
                                <div className="flex gap-0.5 text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-gray-100 -rotate-12 group-hover:text-primary/10 transition-colors" />
                                <p className="text-gray-600 text-sm leading-relaxed font-medium relative z-10">
                                    "{t.text}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PRODUCT PARTNERS MARQUEE --- */}
            <section className="py-20 bg-white relative overflow-hidden border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 italic uppercase tracking-tighter">
                        NUESTROS <span className="text-primary">ALIADOS...</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {/* First row - Left direction */}
                    <div className="flex animate-marquee w-max items-center will-change-transform">
                        {[...productBrands, ...productBrands, ...productBrands].map((p, i) => (
                            <div key={i} className="flex-shrink-0 w-64 h-24 flex items-center justify-center px-10 transition-all duration-500 transform hover:scale-110">
                                <img
                                    src={p.logo}
                                    alt={p.name}
                                    className="max-h-16 w-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Second row - Right direction (Reverse) */}
                    <div className="flex animate-marquee-reverse w-max items-center pt-4 border-t border-gray-50 will-change-transform">
                        {[...productBrands2, ...productBrands2, ...productBrands2].map((p, i) => (
                            <div key={i} className="flex-shrink-0 w-64 h-24 flex items-center justify-center px-10 transition-all duration-500 transform hover:scale-110">
                                <img
                                    src={p.logo}
                                    alt={p.name}
                                    className="max-h-16 w-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PROJECT GALLERY --- */}
            <section className="py-24 bg-white" id="gallery">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <p className="text-gray-400 text-xs font-black tracking-[0.4em] uppercase opacity-70">Galería de Proyectos</p>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter italic uppercase">
                            "Inspiración de lo que hemos logrado"
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Project 1 */}
                        <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-xl">
                            <img src="/assets/img/Antess.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Project" />
                            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-primary px-4 py-1.5 rounded-lg text-white text-[10px] font-black uppercase tracking-widest italic shadow-lg">Antes</div>
                        </div>
                        {/* Project 2 */}
                        <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-xl">
                            <img src="/assets/img/proceso.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Project" />
                            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-gray-900 px-4 py-1.5 rounded-lg text-white text-[10px] font-black uppercase tracking-widest italic shadow-lg">Proceso</div>
                        </div>
                        {/* Project 3 */}
                        <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-xl">
                            <img src="/assets/img/Despues.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Project" />
                            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-primary px-4 py-1.5 rounded-lg text-white text-[10px] font-black uppercase tracking-widest italic shadow-lg">Después</div>
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
                        <div className="lg:w-1/1 relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group select-none">
                            {/* After Image (Background) */}
                            <div className="absolute inset-0 w-full h-full">
                                <img src="/assets/img/Despues.webp" className="w-full h-full object-cover" alt="After" />
                                <div className="absolute top-4 right-4 bg-primary/90 text-white text-[10px] font-bold px-3 py-1 rounded tracking-widest backdrop-blur-sm">DESPUÉS</div>
                            </div>

                            {/* Before Image (Clipped) */}
                            <div
                                className="absolute inset-0 h-full overflow-hidden border-r-2 border-white/80"
                                style={{ width: `${sliderPos}%` }}
                            >
                                <img
                                    src="/assets/img/antes.webp"
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
