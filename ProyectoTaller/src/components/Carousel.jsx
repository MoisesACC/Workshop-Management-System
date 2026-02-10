
import { useState, useEffect } from 'react';
import '../css/carousel.css';
import carousel1 from '../assets/img/carousel-1.png';
import carousel2 from '../assets/img/carousel-2.png';

const Carousel = () => {
    const [current, setCurrent] = useState(0);
    const slides = [
        {
            image: carousel1,
            title: 'Tu Auto en las Mejores Manos',
            subtitle: 'Servicio Profesional y Garantizado',
            cta: 'Ver Servicios'
        },
        {
            image: carousel2,
            title: 'Mantenimiento Preventivo',
            subtitle: 'Alarga la vida de tu motor',
            cta: 'Agendar Cita'
        }
    ];

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Auto scroll
        return () => clearInterval(interval);
    }, [current]);

    return (
        <div className="carousel">
            {slides.map((slide, index) => (
                <div className={index === current ? 'carousel-slide active' : 'carousel-slide'} key={index}>
                    <img src={slide.image} alt={slide.title} className="carousel-img" />
                    <div className="carousel-content">
                        <h2 className="carousel-title">{slide.title}</h2>
                        <p className="carousel-subtitle">{slide.subtitle}</p>
                        <a href="#" className="carousel-btn">{slide.cta}</a>
                    </div>
                </div>
            ))}
            <a className="prev" onClick={prevSlide}>&#10094;</a>
            <a className="next" onClick={nextSlide}>&#10095;</a>

            <div className="dots-container">
                {slides.map((_, index) => (
                    <span className={index === current ? 'dot active' : 'dot'} onClick={() => setCurrent(index)} key={index}></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
