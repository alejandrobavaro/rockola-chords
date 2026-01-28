// ================================================
// ARCHIVO: MainHomeContent.jsx - VERSIÓN COMPLETA CON IMÁGENES REALES
// DESCRIPCIÓN: Contenido principal de la página de inicio con imágenes reales
// IMÁGENES: Todas las imágenes de /public/img/03-img-cuadradas/
// ================================================

import React from "react";
import { Link } from "react-router-dom";
import { 
  BsMusicNoteBeamed, 
  BsFilm,
  BsPlayCircle,
  BsBook,
  BsGear,
  BsEnvelope,
  BsLightning,
  BsArrowRight,
  BsSearch,
  BsCollection,
  BsMicFill,        
  BsHeadphones,
  BsPersonCircle,   
  BsAward           
} from "react-icons/bs";

// Importar todos los nuevos componentes
import MainHomeHeroSlider from "./MainHomeHeroSlider";
import MainHomeStatsSection from "./MainHomeStatsSection";
import MainHomePopularSections from "./MainHomePopularSections";
import MainHomeFeaturesGrid from "./MainHomeFeaturesGrid";
import MainHomeTestimonials from "./MainHomeTestimonials";

// Importar estilos
import "../assets/scss/_03-Componentes/_MainHomeContent.scss";

// ================================================
// ARRAY DE IMÁGENES REALES DEL PROYECTO
// DESCRIPCIÓN: URLs reales de imágenes del directorio public
// ================================================
const realImages = [
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
  "/img/03-img-cuadradas/id1-c1.png",
  "/img/03-img-cuadradas/id2-c2.png",
  "/img/03-img-cuadradas/id3-c3.png",
  "/img/03-img-cuadradas/id4-c4.png",
  "/img/03-img-cuadradas/id5-c5.png",
  "/img/03-img-cuadradas/id6-c6.png",
  "/img/03-img-cuadradas/id7-c7.png",
  "/img/03-img-cuadradas/id8-c8.png",
  "/img/03-img-cuadradas/id9-c9.png",
  "/img/03-img-cuadradas/id10-c10.png",
  "/img/03-img-cuadradas/id11-c11.png",
  "/img/03-img-cuadradas/id12-c12.png",
  "/img/03-img-cuadradas/id13-c13.png",
  "/img/03-img-cuadradas/id14-c14.png",
  "/img/03-img-cuadradas/id15-c15.png",
  "/img/03-img-cuadradas/id16-c16.png",
  "/img/03-img-cuadradas/id17-c17.png",
  "/img/03-img-cuadradas/id18-c18.png",
  "/img/03-img-cuadradas/id19-c19.png",
  "/img/03-img-cuadradas/id20-c20.png",
  "/img/03-img-cuadradas/IMG_1212.JPG",
  "/img/03-img-cuadradas/IMG_1219.JPG",
  "/img/03-img-cuadradas/IMG_1221.JPG",
  "/img/03-img-cuadradas/IMG_1223.JPG",
  "/img/03-img-cuadradas/IMG_1224.JPG",
  "/img/03-img-cuadradas/Logo nuevo - ALMANGO POP COVERS 11.png.jpg",
  "/img/03-img-cuadradas/Logo nuevo - ALMANGO POP COVERS.png",
  "/img/03-img-cuadradas/Logo nuevo 2 - ALMANGO POP COVERS.png",
  "/img/03-img-cuadradas/Logo nuevo 3 - ALMANGO POP COVERS.png",
  "/img/03-img-cuadradas/Logo nuevo 4 - ALMANGO POP COVERS.png",
  "/img/03-img-cuadradas/tienda1-a.png",
  "/img/03-img-cuadradas/tienda1-b.png",
  "/img/03-img-cuadradas/tienda2-a.png",
  "/img/03-img-cuadradas/tienda2-b.png",
  "/img/03-img-cuadradas/tienda3-a.png",
  "/img/03-img-cuadradas/tienda3-b.png",
  "/img/03-img-cuadradas/tienda4-a.png",
  "/img/03-img-cuadradas/tienda4-b.png",
  "/img/03-img-cuadradas/tienda5-a.png",
  "/img/03-img-cuadradas/tienda5-b.png",
  "/img/03-img-cuadradas/tienda6-a.png",
  "/img/03-img-cuadradas/tienda6-b.png",
  "/img/03-img-cuadradas/tienda7-a.png",
  "/img/03-img-cuadradas/tienda7-b.png",
  "/img/03-img-cuadradas/tienda8-a.png",
  "/img/03-img-cuadradas/tienda8-b.png",
  "/img/03-img-cuadradas/tienda9-a.png",
  "/img/03-img-cuadradas/tienda9-b.png",
  "/img/03-img-cuadradas/tienda10-a.png",
  "/img/03-img-cuadradas/tienda10-b.png",
  "/img/03-img-cuadradas/tienda11-a.png",
  "/img/03-img-cuadradas/tienda11-b.png",
  "/img/03-img-cuadradas/tienda12-a.png",
  "/img/03-img-cuadradas/tienda12-b.png",
  "/img/03-img-cuadradas/tienda13-a.png",
  "/img/03-img-cuadradas/tienda13-b.png",
  "/img/03-img-cuadradas/tienda14-a.png",
  "/img/03-img-cuadradas/tienda14-b.png",
  "/img/03-img-cuadradas/tienda15-a.png",
  "/img/03-img-cuadradas/tienda15-b.png",
  "/img/03-img-cuadradas/tienda16-a.png",
  "/img/03-img-cuadradas/tienda16-b.png",
  "/img/03-img-cuadradas/tumblr_n2oiy58eyh1sp6e2vo1_400.webp",
  "/img/03-img-cuadradas/tvvieja.png",
  "/img/03-img-cuadradas/wp2729921.webp"
];

