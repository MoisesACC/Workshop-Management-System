
import { NavLink } from 'react-router-dom';
import { Hammer, Facebook, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-surface-dark border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1 */}
                    <div className="space-y-6">
                        <NavLink className="flex items-center gap-2" to="/">
                            <img src="/assets/img/logo.png" alt="Factoría La Caravana" className="h-12 w-auto" />
                        </NavLink>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Tu taller de confianza especializado en vehículos de gama alta. Calidad, precisión y servicio premium en cada detalle.
                        </p>
                        <div className="flex space-x-4 text-gray-400">
                            <a href="#" className="hover:text-primary transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Mail size={24} /></a>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Enlaces Rápidos</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><NavLink to="/" className="hover:text-primary transition-colors">Inicio</NavLink></li>
                            <li><NavLink to="/servicios" className="hover:text-primary transition-colors">Nuestros Servicios</NavLink></li>
                            <li><NavLink to="/galeria" className="hover:text-primary transition-colors">Galería de Trabajos</NavLink></li>
                            <li><a href="#booking" className="hover:text-primary transition-colors">Agendar Cita</a></li>
                            <li><NavLink to="/dashboard" className="hover:text-primary transition-colors">Área de Clientes</NavLink></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Términos y Condiciones</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Contacto</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-0.5"><MapPin size={18} /></span>
                                <span>Av. Alisos cdra. 17 Mz.OLt.35, SMP<br />Lima, Perú</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary"><Phone size={18} /></span>
                                <span>+51 959 078 603</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary"><Mail size={18} /></span>
                                <span>info@lacaravana.pe</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary"><Clock size={18} /></span>
                                <span>Lun - Sáb: 8:00 AM - 6:00 PM</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Map */}
                    <div className="h-full min-h-[200px] rounded-lg overflow-hidden bg-gray-800 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580.1677100114517!2d-77.08722673519979!3d-11.982280045121486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105cf1b3a6c931b%3A0x8bbf9edf40f44040!2sFACTOR%C3%8DA%20LA%20CARAVANA!5e0!3m2!1ses-419!2spe!4v1771091945419!5m2!1ses-419!2spe"
                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2026 Factoría La Caravana. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
