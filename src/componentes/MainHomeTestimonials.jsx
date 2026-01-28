// ================================================
// ARCHIVO: MainHomeTestimonials.jsx - VERSIÓN FINAL CORREGIDA
// DESCRIPCIÓN: Testimonios compactos - TODOS LOS ICONOS VERIFICADOS COMO DISPONIBLES
// PROBLEMA: BsPianoFill y BsGuitar NO EXISTEN en react-icons/bs
// SOLUCIÓN: Usar solo iconos BS disponibles verificados
// FECHA: [Fecha Actual]
// ================================================

// ================================================
// IMPORTS - SOLO ICONOS BS QUE SÍ EXISTEN
// Documentación oficial: https://react-icons.github.io/react-icons/icons/bs/
// ================================================
import React, { useState, useEffect } from 'react';
import { 
  BsQuote,
  BsStar,
  BsStarFill,
  BsStarHalf,
  BsChevronLeft,
  BsChevronRight,
  BsPersonCircle,
  BsMusicNoteBeamed,  // ✓ DISPONIBLE
  BsMicFill,          // ✓ DISPONIBLE
  BsAward,            // ✓ DISPONIBLE
  BsPersonCheck,      // ✓ DISPONIBLE
  BsHeadphones,       // ✓ DISPONIBLE
  BsCalendarCheck,    // ✓ DISPONIBLE
  BsMusicNoteList,    // ✓ DISPONIBLE (para guitarra)
  BsMusicPlayerFill   // ✓ DISPONIBLE (para piano)
} from 'react-icons/bs';
import '../assets/scss/_03-Componentes/_MainHomeTestimonials.scss';

// ================================================
// ARRAY DE IMÁGENES REALES PARA TESTIMONIOS
// ================================================
const realTestimonialImages = [
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
  "/img/03-img-cuadradas/gif8.gif"
];

// ================================================
// FUNCIÓN: OBTENER IMAGEN REAL ALEATORIA
// ================================================
const getRealTestimonialImage = () => {
  const randomIndex = Math.floor(Math.random() * realTestimonialImages.length);
  return realTestimonialImages[randomIndex];
};

// ================================================
// COMPONENTE PRINCIPAL - TESTIMONIOS HOME
// ================================================
const MainHomeTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // ================================================
  // 8 TESTIMONIOS DE USUARIOS CON IMÁGENES REALES
  // USANDO SOLO ICONOS BS DISPONIBLES VERIFICADOS
  // ================================================
  const testimonials = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      role: "Guitarrista Profesional",
      avatar: <BsMusicNoteList />,  // ✓ ICONO DISPONIBLE
      rating: 5,
      text: "Como guitarrista, Rockola ha revolucionado cómo preparo presentaciones. Los acordes son precisos y el visualizador adaptativo es increíble.",
      color: "#e63946",
      type: "Profesional",
      experience: "15 años",
      image: getRealTestimonialImage()
    },
    {
      id: 2,
      name: "María González",
      role: "Profesora de Música",
      avatar: <BsMusicNoteBeamed />, // ✓ ICONO DISPONIBLE
      rating: 4.5,
      text: "Uso esta plataforma con todos mis estudiantes. Transponer acordes y exportar formatos hace que la enseñanza sea mucho más efectiva.",
      color: "#118ab2",
      type: "Educadora",
      experience: "8 años",
      image: getRealTestimonialImage()
    },
    {
      id: 3,
      name: "Luis Fernández",
      role: "Cantante de Banda",
      avatar: <BsMicFill />, // ✓ ICONO DISPONIBLE
      rating: 5,
      text: "La colección de homenajes es impresionante. Preparamos tributo a Queen en tiempo récord gracias a acordes verificados.",
      color: "#06d6a0",
      type: "Banda Activa",
      experience: "10 años",
      image: getRealTestimonialImage()
    },
    {
      id: 4,
      name: "Ana Martínez",
      role: "Músico Independiente",
      avatar: <BsPersonCircle />, // ✓ ICONO DISPONIBLE
      rating: 5,
      text: "Las zapadas por género son mi función favorita. Me inspiran para crear nuevas canciones y explorar estilos nuevos.",
      color: "#7209b7",
      type: "Independiente",
      experience: "6 años",
      image: getRealTestimonialImage()
    },
    {
      id: 5,
      name: "Roberto Sánchez",
      role: "Director de Coro",
      avatar: <BsPersonCheck />, // ✓ ICONO DISPONIBLE
      rating: 4.5,
      text: "La exportación a formato A4 es perfecta para partituras del coro. Ahorramos horas de trabajo en formateo.",
      color: "#ffd166",
      type: "Director",
      experience: "12 años",
      image: getRealTestimonialImage()
    },
    {
      id: 6,
      name: "Laura Torres",
      role: "Pianista Clásica",
      avatar: <BsMusicPlayerFill />, // ✓ ICONO DISPONIBLE - alternativa para piano
      rating: 5,
      text: "Como pianista, el formateo de partituras me ha cambiado la vida. Puedo imprimir partituras perfectas para recitales.",
      color: "#f15bb5",
      type: "Clásica",
      experience: "20 años",
      image: getRealTestimonialImage()
    },
    {
      id: 7,
      name: "Diego López",
      role: "Productor Musical",
      avatar: <BsHeadphones />, // ✓ ICONO DISPONIBLE
      rating: 5,
      text: "Uso Rockola para todas mis producciones. Las canciones están perfectamente estructuradas y los acordes exactos.",
      color: "#4cc9f0",
      type: "Productor",
      experience: "7 años",
      image: getRealTestimonialImage()
    },
    {
      id: 8,
      name: "Sofía Ramírez",
      role: "Organizadora de Eventos",
      avatar: <BsCalendarCheck />, // ✓ ICONO DISPONIBLE
      rating: 4.5,
      text: "Organizo eventos musicales y Rockola es esencial. Puedo preparar setlists completos en minutos.",
      color: "#9d4edd",
      type: "Eventos",
      experience: "5 años",
      image: getRealTestimonialImage()
    }
  ];

  // ================================================
  // CASOS DE ÉXITO CON IMÁGENES REALES - COMPACTO
  // ================================================
  const successCases = [
    {
      title: "Banda de Covers",
      description: "50 canciones para temporada verano",
      stats: "+80% eficiencia",
      icon: "🎸",
      details: "3 meses → 2 semanas",
      image: getRealTestimonialImage()
    },
    {
      title: "Escuela de Música",
      description: "Digitalizaron material didáctico",
      stats: "200+ estudiantes",
      icon: "🎓",
      details: "Material actualizado",
      image: getRealTestimonialImage()
    },
    {
      title: "Músico Solista",
      description: "Creó primer álbum usando zapadas",
      stats: "12 canciones",
      icon: "🎤",
      details: "Publicado en 2 meses",
      image: getRealTestimonialImage()
    },
    {
      title: "Orquesta Local",
      description: "Partituras para 30 músicos",
      stats: "0 errores",
      icon: "🎻",
      details: "Ensayos perfectos",
      image: getRealTestimonialImage()
    },
    {
      title: "Estudio de Grabación",
      description: "Optimizó preproducción musical",
      stats: "40% más rápido",
      icon: "🎧",
      details: "Más calidad",
      image: getRealTestimonialImage()
    },
    {
      title: "Evento Corporativo",
      description: "Música para 500 personas",
      stats: "100% satisfacción",
      icon: "🎪",
      details: "Setlist personalizado",
      image: getRealTestimonialImage()
    }
  ];

  // ================================================
  // AUTOPLAY: SLIDER AUTOMÁTICO - COMPACTO
  // ================================================
  useEffect(() => {
    let interval;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 3500); // 3.5 segundos para cambios más rápidos
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, testimonials.length]);

  // ================================================
  // FUNCIONES DE NAVEGACIÓN DEL CARRUSEL
  // ================================================
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // ================================================
  // FUNCIÓN: RENDERIZAR ESTRELLAS DE RATING
  // ================================================
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} className="star" />);
    }
    
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" className="star" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<BsStar key={`empty-${i}`} className="star" />);
    }
    
    return stars;
  };

  // ================================================
  // RENDER PRINCIPAL - DISEÑO COMPACTO
  // ================================================
  return (
    <div className="main-home-testimonials">
      
      {/* ================================================
          ENCABEZADO COMPACTO
      ================================================ */}
      <div className="testimonials-header">
        <div className="header-content">
          <div className="header-badge">
            <BsQuote className="badge-icon" />
            <span>500+ músicos confían</span>
          </div>
          
          <h2 className="section-title">
            <BsQuote className="title-icon" />
            Testimonios Reales
          </h2>
          <p className="section-subtitle">
            Descubre por qué profesionales eligen Rockola para su práctica diaria
          </p>
        </div>
        
        {/* CONTROLES DE AUTOPLAY COMPACTO */}
        <div className="autoplay-controls">
          <button 
            className={`autoplay-btn ${isAutoPlaying ? 'active' : ''}`}
            onClick={toggleAutoPlay}
            aria-label={isAutoPlaying ? 'Pausar slideshow' : 'Reanudar slideshow'}
          >
            <span className="autoplay-dot"></span>
            <span className="autoplay-text">
              {isAutoPlaying ? 'Auto ON' : 'Auto OFF'}
            </span>
          </button>
        </div>
      </div>
      
      {/* ================================================
          CARRUSEL PRINCIPAL - COMPACTO
      ================================================ */}
      <div className="testimonials-carousel">
        
        {/* BOTONES DE NAVEGACIÓN */}
        <button 
          className="carousel-nav prev" 
          onClick={prevTestimonial}
          aria-label="Testimonio anterior"
        >
          <BsChevronLeft />
        </button>
        
        {/* CONTENEDOR DEL CARRUSEL */}
        <div className="carousel-container">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
              style={{ borderColor: testimonial.color }}
              aria-hidden={index !== currentTestimonial}
            >
              
              {/* ENCABEZADO DEL TESTIMONIO */}
              <div className="testimonial-header">
                <div className="user-avatar" style={{ backgroundColor: `${testimonial.color}20`, color: testimonial.color }}>
                  {testimonial.avatar}
                </div>
                
                <div className="user-info">
                  <h4 className="user-name">{testimonial.name}</h4>
                  <div className="user-details">
                    <span className="user-role">{testimonial.role}</span>
                    <span className="user-experience">{testimonial.experience} exp.</span>
                  </div>
                </div>
                
                <div className="user-type-badge" style={{ backgroundColor: `${testimonial.color}15`, color: testimonial.color }}>
                  {testimonial.type}
                </div>
              </div>
              
              {/* RATING COMPACTO */}
              <div className="testimonial-rating">
                <div className="stars">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="rating-text">
                  {testimonial.rating.toFixed(1)}/5.0
                </span>
              </div>
              
              {/* TEXTO DEL TESTIMONIO */}
              <div className="testimonial-text">
                <BsQuote className="quote-icon quote-left" style={{ color: testimonial.color }} />
                <p>{testimonial.text}</p>
                <BsQuote className="quote-icon quote-right" style={{ color: testimonial.color }} />
              </div>
              
              {/* IMAGEN DEL TESTIMONIO */}
              <div className="testimonial-image">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} - ${testimonial.role}`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-nav next" 
          onClick={nextTestimonial}
          aria-label="Testimonio siguiente"
        >
          <BsChevronRight />
        </button>
        
        {/* INDICADORES NUMÉRICOS COMPACTOS */}
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Ir a testimonio ${index + 1}`}
            >
              <span className="indicator-number">{index + 1}</span>
            </button>
          ))}
        </div>
        
        {/* CONTADOR COMPACTO */}
        <div className="carousel-counter">
          <span className="current-slide">{currentTestimonial + 1}</span>
          <span className="counter-separator">/</span>
          <span className="total-slides">{testimonials.length}</span>
        </div>
      </div>
      
      {/* ================================================
          CASOS DE ÉXITO - COMPACTO EN GRID
      ================================================ */}
      <div className="success-cases-section">
        <div className="section-header">
          <h3 className="subsection-title">
            <BsAward className="subsection-icon" />
            Casos de Éxito
          </h3>
          <p className="subsection-subtitle">
            Transformaciones reales en la comunidad musical
          </p>
        </div>
        
        <div className="success-cases-grid">
          {successCases.map((caseItem, index) => (
            <div key={index} className="success-case-card">
              <div className="case-header">
                <div className="case-icon">{caseItem.icon}</div>
                <div className="case-stats-badge">
                  <span className="stats-value">{caseItem.stats}</span>
                </div>
              </div>
              
              <div className="case-content">
                <h4 className="case-title">{caseItem.title}</h4>
                <p className="case-description">{caseItem.description}</p>
                <div className="case-details">
                  <span className="case-detail">{caseItem.details}</span>
                </div>
              </div>
              
              <div className="case-image">
                <img 
                  src={caseItem.image} 
                  alt={caseItem.title}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* ================================================
          ESTADÍSTICAS - COMPACTO EN GRID
      ================================================ */}
      <div className="satisfaction-stats">
        <div className="stats-header">
          <h4 className="stats-title">
            <BsStar className="stats-icon" />
            Números que Hablan
          </h4>
          <p className="stats-subtitle">Confianza de la comunidad musical</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-item highlight">
            <span className="stat-number">4.8</span>
            <span className="stat-label">Rating Promedio</span>
            <span className="stat-sub">347 reviews</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">94%</span>
            <span className="stat-label">Satisfacción</span>
            <span className="stat-sub">Clientes satisfechos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Usuarios Activos</span>
            <span className="stat-sub">Músicos registrados</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Recomendación</span>
            <span className="stat-sub">Nos recomiendan</span>
          </div>
        </div>
      </div>
      
      {/* ================================================
          CTA FINAL - COMPACTO
      ================================================ */}
      <div className="testimonials-cta">
        <div className="cta-content">
          <div className="cta-badge">
            <BsQuote className="cta-badge-icon" />
            <span>Únete ahora</span>
          </div>
          
          <h3 className="cta-title">¿Listo para transformar tu práctica musical?</h3>
          <p className="cta-text">
            Miles de músicos mejoraron su flujo de trabajo con nuestras herramientas.
            <strong> Totalmente gratuito, sin límites.</strong>
          </p>
        </div>
        
        <div className="cta-actions">
          <button className="cta-button primary">
            <BsMusicNoteBeamed /> Comenzar Gratis
          </button>
          <button className="cta-button secondary">
            <BsHeadphones /> Ver Demo
          </button>
        </div>
        
        <div className="cta-footer">
          <span className="cta-note">
            <BsStarFill /> Sin costo · Sin suscripciones · Siempre gratis
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainHomeTestimonials;