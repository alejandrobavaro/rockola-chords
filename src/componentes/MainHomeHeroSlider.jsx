// ================================================
// ARCHIVO: MainHomeHeroSlider.jsx - CON IMÁGENES REALES
// DESCRIPCIÓN: Slider principal con imágenes reales del proyecto
// ================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight, BsPlayCircle, BsArrowRight } from 'react-icons/bs';
import '../assets/scss/_03-Componentes/_MainHomeHeroSlider.scss';

// ================================================
// ARRAY DE IMÁGENES REALES PARA SLIDER
// ================================================
const realSliderImages = [
  "/img/03-img-cuadradas/1.jpg",
  "/img/03-img-cuadradas/2.jpg",
  "/img/03-img-cuadradas/3.jpg",
  "/img/03-img-cuadradas/4.jpg",
  "/img/03-img-cuadradas/2021-08-14 015.jpg",
  "/img/03-img-cuadradas/banner5.png",
  "/img/03-img-cuadradas/Designer (1).jpeg",
  "/img/03-img-cuadradas/Designer (2).jpeg",
  "/img/03-img-cuadradas/Designer (3).jpeg",
  "/img/03-img-cuadradas/Designer (4).jpeg",
  "/img/03-img-cuadradas/Designer (5).jpeg",
  "/img/03-img-cuadradas/Designer (6).jpeg",
  "/img/03-img-cuadradas/Designer (7).jpeg",
  "/img/03-img-cuadradas/Designer (8).jpeg",
  "/img/03-img-cuadradas/Designer (9).jpeg",
  "/img/03-img-cuadradas/Designer (10).jpeg",
  "/img/03-img-cuadradas/Designer (11).jpeg",
  "/img/03-img-cuadradas/Designer (12).jpeg",
  "/img/03-img-cuadradas/Designer (13).jpeg",
  "/img/03-img-cuadradas/Designer (14).jpeg",
  "/img/03-img-cuadradas/Designer.jpeg",
  "/img/03-img-cuadradas/gif3.gif",
  "/img/03-img-cuadradas/gif4.gif",
  "/img/03-img-cuadradas/gif5.gif",
  "/img/03-img-cuadradas/gif7a.gif",
  "/img/03-img-cuadradas/gif8.gif",
  "/img/03-img-cuadradas/Logo nuevo - ALMANGO POP COVERS 11.png.jpg",
  "/img/03-img-cuadradas/Logo nuevo - ALMANGO POP COVERS.png",
  "/img/03-img-cuadradas/Logo nuevo 2 - ALMANGO POP COVERS.png",
  "/img/03-img-cuadradas/Logo nuevo 3 - ALMANGO POP COVERS.png",
  "/img/03-img-cuadradas/Logo nuevo 4 - ALMANGO POP COVERS.png"
];

// ================================================
// FUNCIÓN: OBTENER IMAGEN REAL ALEATORIA PARA SLIDER
// ================================================
const getRealSliderImage = () => {
  const randomIndex = Math.floor(Math.random() * realSliderImages.length);
  return realSliderImages[randomIndex];
};

const MainHomeHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // ================================================
  // DATOS DE LOS SLIDES CON IMÁGENES REALES
  // ================================================
  const slides = [
    {
      id: 1,
      image: getRealSliderImage(),
      title: 'Tu Biblioteca Musical Completa',
      subtitle: 'Más de 500 canciones con acordes profesionales listas para tocar',
      ctaText: 'Explorar Canciones',
      ctaLink: '/musica',
      color: '#e63946',
      badge: 'Nuevo',
      backgroundImage: getRealSliderImage()
    },
    {
      id: 2,
      image: getRealSliderImage(),
      title: 'Visualizador Inteligente de Acordes',
      subtitle: 'Acordes que se adaptan automáticamente a tu pantalla - Mobile, Tablet y Desktop',
      ctaText: 'Probar Visualizador',
      ctaLink: '/musica',
      color: '#118ab2',
      badge: 'Popular',
      backgroundImage: getRealSliderImage()
    },
    {
      id: 3,
      image: getRealSliderImage(),
      title: 'Herramientas Profesionales para Músicos',
      subtitle: 'Todo lo que necesitas para ensayos, presentaciones y práctica musical',
      ctaText: 'Ver Funcionalidades',
      ctaLink: '/formateo-chords',
      color: '#06d6a0',
      badge: 'Destacado',
      backgroundImage: getRealSliderImage()
    },
    {
      id: 4,
      image: getRealSliderImage(),
      title: 'Exporta e Imprime tus Partituras',
      subtitle: 'Formato A4 optimizado para impresión profesional',
      ctaText: 'Formatear Partituras',
      ctaLink: '/chords-format',
      color: '#7209b7',
      badge: 'Útil',
      backgroundImage: getRealSliderImage()
    },
    {
      id: 5,
      image: getRealSliderImage(),
      title: 'Homenajes a Grandes Artistas',
      subtitle: 'Tributos a AC/DC, Queen, The Beatles y más de 30 artistas legendarios',
      ctaText: 'Ver Homenajes',
      ctaLink: '/musica?category=homenajes',
      color: '#ffd166',
      badge: 'Exclusivo',
      backgroundImage: getRealSliderImage()
    }
  ];

  // ================================================
  // IMÁGENES REALES ADICIONALES PARA EL SLIDER
  // ================================================
  const additionalImages = Array.from({ length: 4 }).map(() => getRealSliderImage());

  // ================================================
  // EFECTO: AUTO-SLIDE
  // ================================================
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // ================================================
  // FUNCIÓN: NEXT SLIDE
  // ================================================
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // ================================================
  // FUNCIÓN: PREVIOUS SLIDE
  // ================================================
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // ================================================
  // RENDER PRINCIPAL
  // ================================================
  return (
    <div className="main-home-hero-slider">
      
      {/* ================================================
          CONTENEDOR DEL SLIDER CON IMÁGENES REALES
      ================================================ */}
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden={index !== currentSlide}
          >
            {/* Overlay para mejor legibilidad */}
            <div className="slide-overlay"></div>
            
            {/* IMAGEN REAL DE FONDO ADICIONAL */}
            <div className="slide-background-image">
              <img 
                src={slide.backgroundImage} 
                alt=""
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  maxHeight: '60%',
                  objectFit: 'cover',
                  opacity: 0.15,
                  zIndex: 1
                }}
                loading="lazy"
                aria-hidden="true"
              />
            </div>
            
            {/* Contenido del slide */}
            <div className="slide-content">
              
              {/* Badge destacado */}
              {slide.badge && (
                <div className="slide-badge" style={{ backgroundColor: slide.color }}>
                  {slide.badge}
                </div>
              )}
              
              {/* IMAGEN REAL ADICIONAL EN EL CONTENIDO */}
              <div className="slide-content-image">
                <img 
                  src={getRealSliderImage()} 
                  alt={slide.title}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    border: `3px solid ${slide.color}`
                  }}
                  loading="lazy"
                />
              </div>
              
              {/* Título principal */}
              <h2 className="slide-title">
                {slide.title}
              </h2>
              
              {/* Subtítulo descriptivo */}
              <p className="slide-subtitle">
                {slide.subtitle}
              </p>
              
              {/* Acciones del slide */}
              <div className="slide-actions">
                
                {/* Botón principal de acción */}
                <Link 
                  to={slide.ctaLink} 
                  className="slide-cta"
                  style={{ backgroundColor: slide.color }}
                  aria-label={`${slide.ctaText} - ${slide.subtitle}`}
                >
                  <BsPlayCircle className="cta-icon" />
                  {slide.ctaText}
                  <BsArrowRight className="cta-arrow" />
                </Link>
                
                {/* Indicadores de posición */}
                <div className="slide-indicators" aria-label="Indicadores de slide">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`indicator ${idx === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Ir a slide ${idx + 1}`}
                      aria-current={idx === currentSlide}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================================================
          IMÁGENES REALES ADICIONALES ALREDEDOR DEL SLIDER
      ================================================ */}
      <div className="slider-side-images">
        {additionalImages.map((img, index) => (
          <div key={index} className="side-image">
            <img 
              src={img} 
              alt={`Música ${index + 1}`}
              style={{
                width: '100%',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '4px',
                margin: '5px 0'
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* ================================================
          BOTONES DE NAVEGACIÓN 
      ================================================ */}
      <button 
        className="slider-nav prev" 
        onClick={prevSlide} 
        aria-label="Slide anterior"
      >
        <BsChevronLeft />
      </button>
      
      <button 
        className="slider-nav next" 
        onClick={nextSlide} 
        aria-label="Slide siguiente"
      >
        <BsChevronRight />
      </button>

      {/* ================================================
          ESTADÍSTICAS RÁPIDAS CON IMÁGENES REALES
      ================================================ */}
      <div className="slider-stats" aria-label="Estadísticas del sitio">
        <div className="stat-item">
          <div className="stat-image">
            <img 
              src={getRealSliderImage()} 
              alt="Canciones"
              style={{
                width: '30px',
                height: '30px',
                objectFit: 'cover',
                borderRadius: '50%',
                marginBottom: '5px'
              }}
              loading="lazy"
            />
          </div>
          <span className="stat-number">500+</span>
          <span className="stat-label">Canciones</span>
        </div>
        <div className="stat-item">
          <div className="stat-image">
            <img 
              src={getRealSliderImage()} 
              alt="Artistas"
              style={{
                width: '30px',
                height: '30px',
                objectFit: 'cover',
                borderRadius: '50%',
                marginBottom: '5px'
              }}
              loading="lazy"
            />
          </div>
          <span className="stat-number">30+</span>
          <span className="stat-label">Artistas</span>
        </div>
        <div className="stat-item">
          <div className="stat-image">
            <img 
              src={getRealSliderImage()} 
              alt="Gratis"
              style={{
                width: '30px',
                height: '30px',
                objectFit: 'cover',
                borderRadius: '50%',
                marginBottom: '5px'
              }}
              loading="lazy"
            />
          </div>
          <span className="stat-number">100%</span>
          <span className="stat-label">Gratis</span>
        </div>
      </div>
    </div>
  );
};

export default MainHomeHeroSlider;