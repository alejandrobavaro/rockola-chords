// ================================================
// ARCHIVO: MainHomeStatsSection.jsx - CON IMÁGENES REALES
// DESCRIPCIÓN: Sección de estadísticas con imágenes reales del proyecto
// ================================================

import React from 'react';
import { BsMusicNoteBeamed, BsCollection, BsPeople, BsStar, BsGraphUp } from 'react-icons/bs';
import '../assets/scss/_03-Componentes/_MainHomeStatsSection.scss';

// ================================================
// ARRAY DE IMÁGENES REALES PARA ESTADÍSTICAS
// ================================================
const realStatsImages = [
  "/img/03-img-cuadradas/tumblr_n2oiy58eyh1sp6e2vo1_400.webp",
  "/img/03-img-cuadradas/tvvieja.png",
  "/img/03-img-cuadradas/wp2729921.webp",
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
  "/img/03-img-cuadradas/tienda16-b.png"
];

// ================================================
// FUNCIÓN: OBTENER IMAGEN REAL ALEATORIA
// ================================================
const getRealStatsImage = () => {
  const randomIndex = Math.floor(Math.random() * realStatsImages.length);
  return {
    url: realStatsImages[randomIndex],
    style: {
      width: "100%",
      maxHeight: "120px",
      objectFit: "cover",
      borderRadius: "6px"
    }
  };
};

const MainHomeStatsSection = () => {
  
  // ================================================
  // ESTADÍSTICAS PRINCIPALES CON IMÁGENES REALES
  // ================================================
  const stats = [
    {
      id: 1,
      icon: <BsMusicNoteBeamed />,
      value: '500+',
      label: 'Canciones Disponibles',
      description: 'Acordes verificados por músicos',
      color: '#e63946',
      trend: '+25 este mes',
      image: getRealStatsImage()
    },
    {
      id: 2,
      icon: <BsCollection />,
      value: '5',
      label: 'Categorías Musicales',
      description: 'Original, Covers, Medleys, Homenajes, Zapadas',
      color: '#118ab2',
      trend: 'Completo',
      image: getRealStatsImage()
    },
    {
      id: 3,
      icon: <BsPeople />,
      value: '34',
      label: 'Artistas Homenajeados',
      description: 'Desde AC/DC hasta The Beatles',
      color: '#06d6a0',
      trend: '+3 nuevos',
      image: getRealStatsImage()
    },
    {
      id: 4,
      icon: <BsStar />,
      value: '17',
      label: 'Géneros de Zapadas',
      description: 'Rock, Blues, Jazz, Funk y más',
      color: '#7209b7',
      trend: 'Único',
      image: getRealStatsImage()
    }
  ];

  // ================================================
  // GÉNEROS MÁS POPULARES CON IMÁGENES REALES
  // ================================================
  const popularGenres = [
    { 
      name: 'Pop Rock', 
      count: 85, 
      color: '#e63946', 
      percent: 100,
      image: getRealStatsImage()
    },
    { 
      name: 'Baladas', 
      count: 72, 
      color: '#118ab2', 
      percent: 85,
      image: getRealStatsImage()
    },
    { 
      name: 'Hard Rock', 
      count: 63, 
      color: '#06d6a0', 
      percent: 74,
      image: getRealStatsImage()
    },
    { 
      name: 'Latino Bailable', 
      count: 58, 
      color: '#7209b7', 
      percent: 68,
      image: getRealStatsImage()
    },
    { 
      name: 'Reggae', 
      count: 42, 
      color: '#f15bb5', 
      percent: 49,
      image: getRealStatsImage()
    }
  ];

  // ================================================
  // ACTIVIDAD RECIENTE CON IMÁGENES REALES
  // ================================================
  const recentActivity = [
    { 
      text: 'Nuevo: Homenaje a Diego Torres', 
      date: 'Hace 2 días', 
      type: 'new',
      image: getRealStatsImage()
    },
    { 
      text: 'Actualizado: Visualizador de acordes', 
      date: 'Hace 1 semana', 
      type: 'update',
      image: getRealStatsImage()
    },
    { 
      text: '+15 canciones en Zapadas Rock', 
      date: 'Hace 2 semanas', 
      type: 'add',
      image: getRealStatsImage()
    }
  ];

  // ================================================
  // RENDER PRINCIPAL
  // ================================================
  return (
    <div className="main-home-stats-section">
      
      {/* ================================================
          ENCABEZADO DE LA SECCIÓN CON IMAGEN REAL
      ================================================ */}
      <div className="stats-header">
        
        {/* IMAGEN REAL DE FONDO PARA EL ENCABEZADO */}
        <div className="header-background-image">
          <img 
            src={getRealStatsImage().url} 
            alt="Estadísticas musicales"
            style={{
              width: '100%',
              maxHeight: '100px',
              objectFit: 'cover',
              opacity: 0.1,
              borderRadius: '4px',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1
            }}
            loading="lazy"
            aria-hidden="true"
          />
        </div>
        
        <h2 className="section-title">
          <BsGraphUp className="title-icon" />
          Nuestros Números Hablan
        </h2>
        <p className="section-subtitle">
          La plataforma más completa para músicos en español
        </p>
      </div>
      
      {/* ================================================
          ESTADÍSTICAS PRINCIPALES CON IMÁGENES REALES
      ================================================ */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card" style={{ borderTopColor: stat.color }}>
            
            {/* IMAGEN REAL DE LA ESTADÍSTICA */}
            <div className="stat-image">
              <img 
                src={stat.image.url} 
                alt={stat.label}
                style={{
                  width: '100%',
                  maxHeight: '80px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
                loading="lazy"
              />
            </div>
            
            <div className="stat-header">
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <span className="stat-trend">{stat.trend}</span>
            </div>
            
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-description">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* ================================================
          GÉNEROS POPULARES CON IMÁGENES REALES
      ================================================ */}
      <div className="genres-section">
        <h3 className="subsection-title">
          <BsStar className="subsection-icon" />
          Géneros Más Solicitados
        </h3>
        
        <div className="genres-list">
          {popularGenres.map((genre, index) => (
            <div key={index} className="genre-item">
              
              {/* IMAGEN REAL DEL GÉNERO */}
              <div className="genre-image">
                <img 
                  src={genre.image.url} 
                  alt={genre.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginRight: '15px',
                    border: `2px solid ${genre.color}`
                  }}
                  loading="lazy"
                />
              </div>
              
              <div className="genre-info">
                <span className="genre-name">{genre.name}</span>
                <span className="genre-count">{genre.count} canciones</span>
              </div>
              
              <div className="genre-bar-container">
                <div 
                  className="genre-bar" 
                  style={{ backgroundColor: `${genre.color}20` }}
                >
                  <div 
                    className="genre-fill" 
                    style={{ 
                      width: `${genre.percent}%`,
                      backgroundColor: genre.color
                    }}
                  />
                </div>
                <span className="genre-percent">{genre.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* ================================================
          ACTIVIDAD RECIENTE CON IMÁGENES REALES
      ================================================ */}
      <div className="activity-section">
        <h3 className="subsection-title">
          <BsCollection className="subsection-icon" />
          Novedades Recientes
        </h3>
        
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className={`activity-item ${activity.type}`}>
              
              {/* IMAGEN REAL DE LA ACTIVIDAD */}
              <div className="activity-image">
                <img 
                  src={activity.image.url} 
                  alt=""
                  style={{
                    width: '30px',
                    height: '30px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginRight: '10px'
                  }}
                  loading="lazy"
                />
              </div>
              
              <div className="activity-dot" style={{ 
                backgroundColor: activity.type === 'new' ? '#e63946' : 
                                activity.type === 'update' ? '#118ab2' : '#06d6a0' 
              }} />
              <div className="activity-content">
                <p className="activity-text">{activity.text}</p>
                <span className="activity-date">{activity.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* ================================================
          IMÁGENES REALES ADICIONALES PARA LA SECCIÓN
      ================================================ */}
      <div className="additional-stats-images">
        {Array.from({ length: 3 }).map((_, index) => {
          const img = getRealStatsImage();
          return (
            <div key={index} className="additional-image">
              <img 
                src={img.url} 
                alt={`Estadística adicional ${index + 1}`}
                style={{
                  ...img.style,
                  maxHeight: '100px'
                }}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      
      {/* ================================================
          LLAMADA A LA ACCIÓN CON IMAGEN REAL
      ================================================ */}
      <div className="stats-cta">
        
        {/* IMAGEN REAL DE FONDO PARA EL CTA */}
        <div className="cta-background-image">
          <img 
            src={getRealStatsImage().url} 
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0.1,
              borderRadius: '8px'
            }}
            loading="lazy"
            aria-hidden="true"
          />
        </div>
        
        <div className="cta-content">
          <h3 className="cta-title">¿Ya probaste nuestras <span className="highlight">Zapadas por género</span>?</h3>
          <p className="cta-text">
            Explora 17 géneros diferentes con canciones únicas y originales
          </p>
        </div>
        
        <div className="cta-actions">
          <a href="/musica?category=zapadas" className="cta-button primary">
            Explorar Zapadas
          </a>
          <a href="/musica" className="cta-button secondary">
            Ver Todo el Catálogo
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainHomeStatsSection;