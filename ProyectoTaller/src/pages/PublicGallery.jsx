
import { useState, useEffect } from 'react';
import {
    Camera, ImageIcon, Filter, CheckCircle2,
    ArrowRight, MessageCircle, Maximize2, Sparkles,
    ChevronRight, Play
} from 'lucide-react';

const PublicGallery = () => {
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        { id: 'all', name: 'Todos' },
        { id: 'paint', name: 'Planchado & Pintura' },
        { id: 'detailing', name: 'Detailing Cerámico' },
        { id: 'restoration', name: 'Restauración' },
        { id: 'wheels', name: 'Aros Custom' }
    ];

    const projects = [
        {
            id: 1,
            title: "BMW M4 Competition",
            category: "paint",
            description: "Restauración completa de lateral y pintura tricapa original.",
            image: "/assets/img/carousel-1.png",
            tag: "Premium",
            stats: { time: "4 días", quality: "Glasurit" }
        },
        {
            id: 2,
            title: "Audi R8 Spyder",
            category: "detailing",
            description: "Tratamiento cerámico 9H y corrección de barniz.",
            image: "/assets/img/2.png",
            tag: "Exótico",
            stats: { time: "3 días", quality: "Ceramic Pro" }
        },
        {
            id: 3,
            title: "Mustang GT 1967",
            category: "restoration",
            description: "Restauración total de carrocería y pintura personalizada.",
            image: "/assets/img/3.png",
            tag: "Clásico",
            stats: { time: "15 días", quality: "Show Car" }
        },
        {
            id: 4,
            title: "Porsche 911 Turbo",
            category: "paint",
            description: "Velo de novia y pulido espejo de alta gama.",
            image: "/assets/img/1.png",
            tag: "Premium",
            stats: { time: "5 días", quality: "OEM Paint" }
        },
        {
            id: 5,
            title: "Range Rover Vogue",
            category: "detailing",
            description: "Detailing interior y protección hidrofóbica.",
            image: "/assets/img/carousel-bg-2.jpg",
            tag: "SUV Luxe",
            stats: { time: "2 días", quality: "Premium Care" }
        },
        {
            id: 6,
            title: "Aros Custom Mercedes",
            category: "wheels",
            description: "Reparación y pintura en negro piano.",
            image: "/assets/img/carousel-1.png",
            tag: "Custom",
            stats: { time: "1 día", quality: "Powder Coat" }
        }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="bg-background-dark min-h-screen pt-22 md:pt-30">
            {/* --- HERO SECTION --- */}
            <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <img src="/assets/img/panel.png" className="w-full h-full object-cover opacity-10 blur-sm scale-110" alt="Bg" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background-dark/95 to-background-dark"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md text-primary text-xs font-black tracking-[0.3em] uppercase mb-8">
                        <Camera size={14} /> Portafolio de Proyectos
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">
                        Resultados <span className="text-primary italic">Inspiradores</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                        Explore nuestra galería de transformaciones. Cada vehículo que pasa por nuestras manos recibe un trato de clase mundial, devolviéndole su brillo y perfección original.
                    </p>
                </div>
            </section>

            {/* --- FILTER CONTROL --- */}
            <section className="sticky top-[72px] md:top-[88px] z-30 bg-background-dark/80 backdrop-blur-xl border-b border-white/5 py-4">
                <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
                    <div className="flex items-center justify-center gap-2 md:gap-4 min-w-max pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === cat.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PROJECTS GRID --- */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group relative bg-surface-dark border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-primary/50 hover:-translate-y-2 shadow-2xl"
                            >
                                {/* Project Image */}
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                                    {/* Action Tags */}
                                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                                        <span className="bg-primary px-4 py-1.5 rounded-lg text-white text-[10px] font-black uppercase tracking-widest italic shadow-lg">
                                            {project.tag}
                                        </span>
                                    </div>

                                    <div className="absolute top-6 right-6">
                                        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary">
                                            <Maximize2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-primary">
                                            <Sparkles size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                                {categories.find(c => c.id === project.category)?.name}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Project Stats */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Tiempo</p>
                                                <p className="text-white text-xs font-black italic">{project.stats.time}</p>
                                            </div>
                                            <div className="w-px h-6 bg-white/10"></div>
                                            <div>
                                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Insumo</p>
                                                <p className="text-white text-xs font-black italic">{project.stats.quality}</p>
                                            </div>
                                        </div>
                                        <NavLink to="/servicios" className="text-white/30 group-hover:text-primary transition-colors">
                                            <ChevronRight size={20} />
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-32 space-y-6">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-600">
                                <ImageIcon size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Próximamente más trabajos</h3>
                            <p className="text-gray-400">Estamos documentando nuevas transformaciones espectaculares.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-20 border border-white/10 text-center space-y-10">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight">
                                ¿Deseas estos resultados <span className="text-primary italic">para tu auto?</span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl font-medium">
                                No esperes más para darle el tratamiento que tu vehículo merece. Cotiza con los expertos.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="https://wa.me/51959078603" className="bg-primary hover:bg-primary-dark text-white font-black px-12 py-5 rounded-2xl shadow-xl shadow-primary/30 transform hover:-translate-y-1 transition-all active:scale-95 uppercase italic tracking-tighter flex items-center gap-3 justify-center">
                                Cotizar por WhatsApp <MessageCircle size={24} />
                            </a>
                            <NavLink to="/servicios" className="bg-white/5 hover:bg-white/10 text-white font-black px-12 py-5 rounded-2xl border border-white/10 transition-all uppercase italic tracking-tighter flex items-center gap-3 justify-center">
                                Nuestros Servicios <ArrowRight size={24} />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicGallery;
import { NavLink } from 'react-router-dom';
