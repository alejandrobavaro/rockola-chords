// ================================================
// ARCHIVO: MainHomePopularSections.jsx - CON IMÁGENES REALES
// DESCRIPCIÓN: Secciones populares con imágenes reales del proyecto
// ================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BsFire, 
  BsHeart, 
  BsLightning, 
  BsAward,     
  BsMusicNoteList,
  BsArrowRight,
  BsPlay,
  BsBookmark,
  BsGraphUp,
  BsStar,
  BsSearch
} from 'react-icons/bs';
import '../assets/scss/_03-Componentes/_MainHomePopularSections.scss';

// ================================================
// ARRAY DE IMÁGENES REALES PARA CONTENIDO POPULAR
// ================================================
const realPopularImages = [
  "/img/03-img-cuadradas/IMG_1212.JPG",
  "/img/03-img-cuadradas/IMG_1219.JPG",
  "/img/03-img-cuadradas/IMG_1221.JPG",
  "/img/03-img-cuadradas/IMG_1223.JPG",
  "/img/03-img-cuadradas/IMG_1224.JPG",
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
  "/img/03-img-cuadradas/tienda1-a.png",
  "/img/03-img-cuadradas/tienda1-b.png",
  "/img/03-img-cuadradas/tienda2-a.png",
  "/img/03-img-cuadradas/tienda2-b.png",
  "/img/03-img-cuadradas/tienda3-a.png",
  "/img/03-img-cuadradas/tienda3-b.png",
  "/img/03-img-cuadradas/tienda4-a.png",
  "/img/03-img-cuadradas/tienda4-b.png"
];

// ================================================
// FUNCIÓN: OBTENER IMAGEN REAL ALEATORIA
// ================================================
const getRealPopularImage = () => {
  const randomIndex = Math.floor(Math.random() * realPopularImages.length);
  return {
    url: realPopularImages[randomIndex],
    style: {
      width: "100%",
      maxHeight: "100px",
      objectFit: "cover",
      borderRadius: "6px"
    }
  };
};

const MainHomePopularSections = () => {
  
  // ================================================
  // DATOS: SECCIONES POPULARES CON IMÁGENES REALES
  // ================================================
  const popularSections = [
    {
      id: 1,
      title: '🔥 Más Buscadas',
      icon: <BsFire size={14} />,
      color: '#e63946',
      items: [
        { 
          name: 'Bohemian Rhapsody', 
          artist: 'Queen', 
          plays: '1.2k',
          image: getRealPopularImage()
        },
        { 
          name: 'Back in Black', 
          artist: 'AC/DC', 
          plays: '980',
          image: getRealPopularImage()
        },
        { 
          name: 'Let It Be', 
          artist: 'The Beatles', 
          plays: '850',
          image: getRealPopularImage()
        },
        { 
          name: 'Nadie Nos Va a Parar', 
          artist: 'Almango Pop', 
          plays: '720',
          image: getRealPopularImage()
        }
      ],
      link: '/musica?sort=popular',
      total: '45 canciones',
      sectionImage: getRealPopularImage()
    },
    {
      id: 2,
      title: '👑 Homenajes Top',
      icon: <BsAward size={14} />,
      color: '#ffd166',
      items: [
        { 
          name: 'Homenaje AC/DC', 
          artist: 'AC/DC', 
          badge: 'Nuevo',
          image: getRealPopularImage()
        },
        { 
          name: 'Homenaje Queen', 
          artist: 'Queen', 
          badge: 'Popular',
          image: getRealPopularImage()
        },
        { 
          name: 'Homenaje The Beatles', 
          artist: 'The Beatles', 
          badge: 'Clásico',
          image: getRealPopularImage()
        },
        { 
          name: 'Homenaje Guns N\' Roses', 
          artist: 'Guns N\' Roses', 
          badge: 'Rock',
          image: getRealPopularImage()
        }
      ],
      link: '/musica?category=homenajes',
      total: '180 canciones',
      sectionImage: getRealPopularImage()
    },
    {
      id: 3,
      title: '⚡ Zapadas por Género',
      icon: <BsLightning size={14} />,
      color: '#06d6a0',
      items: [
        { 
          name: 'Zapadas Rock', 
          genre: 'Rock', 
          badge: 'Más',
          image: getRealPopularImage()
        },
        { 
          name: 'Zapadas Blues', 
          genre: 'Blues', 
          badge: 'Nuevo',
          image: getRealPopularImage()
        },
        { 
          name: 'Zapadas Jazz', 
          genre: 'Jazz', 
          badge: 'Premium',
          image: getRealPopularImage()
        },
        { 
          name: 'Zapadas Funk', 
          genre: 'Funk', 
          badge: 'Hot',
          image: getRealPopularImage()
        }
      ],
      link: '/musica?category=zapadas',
      total: '150 canciones',
      sectionImage: getRealPopularImage()
    },
    {
      id: 4,
      title: '❤️ Favoritos',
      icon: <BsHeart size={14} />,
      color: '#f15bb5',
      items: [
        { 
          name: 'Con Vos Hasta la Luna', 
          artist: 'Almango Pop', 
          likes: '320', 
          badge: 'Top',
          image: getRealPopularImage()
        },
        { 
          name: 'Afloja', 
          artist: 'Ale Gondra', 
          likes: '280', 
          badge: 'Trend',
          image: getRealPopularImage()
        },
        { 
          name: 'Good Bye', 
          artist: 'Ale Gondra', 
          likes: '240', 
          badge: 'Fav',
          image: getRealPopularImage()
        },
        { 
          name: 'Fundidos in the Night', 
          artist: 'Almango Pop', 
          likes: '210', 
          badge: 'Hit',
          image: getRealPopularImage()
        }
      ],
      link: '/musica?sort=favorites',
      total: '85 canciones',
      sectionImage: getRealPopularImage()
    }
  ];

  // ================================================
  // DATOS: CATEGORÍAS RÁPIDAS CON IMÁGENES REALES
  // ================================================
  const quickCategories = [
    { 
      name: 'Original', 
      count: 120, 
      icon: '🎤', 
      link: '/musica?category=original', 
      color: '#e63946',
      image: getRealPopularImage()
    },
    { 
      name: 'Covers', 
      count: 250, 
      icon: '🎸', 
      link: '/musica?category=covers', 
      color: '#118ab2',
      image: getRealPopularImage()
    },
    { 
      name: 'Medleys', 
      count: 35, 
      icon: '🎶', 
      link: '/musica?category=medleys', 
      color: '#06d6a0',
      image: getRealPopularImage()
    },
    { 
      name: 'Homenajes', 
      count: 180, 
      icon: '👑', 
      link: '/musica?category=homenajes', 
      color: '#ffd166',
      image: getRealPopularImage()
    },
    { 
      name: 'Zapadas', 
      count: 150, 
      icon: '🎹', 
      link: '/musica?category=zapadas', 
      color: '#7209b7',
      image: getRealPopularImage()
    },
    { 
      name: 'Baladas', 
      count: 72, 
      icon: '💔', 
      link: '/musica?category=baladasespanol', 
      color: '#f15bb5',
      image: getRealPopularImage()
    },
    { 
      name: 'Rock', 
      count: 85, 
      icon: '🤘', 
      link: '/musica?category=poprockespanol', 
      color: '#4cc9f0',
      image: getRealPopularImage()
    },
    { 
      name: 'Latino', 
      count: 58, 
      icon: '🌴', 
      link: '/musica?category=latinobailableespanol', 
      color: '#9d4edd',
      image: getRealPopularImage()
    }
  ];

  // ================================================
  // DATOS: ARTISTAS DESTACADOS CON IMÁGENES REALES
  // ================================================
  const featuredArtists = [
    { 
      name: 'Almango Pop', 
      songs: 45, 
      type: 'Original', 
      color: '#e63946',
      image: getRealPopularImage()
    },
    { 
      name: 'Ale Gondra', 
      songs: 28, 
      type: 'Original', 
      color: '#118ab2',
      image: getRealPopularImage()
    },
    { 
      name: 'Queen', 
      songs: 32, 
      type: 'Homenaje', 
      color: '#06d6a0',
      image: getRealPopularImage()
    },
    { 
      name: 'AC/DC', 
      songs: 24, 
      type: 'Homenaje', 
      color: '#ffd166',
      image: getRealPopularImage()
    },
    { 
      name: 'The Beatles', 
      songs: 29, 
      type: 'Homenaje', 
      color: '#7209b7',
      image: getRealPopularImage()
    },
    { 
      name: 'Guns N\' Roses', 
      songs: 18, 
      type: 'Homenaje', 
      color: '#f15bb5',
      image: getRealPopularImage()
    }
  ];

  // ================================================
  // RENDER PRINCIPAL
  // ================================================
  return (
    <div className="main-home-popular-sections">
      
      {/* ================================================
          ENCABEZADO COMPACTO CON IMAGEN REAL
      ================================================ */}
      <div className="sections-header">
        <div className="header-content">
          <BsMusicNoteList className="title-icon" size={18} />
          <div className="header-text">
            <h2 className="section-title">Contenido Destacado</h2>
            <p className="section-subtitle">Lo más buscado por músicos</p>
          </div>
        </div>
        
        {/* IMAGEN REAL DEL ENCABEZADO */}
        <div className="header-image">
          <img 
            src={getRealPopularImage().url} 
            alt="Contenido destacado"
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginLeft: '10px'
            }}
            loading="lazy"
          />
        </div>
        
        <Link to="/musica" className="header-action">
          <BsSearch size={14} /> Ver todo
        </Link>
      </div>
      
      {/* ================================================
          GRID DE SECCIONES CON IMÁGENES REALES
      ================================================ */}
      <div className="sections-grid">
        {popularSections.map((section) => (
          <div key={section.id} className="section-card" style={{ borderLeftColor: section.color }}>
            
            {/* IMAGEN REAL DE LA SECCIÓN */}
            <div className="section-top-image">
              <img 
                src={section.sectionImage.url} 
                alt={section.title}
                style={{
                  width: '100%',
                  maxHeight: '80px',
                  objectFit: 'cover',
                  borderRadius: '4px 4px 0 0'
                }}
                loading="lazy"
              />
            </div>
            
            <div className="section-header">
              <div className="section-title-container">
                <div className="section-icon" style={{ color: section.color }}>
                  {section.icon}
                </div>
                <h3 className="section-title-small">{section.title}</h3>
              </div>
              <span className="section-total">{section.total}</span>
            </div>
            
            <div className="section-items">
              {section.items.map((item, index) => (
                <div key={index} className="section-item">
                  
                  {/* IMAGEN REAL DEL ÍTEM */}
                  <div className="item-image">
                    <img 
                      src={item.image.url} 
                      alt={item.name}
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
                  
                  <div className="item-main">
                    <span className="item-name">{item.name}</span>
                    {item.badge && (
                      <span className="item-badge" style={{ backgroundColor: section.color + '20', color: section.color }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="item-details">
                    {item.artist && (
                      <span className="item-artist">
                        <BsPlay size={10} /> {item.artist}
                      </span>
                    )}
                    {item.genre && (
                      <span className="item-genre">{item.genre}</span>
                    )}
                    {item.plays && (
                      <span className="item-plays">{item.plays} plays</span>
                    )}
                    {item.likes && (
                      <span className="item-likes">
                        <BsHeart size={10} /> {item.likes}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <Link to={section.link} className="section-link" style={{ color: section.color }}>
              Ver más <BsArrowRight size={12} />
            </Link>
          </div>
        ))}
      </div>
      
      {/* ================================================
          CATEGORÍAS RÁPIDAS CON IMÁGENES REALES
      ================================================ */}
      <div className="quick-categories-section">
        <div className="subsection-header">
          <BsGraphUp className="subsection-icon" size={16} />
          <h3 className="subsection-title">Acceso Rápido</h3>
        </div>
        
        <div className="categories-grid">
          {quickCategories.map((category, index) => (
            <Link 
              key={index} 
              to={category.link} 
              className="category-chip" 
              style={{ backgroundColor: category.color + '15' }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              
              {/* IMAGEN REAL DE LA CATEGORÍA */}
              <div className="category-image">
                <img 
                  src={category.image.url} 
                  alt={category.name}
                  style={{
                    width: '20px',
                    height: '20px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    margin: '0 5px'
                  }}
                  loading="lazy"
                />
              </div>
              
              <span className="category-count" style={{ backgroundColor: category.color }}>
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* ================================================
          ARTISTAS DESTACADOS CON IMÁGENES REALES
      ================================================ */}
      <div className="featured-artists-section">
        <div className="subsection-header">
          <BsAward className="subsection-icon" size={16} />
          <h3 className="subsection-title">Artistas Populares</h3>
        </div>
        
        <div className="artists-grid">
          {featuredArtists.map((artist, index) => (
            <Link 
              key={index} 
              to={`/musica?artist=${artist.name.toLowerCase().replace(/ /g, '-')}`} 
              className="artist-card" 
              style={{ borderColor: artist.color + '30' }}
            >
              
              {/* IMAGEN REAL DEL ARTISTA */}
              <div className="artist-image">
                <img 
                  src={artist.image.url} 
                  alt={artist.name}
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginRight: '10px',
                    border: `2px solid ${artist.color}`
                  }}
                  loading="lazy"
                />
              </div>
              
              <div className="artist-info">
                <h4 className="artist-name">{artist.name}</h4>
                <div className="artist-details">
                  <span className="artist-type">{artist.type}</span>
                  <span className="artist-songs">
                    <BsBookmark size={10} /> {artist.songs}
                  </span>
                </div>
              </div>
              
              <div className="artist-link" style={{ color: artist.color }}>
                <BsArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* ================================================
          BANNER PROMOCIONAL COMPACTO CON IMAGEN REAL
      ================================================ */}
      <div className="promo-banner">
        
        {/* IMAGEN REAL DE FONDO DEL BANNER */}
        <div className="promo-background">
          <img 
            src={getRealPopularImage().url} 
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
        
        <div className="promo-content">
          <h3 className="promo-title">🎵 ¿Buscas algo específico?</h3>
          <p className="promo-text">Encuentra exactamente lo que necesitas entre 500+ canciones</p>
        </div>
        
        <div className="promo-actions">
          <Link to="/musica" className="promo-button primary">
            <BsSearch size={14} /> Buscar Canciones
          </Link>
          <Link to="/musica?category=homenajes" className="promo-button secondary">
            <BsAward size={14} /> Ver Homenajes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHomePopularSections;