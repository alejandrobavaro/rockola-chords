// ================================================
// ARCHIVO: MainHomeFeaturesGrid.jsx - CON IMÁGENES REALES
// DESCRIPCIÓN: Grid de funcionalidades destacadas con imágenes reales
// ================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BsArrowsFullscreen, 
  BsPrinter, 
  BsDownload,
  BsSearch,
  BsTransparency,
  BsPhone,
  BsColumns,
  BsFileEarmarkText,
  BsMusicNoteBeamed,
  BsBook,
  BsClock,
  BsEye,
  BsPencil,
  BsCollection,
  BsStar,
  BsArrowRight
} from 'react-icons/bs';
import '../assets/scss/_03-Componentes/_MainHomeFeaturesGrid.scss';

// ================================================
// ARRAY DE IMÁGENES REALES PARA FUNCIONALIDADES
// ================================================
const realFeatureImages = [
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
  "/img/03-img-cuadradas/id15-c15.png"
];

// ================================================
// FUNCIÓN: OBTENER IMAGEN REAL ALEATORIA
// ================================================
const getRealFeatureImage = () => {
  const randomIndex = Math.floor(Math.random() * realFeatureImages.length);
  return {
    url: realFeatureImages[randomIndex],
    style: {
      width: "100%",
      maxHeight: "120px",
      objectFit: "cover",
      borderRadius: "6px",
      margin: "8px 0"
    }
  };
};

