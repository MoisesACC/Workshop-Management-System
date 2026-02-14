
import { useState, useEffect } from 'react';
import {
    Wrench, PaintBucket, Sparkles, ShieldCheck,
    Check, ArrowRight, MessageCircle, Clock,
    Award, Zap, Star, Shield
} from 'lucide-react';

const PublicServices = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const services = [
        {
            id: 'paint',
            title: "Planchado y Pintura",
            subtitle: "RESTAURACIÓN ESTRUCTURAL",
            description: "Recuperamos la línea original de su vehículo con tecnología de punta. Utilizamos sistemas de soldadura punto a punto y bancos de estiramiento computarizados para garantizar la integridad estructural.",
            image: "/assets/img/1.png",
            features: [
                "Desabollado en frío sin dañar pintura original",
                "Soldadura MIG/MAG para máxima resistencia",
                "Alineamiento de chasis computarizado",
                "Reparación de piezas plásticas y fibra"
            ],
            icon: <Wrench size={32} />
        },
        {
            id: 'finish',
            title: "Pintura al Horno",
            subtitle: "ACABADO DE FÁBRICA",
            description: "Contamos con laboratorio de colorimetría propio y cabina de pintura presurizada. Aplicamos pinturas de base agua (Eco-friendly) con barnices de alto solidos para un brillo y durabilidad inigualable.",
            image: "/assets/img/pintura.jpg",
            features: [
                "Colorimetría exacta por computadora",
                "Secado controlado por infrarrojos",
                "Acabados tricapa y mates especiales",
                "Garantía de color de por vida"
            ],
            icon: <PaintBucket size={32} />
        },
        {
            id: 'detailing',
            title: "Detailing Profesional",
            subtitle: "ESTÉTICA DE EXPOSICIÓN",
            description: "No es solo una limpieza, es una restauración estética integral. Protegemos su inversión con los tratamientos más avanzados del mercado mundial.",
            image: "/assets/img/2.png",
            features: [
                "Recubrimiento Cerámico 9H",
                "Corrección de pintura (3 pasos)",
                "Limpieza profunda de salón con vapor",
                "Restauración de faros y micas"
            ],
            icon: <Sparkles size={32} />
        },
        {
            id: 'wheels',
            title: "Pintura de Aros",
            subtitle: "PERSONALIZACIÓN EXCLUSIVA",
            description: "Damos un nuevo look a sus rines con acabados personalizados. Desde negro piano hasta colores satinados o metalizados con alta resistencia térmica.",
            image: "/assets/img/3.png",
            features: [
                "Limpieza por chorreado de arena",
                "Pintura electrostática (Powder Coat)",
                "Reparación de rayones de cuneta",
                "Acabados personalizados"
            ],
            icon: <Star size={32} />
        }
    ];

    const benefits = [
        {
            icon: <ShieldCheck className="text-primary" />,
            title: "Garantía Total",
            desc: "Todos nuestros trabajos cuentan con garantía certificada de hasta 5 años en pintura."
        },
        {
            icon: <Award className="text-primary" />,
            title: "Personal Certificado",
            desc: "Técnicos especialistas en marcas de alta gama como BMW, Audi, Mercedes y Porsche."
        },
        {
            icon: <Star className="text-primary" />,
            title: "Insumos Premium",
            desc: "Utilizamos exclusivamente productos de marcas líderes mundiales como Glasurit y 3M."
        }
    ];

    return (
        <div className="bg-background-dark min-h-screen pt-22 md:pt-30">
            {/* --- HERO SECTION --- */}
            <section className="relative py-12 md:py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/assets/img/carousel-bg-2.jpg" className="w-full h-full object-cover opacity-50" alt="Background" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background-dark/50 via-background-dark to-background-dark"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <p className="text-primary font-black tracking-[0.4em] uppercase text-sm mb-4">Servicios Especializados</p>
                    <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-6">
                        Excelencia en <span className="text-primary">Cada Detalle</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                        En Factoría La Caravana, combinamos la artesanía tradicional con la tecnología más avanzada para devolverle a su vehículo su estado original de fábrica.
                    </p>
                </div>
            </section>

            {/* --- MAIN SERVICES LOOP --- */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 space-y-32">
                    {services.map((svc, index) => (
                        <div key={svc.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 group`}>
                            {/* Image Side */}
                            <div className="flex-1 relative">
                                <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-surface-darker/50 aspect-[16/10] flex items-center justify-center">
                                    <img
                                        src={svc.image}
                                        alt={svc.title}
                                        className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700"
                                    />
                                </div>
                                <div className="absolute -bottom-8 -right-8 bg-surface-dark border border-white/10 p-6 rounded-2xl shadow-2xl hidden md:block z-20">
                                    <div className="text-primary">{svc.icon}</div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="flex-1 space-y-8">
                                <div>
                                    <p className="text-primary font-black tracking-widest text-sm mb-2 italic">{svc.subtitle}</p>
                                    <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4">{svc.title}</h2>
                                    <div className="w-20 h-1 bg-primary rounded-full"></div>
                                </div>

                                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                                    {svc.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {svc.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Check size={14} />
                                            </div>
                                            <span className="text-gray-300 text-sm font-semibold">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4">
                                    <a href="https://wa.me/51959078603" className="inline-flex items-center gap-3 bg-white hover:bg-primary hover:text-white text-black font-black px-8 py-4 rounded-xl transition-all uppercase italic tracking-tighter group/btn shadow-xl hover:shadow-primary/20">
                                        Solicitar Cotización <MessageCircle size={20} className="group-hover/btn:rotate-12 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- VALUES/BENEFITS --- */}
            <section className="py-24 bg-surface-darker/50 border-y border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="text-center space-y-6 group">
                                <div className="w-20 h-20 bg-background-dark border border-white/10 mx-auto rounded-3xl flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-2xl">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white italic uppercase mb-2">{benefit.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-primary rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-[0_0_60px_rgba(216,3,39,0.4)]">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight">
                                ¿Listo para devolverle <br /> el brillo a tu auto?
                            </h2>
                            <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                                Agende su cita hoy mismo y reciba un diagnóstico gratuito del estado de su pintura y carrocería.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <a href="https://wa.me/51959078603" className="bg-white text-primary font-black px-10 py-5 rounded-2xl shadow-xl hover:scale-105 transition-transform uppercase italic tracking-tighter">
                                    Contactar por WhatsApp
                                </a>
                                <a href="#booking" className="bg-background-dark text-white font-black px-10 py-5 rounded-2xl shadow-xl hover:scale-105 transition-transform uppercase italic tracking-tighter border border-white/10">
                                    Agendar Cita Online
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PublicServices;