// ================================================
// FUNCIÓN: OBTENER IMAGEN ALEATORIA REAL
// DESCRIPCIÓN: Devuelve una URL aleatoria del array de imágenes reales
// ================================================
const getRandomRealImage = () => {
  const randomIndex = Math.floor(Math.random() * realImages.length);
  return {
    url: realImages[randomIndex],
    style: {
      maxWidth: "100%",
      maxHeight: "300px",
      objectFit: "cover",
      borderRadius: "8px",
      margin: "10px auto",
      display: "block"
    }
  };
};

const MainHomeContent = () => {
  
  // ================================================
  // ACCESOS DIRECTOS PRINCIPALES CON IMÁGENES REALES
  // ================================================
  const actionCards = [
    {
      title: "🎵 Música & Acordes",
      description: "Reproductor con visualizador de acordes inteligente",
      icon: <BsMusicNoteBeamed />,
      path: "/musica",
      color: "#e63946",
      primary: true,
      badge: "Popular",
      image: getRandomRealImage()
    },
    {
      title: "🎬 Videos Musicales",
      description: "Reproductor de video con lista de reproducción",
      icon: <BsFilm />,
      path: "/Videos",
      color: "#118ab2",
      badge: "Nuevo",
      image: getRandomRealImage()
    },
    {
      title: "🎚️ Reproductor Multipista",
      description: "Control individual de pistas de audio",
      icon: <BsHeadphones />,
      path: "/multipista",
      color: "#06d6a0",
      badge: "Avanzado",
      image: getRandomRealImage()
    },
    {
      title: "📚 Teoría Musical",
      description: "Recursos, tutoriales y formateo de partituras",
      icon: <BsBook />,
      path: "/formateo-chords",
      color: "#7209b7",
      badge: "Educativo",
      image: getRandomRealImage()
    },
    {
      title: "🛠️ Formateo Profesional",
      description: "Formatea e imprime partituras en A4",
      icon: <BsGear />,
      path: "/chords-format",
      color: "#f15bb5",
      badge: "Útil",
      image: getRandomRealImage()
    },
    {
      title: "📞 Contacto & Soporte",
      description: "Ayuda personalizada y consultas",
      icon: <BsEnvelope />,
      path: "/contacto",
      color: "#4cc9f0",
      badge: "Soporte",
      image: getRandomRealImage()
    }
  ];

  // ================================================
  // BÚSQUEDA RÁPIDA POR TIPO CON IMÁGENES REALES
  // ================================================
  const quickFilters = [
    { 
      type: "original", 
      label: "Música Original", 
      count: 120, 
      color: "#e63946", 
      icon: "🎤",
      image: getRandomRealImage()
    },
    { 
      type: "covers", 
      label: "Covers Versionados", 
      count: 250, 
      color: "#118ab2", 
      icon: "🎸",
      image: getRandomRealImage()
    },
    { 
      type: "homenajes", 
      label: "Homenajes", 
      count: 180, 
      color: "#ffd166", 
      icon: "👑",
      image: getRandomRealImage()
    },
    { 
      type: "zapadas", 
      label: "Zapadas", 
      count: 150, 
      color: "#06d6a0", 
      icon: "🎹",
      image: getRandomRealImage()
    },
    { 
      type: "medleys", 
      label: "Medleys", 
      count: 35, 
      color: "#7209b7", 
      icon: "🎶",
      image: getRandomRealImage()
    },
    { 
      type: "baladas", 
      label: "Baladas", 
      count: 72, 
      color: "#f15bb5", 
      icon: "💔",
      image: getRandomRealImage()
    }
  ];

  // ================================================
  // IMÁGENES ALEATORIAS PARA SECCIONES ESPECÍFICAS
  // ================================================
  const heroImages = [
    getRandomRealImage(),
    getRandomRealImage(),
    getRandomRealImage(),
    getRandomRealImage(),
    getRandomRealImage()
  ];

  const statsImages = [
    getRandomRealImage(),
    getRandomRealImage(),
    getRandomRealImage(),
    getRandomRealImage()
  ];

  const featureImages = [
    getRandomRealImage(),
    getRandomRealImage(),
    getRandomRealImage(),
    getRandomRealImage()
  ];

  // ================================================
  // RENDER PRINCIPAL
  // ================================================
  return (
    <div className="main-home-content">
      
      {/* ================================================
          HERO SECTION: SLIDER PRINCIPAL CON IMÁGENES
      ================================================ */}
      <section className="hero-section" aria-label="Presentación principal">
        <MainHomeHeroSlider />
        
        {/* IMÁGENES ADICIONALES ALEATORIAS */}
        <div className="hero-images-grid">
          {heroImages.map((img, index) => (
            <div key={index} className="hero-image-container">
              <img 
                src={img.url} 
                alt={`Música destacada ${index + 1}`}
                style={img.style}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
      
      {/* ================================================
          SECCIÓN: ACCESO RÁPIDO CON IMÁGENES
      ================================================ */}
      <section className="quick-access-section" aria-label="Acceso rápido a funcionalidades">
        <div className="section-header">
          <h2 className="section-title">
            <BsLightning className="title-icon" />
            Acceso Rápido a Todo
          </h2>
          <p className="section-subtitle">
            Todas las herramientas que necesitas, organizadas y listas para usar
          </p>
        </div>
        
        <div className="quick-access-grid">
          {actionCards.map((card, index) => (
            <Link 
              key={index} 
              to={card.path} 
              className={`access-card ${card.primary ? 'access-card-primary' : ''}`}
              style={{ 
                borderLeftColor: card.color,
                borderBottomColor: `${card.color}30`
              }}
              aria-label={`Ir a ${card.title} - ${card.description}`}
            >
              <div className="card-header">
                <div className="card-icon" style={{ color: card.color }}>
                  {card.icon}
                </div>
                {card.badge && (
                  <span 
                    className="card-badge"
                    style={{ 
                      backgroundColor: `${card.color}20`,
                      color: card.color
                    }}
                  >
                    {card.badge}
                  </span>
                )}
              </div>
              
              {/* IMAGEN ALEATORIA EN LA TARJETA */}
              <div className="card-image">
                <img 
                  src={card.image.url} 
                  alt={card.title}
                  style={card.image.style}
                  loading="lazy"
                />
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
              
              <div className="card-arrow">
                <BsArrowRight style={{ color: card.color }} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* ================================================
          SECCIÓN: ESTADÍSTICAS Y LOGROS CON IMÁGENES
      ================================================ */}
      <section className="stats-section" aria-label="Estadísticas del catálogo">
        <MainHomeStatsSection />
        
        {/* IMÁGENES ADICIONALES PARA ESTADÍSTICAS */}
        <div className="stats-images-grid">
          {statsImages.map((img, index) => (
            <div key={index} className="stats-image-item">
              <img 
                src={img.url} 
                alt={`Estadística visual ${index + 1}`}
                style={{
                  ...img.style,
                  maxHeight: "200px"
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
      
      {/* ================================================
          SECCIÓN: CONTENIDO POPULAR CON IMÁGENES
      ================================================ */}
      <section className="popular-section" aria-label="Contenido más popular">
        <MainHomePopularSections />
        
        {/* IMÁGENES ADICIONALES PARA CONTENIDO POPULAR */}
        <div className="popular-images-carousel">
          {Array.from({ length: 4 }).map((_, index) => {
            const img = getRandomRealImage();
            return (
              <div key={index} className="popular-image-slide">
                <img 
                  src={img.url} 
                  alt={`Contenido popular ${index + 1}`}
                  style={{
                    ...img.style,
                    maxHeight: "250px",
                    width: "100%"
                  }}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </section>
      
      {/* ================================================
          SECCIÓN: FUNCIONALIDADES CON IMÁGENES
      ================================================ */}
      <section className="features-section" aria-label="Funcionalidades destacadas">
        <MainHomeFeaturesGrid />
        
        {/* IMÁGENES ADICIONALES PARA FUNCIONALIDADES */}
        <div className="features-images-showcase">
          {featureImages.map((img, index) => (
            <div key={index} className="feature-image-box">
              <img 
                src={img.url} 
                alt={`Funcionalidad ${index + 1}`}
                style={{
                  ...img.style,
                  maxHeight: "180px"
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
      
      {/* ================================================
          SECCIÓN: TESTIMONIOS CON IMÁGENES
      ================================================ */}
      <section className="testimonials-section" aria-label="Testimonios de usuarios">
        <MainHomeTestimonials />
        
        {/* IMÁGENES DE FONDO PARA TESTIMONIOS */}
        <div className="testimonials-background-images">
          {Array.from({ length: 3 }).map((_, index) => {
            const img = getRandomRealImage();
            return (
              <div key={index} className="testimonial-bg-image">
                <img 
                  src={img.url} 
                  alt=""
                  style={{
                    ...img.style,
                    maxHeight: "150px",
                    opacity: 0.3
                  }}
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </section>
      
      {/* ================================================
          SECCIÓN: BÚSQUEDA RÁPIDA CON IMÁGENES
      ================================================ */}
      <section className="quick-search-section" aria-label="Búsqueda rápida por tipo">
        <div className="search-header">
          <h3 className="search-title">
            <BsSearch className="title-icon" />
            ¿Qué tipo de música buscas?
          </h3>
          <p className="search-subtitle">
            Filtra rápidamente por categoría y encuentra exactamente lo que necesitas
          </p>
        </div>
        
        <div className="filters-grid">
          {quickFilters.map((filter, index) => (
            <Link 
              key={index}
              to={`/musica?category=${filter.type}`}
              className="filter-chip"
              style={{ 
                backgroundColor: `${filter.color}15`,
                borderColor: `${filter.color}30`
              }}
            >
              <span className="filter-icon">{filter.icon}</span>
              <span className="filter-label">{filter.label}</span>
              
              {/* IMAGEN PEQUEÑA EN EL FILTRO */}
              <div className="filter-image">
                <img 
                  src={filter.image.url} 
                  alt={filter.label}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "8px"
                  }}
                  loading="lazy"
                />
              </div>
              
              <span 
                className="filter-count"
                style={{ backgroundColor: filter.color }}
              >
                {filter.count}
              </span>
            </Link>
          ))}
        </div>
      </section>
      
      {/* ================================================
          SECCIÓN: INFORMACIÓN FINAL CON IMÁGENES
      ================================================ */}
      <section className="final-info-section" aria-label="Información adicional">
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon" style={{ color: '#e63946' }}>
              <BsMicFill />
            </div>
            
            {/* IMAGEN PARA LA TARJETA DE INFORMACIÓN */}
            <div className="info-card-image">
              <img 
                src={getRandomRealImage().url} 
                alt="Para músicos reales"
                style={{
                  maxWidth: "100%",
                  maxHeight: "120px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  margin: "10px 0"
                }}
                loading="lazy"
              />
            </div>
            
            <h4>Para Músicos Reales</h4>
            <p>Diseñado por músicos, para músicos. Todas las herramientas que necesitas en ensayos y presentaciones en vivo.</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon" style={{ color: '#118ab2' }}>
              <BsCollection />
            </div>
            
            {/* IMAGEN PARA LA TARJETA DE INFORMACIÓN */}
            <div className="info-card-image">
              <img 
                src={getRandomRealImage().url} 
                alt="Catálogo en crecimiento"
                style={{
                  maxWidth: "100%",
                  maxHeight: "120px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  margin: "10px 0"
                }}
                loading="lazy"
              />
            </div>
            
            <h4>Catálogo en Crecimiento</h4>
            <p>Nuevas canciones y funcionalidades agregadas regularmente basadas en feedback de usuarios reales.</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon" style={{ color: '#06d6a0' }}>
              <BsPlayCircle />
            </div>
            
            {/* IMAGEN PARA LA TARJETA DE INFORMACIÓN */}
            <div className="info-card-image">
              <img 
                src={getRandomRealImage().url} 
                alt="Totalmente gratuito"
                style={{
                  maxWidth: "100%",
                  maxHeight: "120px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  margin: "10px 0"
                }}
                loading="lazy"
              />
            </div>
            
            <h4>Totalmente Gratuito</h4>
            <p>Accede a todas las funcionalidades sin costo. Creemos en herramientas accesibles para todos los músicos.</p>
          </div>
        </div>
        
        {/* IMÁGENES DE FONDO PARA LA LLAMADA A LA ACCIÓN */}
        <div className="cta-background-images">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="cta-bg-image">
              <img 
                src={getRandomRealImage().url} 
                alt=""
                style={{
                  maxWidth: "100%",
                  maxHeight: "100px",
                  objectFit: "cover",
                  opacity: 0.2,
                  borderRadius: "4px"
                }}
                loading="lazy"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
        
        {/* LLAMADA FINAL A LA ACCIÓN */}
        <div className="final-cta">
          <div className="cta-content">
            <h3>¿Listo para transformar tu práctica musical?</h3>
            <p>Únete a miles de músicos que ya confían en Rockola Cancioneros para sus necesidades musicales diarias.</p>
          </div>
          
          <div className="cta-actions">
            <Link to="/musica" className="cta-button primary">
              <BsMusicNoteBeamed /> Comenzar Gratis
            </Link>
            <Link to="/contacto" className="cta-button secondary">
              <BsEnvelope /> Contactar Soporte
            </Link>
            <Link to="/formateo-chords" className="cta-button outline">
              <BsBook /> Ver Tutoriales
            </Link>
          </div>
        </div>
      </section>
      
      {/* ================================================
          FOOTER DE LA PÁGINA DE INICIO CON IMAGENES
      ================================================ */}
      <footer className="home-footer">
        
        {/* IMÁGENES EN EL FOOTER */}
        <div className="footer-images">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="footer-image">
              <img 
                src={getRandomRealImage().url} 
                alt={`Música ${index + 1}`}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  margin: "0 5px"
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        <div className="footer-content">
          <p className="footer-text">
            <strong>Rockola Cancioneros</strong> - Herramientas profesionales para músicos
          </p>
          <p className="footer-subtext">
            500+ canciones • 5 categorías • 100% Gratuito • Actualizado constantemente
          </p>
        </div>
        
        <div className="footer-links">
          <Link to="/musica">Música</Link>
          <Link to="/Videos">Videos</Link>
          <Link to="/formateo-chords">Teoría</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/ayuda">Ayuda</Link>
        </div>
      </footer>
    </div>
  );
};

export default MainHomeContent;