const MainHomeFeaturesGrid = () => {
  
  // ================================================
  // DATOS: FUNCIONALIDADES DESTACADAS CON IMÁGENES REALES
  // ================================================
  const features = [
    {
      id: 1,
      icon: <BsArrowsFullscreen size={16} />,
      title: 'Visualización Adaptativa',
      description: 'Se adapta automáticamente a cualquier dispositivo',
      color: '#e63946',
      link: '/musica',
      badge: 'Inteligente',
      image: getRealFeatureImage()
    },
    {
      id: 2,
      icon: <BsTransparency size={16} />,
      title: 'Transposición',
      description: 'Cambia el tono de los acordes con un clic',
      color: '#118ab2',
      link: '/musica',
      badge: 'Fácil',
      image: getRealFeatureImage()
    },
    {
      id: 3,
      icon: <BsPrinter size={16} />,
      title: 'Optimizado para Imprimir',
      description: 'Formato A4 profesional listo para imprimir',
      color: '#06d6a0',
      link: '/chords-format',
      badge: 'Práctico',
      image: getRealFeatureImage()
    },
    {
      id: 4,
      icon: <BsDownload size={16} />,
      title: 'Exportación Múltiple',
      description: 'Exporta a Word, PDF, JPG y texto',
      color: '#7209b7',
      link: '/chords-format',
      badge: 'Versátil',
      image: getRealFeatureImage()
    },
    {
      id: 5,
      icon: <BsSearch size={16} />,
      title: 'Búsqueda Global',
      description: 'Encuentra entre 500+ canciones rápidamente',
      color: '#f15bb5',
      link: '/musica',
      badge: 'Rápido',
      image: getRealFeatureImage()
    },
    {
      id: 6,
      icon: <BsPhone size={16} />,
      title: 'Responsive',
      description: 'Funciona perfecto en cualquier dispositivo',
      color: '#ffd166',
      link: '/musica',
      badge: 'Moderno',
      image: getRealFeatureImage()
    },
    {
      id: 7,
      icon: <BsColumns size={16} />,
      title: 'Vista Columnas',
      description: '1, 2 o 3 columnas según el dispositivo',
      color: '#4cc9f0',
      link: '/musica',
      badge: 'Flexible',
      image: getRealFeatureImage()
    },
    {
      id: 8,
      icon: <BsFileEarmarkText size={16} />,
      title: 'Editor Integrado',
      description: 'Abre y edita canciones directamente',
      color: '#9d4edd',
      link: '/chords-format',
      badge: 'Completo',
      image: getRealFeatureImage()
    },
    {
      id: 9,
      icon: <BsMusicNoteBeamed size={16} />,
      title: 'Reproductor Audio',
      description: 'Escucha mientras ves los acordes',
      color: '#e63946',
      link: '/musica',
      badge: 'Sincronizado',
      image: getRealFeatureImage()
    },
    {
      id: 10,
      icon: <BsBook size={16} />,
      title: 'Teoría Musical',
      description: 'Recursos y tutoriales integrados',
      color: '#118ab2',
      link: '/formateo-chords',
      badge: 'Educativo',
      image: getRealFeatureImage()
    },
    {
      id: 11,
      icon: <BsClock size={16} />,
      title: 'Metrónomo',
      description: 'Mantén el tempo perfecto',
      color: '#06d6a0',
      link: '/musica',
      badge: 'Preciso',
      image: getRealFeatureImage()
    },
    {
      id: 12,
      icon: <BsEye size={16} />,
      title: 'Modo Noche/Día',
      description: 'Adaptado a cualquier luz',
      color: '#7209b7',
      link: '/musica',
      badge: 'Cómodo',
      image: getRealFeatureImage()
    }
  ];

  // ================================================
  // DATOS: CASOS DE USO CON IMÁGENES REALES
  // ================================================
  const useCases = [
    {
      title: '🎸 Guitarristas',
      items: ['Acordes verificados', 'Posiciones de acordes', 'Capo automático', 'Tunning estándar'],
      image: getRealFeatureImage()
    },
    {
      title: '🎤 Cantantes',
      items: ['Letras sincronizadas', 'Tonos adecuados', 'Estructuras claras', 'Pistas de guía'],
      image: getRealFeatureImage()
    },
    {
      title: '🎹 Bandas',
      items: ['Setlists compartidos', 'Acordes unificados', 'Exportación grupal', 'Ensayos coordinados'],
      image: getRealFeatureImage()
    },
    {
      title: '📚 Profesores',
      items: ['Material imprimible', 'Ejercicios preparados', 'Progresión de alumnos', 'Recursos didácticos'],
      image: getRealFeatureImage()
    }
  ];

  // ================================================
  // RENDER PRINCIPAL
  // ================================================
  return (
    <div className="main-home-features-grid">
      
      {/* ================================================
          ENCABEZADO COMPACTO CON IMAGEN REAL
      ================================================ */}
      <div className="features-header">
        <div className="header-content">
          <BsStar className="title-icon" size={18} />
          <div className="header-text">
            <h2 className="section-title">Todo lo que Necesitas</h2>
            <p className="section-subtitle">Herramientas profesionales para músicos</p>
          </div>
        </div>
        
        {/* IMAGEN DE FONDO REAL PARA EL ENCABEZADO */}
        <div className="header-background-image">
          <img 
            src={getRealFeatureImage().url} 
            alt="Funcionalidades musicales"
            style={{
              width: "100%",
              maxHeight: "80px",
              objectFit: "cover",
              opacity: 0.1,
              borderRadius: "4px"
            }}
            loading="lazy"
            aria-hidden="true"
          />
        </div>
      </div>
      
      {/* ================================================
          GRID DE FUNCIONALIDADES CON IMÁGENES REALES
      ================================================ */}
      <div className="features-grid">
        {features.map((feature) => (
          <Link key={feature.id} to={feature.link} className="feature-card" style={{ borderLeftColor: feature.color }}>
            <div className="feature-header">
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <span className="feature-badge" style={{ backgroundColor: feature.color + '20', color: feature.color }}>
                {feature.badge}
              </span>
            </div>
            
            {/* IMAGEN REAL DE LA FUNCIONALIDAD */}
            <div className="feature-image">
              <img 
                src={feature.image.url} 
                alt={feature.title}
                style={feature.image.style}
                loading="lazy"
              />
            </div>
            
            <div className="feature-content">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
            
            <div className="feature-arrow">
              <BsArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>
      
      {/* ================================================
          CASOS DE USO COMPACTO CON IMÁGENES REALES
      ================================================ */}
      <div className="use-cases-section">
        <div className="subsection-header">
          <BsCollection className="subsection-icon" size={16} />
          <h3 className="subsection-title">Perfecto para Todos</h3>
        </div>
        
        <div className="use-cases-grid">
          {useCases.map((useCase, index) => (
            <div key={index} className="use-case-card">
              
              {/* IMAGEN REAL DEL CASO DE USO */}
              <div className="use-case-image">
                <img 
                  src={useCase.image.url} 
                  alt={useCase.title}
                  style={{
                    width: "100%",
                    maxHeight: "100px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginBottom: "10px"
                  }}
                  loading="lazy"
                />
              </div>
              
              <h4 className="use-case-title">{useCase.title}</h4>
              <ul className="use-case-list">
                {useCase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="use-case-item">
                    <BsStar size={10} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* ================================================
          COMPARATIVA COMPACTA CON IMÁGENES REALES
      ================================================ */}
      <div className="comparison-section">
        <div className="comparison-card success">
          <div className="comparison-header">
            <h4 className="comparison-title">Con Rockola</h4>
            <span className="comparison-badge">✅ Ventajas</span>
          </div>
          
          {/* IMAGEN REAL PARA VENTAJAS */}
          <div className="comparison-image">
            <img 
              src={getRealFeatureImage().url} 
              alt="Ventajas Rockola"
              style={{
                width: "100%",
                maxHeight: "80px",
                objectFit: "cover",
                borderRadius: "4px",
                margin: "8px 0"
              }}
              loading="lazy"
            />
          </div>
          
          <ul className="comparison-list">
            <li className="comparison-item">
              <BsStar size={12} /> Todo en un solo lugar
            </li>
            <li className="comparison-item">
              <BsStar size={12} /> Actualizaciones constantes
            </li>
            <li className="comparison-item">
              <BsStar size={12} /> Soporte técnico incluido
            </li>
            <li className="comparison-item">
              <BsStar size={12} /> 100% Gratuito siempre
            </li>
          </ul>
        </div>
        
        <div className="comparison-card warning">
          <div className="comparison-header">
            <h4 className="comparison-title">Métodos tradicionales</h4>
            <span className="comparison-badge">⚠️ Desventajas</span>
          </div>
          
          {/* IMAGEN REAL PARA DESVENTAJAS */}
          <div className="comparison-image">
            <img 
              src={getRealFeatureImage().url} 
              alt="Desventajas tradicionales"
              style={{
                width: "100%",
                maxHeight: "80px",
                objectFit: "cover",
                borderRadius: "4px",
                margin: "8px 0"
              }}
              loading="lazy"
            />
          </div>
          
          <ul className="comparison-list">
            <li className="comparison-item">
              <BsStar size={12} /> Múltiples apps necesarias
            </li>
            <li className="comparison-item">
              <BsStar size={12} /> Contenido desactualizado
            </li>
            <li className="comparison-item">
              <BsStar size={12} /> Sin soporte técnico
            </li>
            <li className="comparison-item">
              <BsStar size={12} /> Suscripciones costosas
            </li>
          </ul>
        </div>
      </div>
      
      {/* ================================================
          LLAMADA A LA ACCIÓN COMPACTO CON IMÁGENES REALES
      ================================================ */}
      <div className="final-cta">
        
        {/* IMÁGENES REALES DE FONDO PARA EL CTA */}
        <div className="cta-background-images">
          <img 
            src={getRealFeatureImage().url} 
            alt=""
            style={{
              width: "100%",
              maxHeight: "60px",
              objectFit: "cover",
              opacity: 0.1,
              borderRadius: "4px"
            }}
            loading="lazy"
            aria-hidden="true"
          />
        </div>
        
        <div className="cta-content">
          <h3 className="cta-title">¿Listo para mejorar tu práctica musical?</h3>
          <p className="cta-text">Únete a miles de músicos que ya usan Rockola Cancioneros</p>
        </div>
        
        <div className="cta-actions">
          <Link to="/musica" className="cta-button primary">
            <BsMusicNoteBeamed size={14} /> Comenzar Gratis
          </Link>
          <Link to="/formateo-chords" className="cta-button secondary">
            <BsBook size={14} /> Ver Tutoriales
          </Link>
        </div>
        
        <div className="cta-stats">
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Canciones</span>
          </div>
          <div className="stat">
            <span className="stat-number">5</span>
            <span className="stat-label">Categorías</span>
          </div>
          <div className="stat">
            <span className="stat-number">34</span>
            <span className="stat-label">Artistas</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Gratis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHomeFeaturesGrid;