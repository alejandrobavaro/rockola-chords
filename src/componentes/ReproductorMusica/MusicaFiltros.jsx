// ============================================
// ARCHIVO: MusicaFiltros.jsx - VERSIÓN 5 CATEGORÍAS - CORREGIDA
// DESCRIPCIÓN: Filtros para las 5 categorías musicales - MOSTRAR TODOS LOS HOMENAJES
// CORRECCIÓN: Mostrar todos los homenajes como bloques separados en el filtro
// ============================================

import React, { useState, useEffect } from 'react';
import { 
  BsFilter, 
  BsSearch, 
  BsMusicNoteBeamed, 
  BsCollectionPlay,
  BsMic,
  BsGuitar,
  BsVinyl,
  BsStar,
  BsKeyboard,
  BsGrid3x3Gap
} from 'react-icons/bs';
import './MusicaFiltros.scss';

const MusicaFiltros = ({ 
  categoria, 
  setCategoria,
  bloqueActual,
  setBloqueActual,
  bloques,
  searchQuery,
  setSearchQuery,
  loading 
}) => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [homenajesExpandidos, setHomenajesExpandidos] = useState(false);
  
  // ICONOS POR CATEGORÍA (5 CATEGORÍAS)
  const getIconoCategoria = (cat) => {
    const iconos = {
      'original': <BsMic />,
      'covers': <BsGuitar />, 
      'medleys': <BsVinyl />,
      'homenajes': <BsStar />,
      'zapadas': <BsKeyboard />
    };
    return iconos[cat] || <BsMusicNoteBeamed />;
  };
  
  // NOMBRES DE CATEGORÍA
  const getNombreCategoria = (cat) => {
    const nombres = {
      'original': 'Original',
      'covers': 'Covers',
      'medleys': 'Medleys',
      'homenajes': 'Homenajes',
      'zapadas': 'Zapadas'
    };
    return nombres[cat] || cat;
  };
  
  // DESCRIPCIÓN DE CATEGORÍA
  const getDescripcionCategoria = (cat) => {
    const descripciones = {
      'original': 'Música Original',
      'covers': 'Covers Versionados',
      'medleys': 'Canciones Enganchadas',
      'homenajes': 'Tributos Musicales',
      'zapadas': 'Sesiones Espontáneas'
    };
    return descripciones[cat] || '';
  };

  // TÍTULO PARA EL SELECTOR DE BLOQUE
  const getTituloBloques = (cat) => {
    const titulos = {
      'original': 'Seleccionar Disco',
      'covers': 'Seleccionar Género',
      'medleys': 'Seleccionar Medley',
      'homenajes': 'Seleccionar Artista',
      'zapadas': 'Seleccionar Estilo'
    };
    return titulos[cat] || 'Seleccionar';
  };

  // FUNCIÓN PARA MOSTRAR TODOS LOS BLOQUES DE HOMENAJES
  const renderBloquesHomenajes = () => {
    if (categoria !== 'homenajes' || !bloques.homenajes) return null;
    
    const bloquesHomenajes = Object.entries(bloques.homenajes);
    
    // Si hay muchos homenajes, mostrar botón para expandir/contraer
    const mostrarExpandir = bloquesHomenajes.length > 8;
    
    return (
      <div className="bloques-seccion homenajes-especial">
        <div className="homenajes-header">
          <h3 className="filtros-titulo">
            <BsStar />
            <span>Seleccionar Artista Homenajeado</span>
            <span className="homenajes-cantidad">
              ({bloquesHomenajes.length} artistas)
            </span>
          </h3>
          
          {mostrarExpandir && (
            <button 
              className="expandir-homenajes-btn"
              onClick={() => setHomenajesExpandidos(!homenajesExpandidos)}
              title={homenajesExpandidos ? "Contraer lista" : "Ver todos los homenajes"}
            >
              <BsGrid3x3Gap />
              <span>{homenajesExpandidos ? "Ver menos" : "Ver todos"}</span>
            </button>
          )}
        </div>
        
        <div className={`bloques-grid homenajes-grid ${homenajesExpandidos ? 'expandido' : ''}`}>
          {bloquesHomenajes.map(([bloqueId, bloque], index) => {
            // Mostrar todos si está expandido, sino solo los primeros 8
            if (!homenajesExpandidos && index >= 8) return null;
            
            // Extraer nombre del artista del ID o nombre del bloque
            let nombreArtista = bloque.nombre;
            if (nombreArtista.includes('HOMENAJE A ')) {
              nombreArtista = nombreArtista.replace('HOMENAJE A ', '');
            }
            
            // Contar canciones
            const cantidadCanciones = bloque.canciones?.length || 0;
            
            return (
              <button
                key={bloqueId}
                className={`bloque-card homenaje-card ${bloqueActual === bloqueId ? 'bloque-activo' : ''}`}
                onClick={() => setBloqueActual(bloqueId)}
                title={`${nombreArtista} - ${cantidadCanciones} canciones`}
              >
                <div className="bloque-portada homenaje-portada">
                  <img 
                    src={bloque.portada || '/img/02-logos/logo-formateo-chords2.png'} 
                    alt={nombreArtista}
                    onError={(e) => {
                      e.target.src = '/img/02-logos/logo-formateo-chords2.png';
                    }}
                  />
                  <div className="homenaje-badge">
                    <BsStar />
                  </div>
                </div>
                <div className="bloque-info homenaje-info">
                  <h4>{nombreArtista}</h4>
                  <div className="bloque-meta">
                    <span className="bloque-canciones">
                      {cantidadCanciones} canción{cantidadCanciones !== 1 ? 'es' : ''}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Mensaje si hay más homenajes ocultos */}
        {!homenajesExpandidos && bloquesHomenajes.length > 8 && (
          <div className="homenajes-mas">
            <button 
              className="ver-mas-homenajes"
              onClick={() => setHomenajesExpandidos(true)}
            >
              <span>Ver {bloquesHomenajes.length - 8} homenajes más...</span>
            </button>
          </div>
        )}
        
        {/* SELECTOR DROPDOWN PARA MOBILE */}
        <div className="bloques-select-mobile">
          <select
            value={bloqueActual}
            onChange={(e) => setBloqueActual(e.target.value)}
            disabled={loading}
          >
            <option value="">Seleccionar artista...</option>
            {bloquesHomenajes.map(([bloqueId, bloque]) => {
              let nombreArtista = bloque.nombre;
              if (nombreArtista.includes('HOMENAJE A ')) {
                nombreArtista = nombreArtista.replace('HOMENAJE A ', '');
              }
              return (
                <option key={bloqueId} value={bloqueId}>
                  {nombreArtista} ({bloque.canciones?.length || 0})
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  };

  // RENDERIZAR BLOQUES NORMALES (para otras categorías)
  const renderBloquesNormales = () => {
    if (categoria === 'homenajes' || !bloques[categoria] || Object.keys(bloques[categoria]).length === 0) {
      return null;
    }
    
    return (
      <div className="bloques-seccion">
        <h3 className="filtros-titulo">
          <BsCollectionPlay />
          <span>{getTituloBloques(categoria)}</span>
        </h3>
        
        <div className="bloques-grid">
          {Object.entries(bloques[categoria]).map(([bloqueId, bloque]) => (
            <button
              key={bloqueId}
              className={`bloque-card ${bloqueActual === bloqueId ? 'bloque-activo' : ''}`}
              onClick={() => setBloqueActual(bloqueId)}
            >
              <div className="bloque-portada">
                <img 
                  src={bloque.portada || '/img/default-cover.png'} 
                  alt={bloque.nombre}
                  onError={(e) => {
                    e.target.src = '/img/default-cover.png';
                  }}
                />
              </div>
              <div className="bloque-info">
                <h4>{bloque.nombre}</h4>
                <div className="bloque-meta">
                  <span className="bloque-canciones">
                    {bloque.canciones?.length || 0} canciones
                  </span>
                  {bloque.genero && (
                    <span className="bloque-genero">{bloque.genero}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* SELECTOR DROPDOWN PARA MOBILE */}
        <div className="bloques-select-mobile">
          <select
            value={bloqueActual}
            onChange={(e) => setBloqueActual(e.target.value)}
            disabled={loading}
          >
            {Object.entries(bloques[categoria]).map(([bloqueId, bloque]) => (
              <option key={bloqueId} value={bloqueId}>
                {bloque.nombre} ({bloque.canciones?.length || 0})
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  // RESETEAR EXPANSIÓN AL CAMBIAR CATEGORÍA
  useEffect(() => {
    setHomenajesExpandidos(false);
  }, [categoria]);

  return (
    <div className="musica-filtros-container">
      
      {/* BOTÓN TOGGLE PARA MOBILE */}
      <button 
        className="filtros-toggle-mobile"
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
      >
        <BsFilter />
        <span>Filtros</span>
        <span className="filtros-badge">
          {bloques[categoria] ? Object.keys(bloques[categoria]).length : 0}
        </span>
      </button>
      
      {/* CONTENEDOR DE FILTROS */}
      <div className={`filtros-contenedor ${mostrarFiltros ? 'visible' : ''}`}>
        
        {/* ============================================
            SELECTOR DE CATEGORÍA (5 OPCIONES)
        ============================================ */}
        <div className="categorias-seccion">
          <h3 className="filtros-titulo">
            <BsMusicNoteBeamed />
            <span>Seleccionar Categoría</span>
          </h3>
          
          <div className="categorias-grid compacto">
            {['original', 'covers', 'medleys', 'homenajes', 'zapadas'].map(cat => {
              const cantidadBloques = bloques[cat] ? Object.keys(bloques[cat]).length : 0;
              
              return (
                <button
                  key={cat}
                  className={`categoria-card ${categoria === cat ? 'categoria-activa' : ''} ${cantidadBloques === 0 ? 'categoria-vacia' : ''}`}
                  onClick={() => {
                    setCategoria(cat);
                    setSearchQuery('');
                    // Resetear al primer bloque de la categoría
                    if (bloques[cat] && Object.keys(bloques[cat]).length > 0) {
                      const primerBloque = Object.keys(bloques[cat])[0];
                      setBloqueActual(primerBloque);
                    } else {
                      setBloqueActual('');
                    }
                  }}
                  title={`${getDescripcionCategoria(cat)} (${cantidadBloques} disponibles)`}
                  disabled={cantidadBloques === 0 && loading}
                >
                  <div className="categoria-icono">
                    {getIconoCategoria(cat)}
                  </div>
                  <div className="categoria-info">
                    <h4>{getNombreCategoria(cat)}</h4>
                    <p>{getDescripcionCategoria(cat)}</p>
                  </div>
                  <div className="categoria-badge">
                    {cantidadBloques > 0 ? cantidadBloques : '0'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* ============================================
            SELECTOR DE BLOQUE/DISCO
            - Para homenajes: diseño especial
            - Para otras categorías: diseño normal
        ============================================ */}
        {categoria === 'homenajes' ? renderBloquesHomenajes() : renderBloquesNormales()}
        
        {/* ============================================
            BUSCADOR COMPACTO
        ============================================ */}
        {(bloques[categoria] && Object.keys(bloques[categoria]).length > 0) && (
          <div className="buscador-seccion compacto">
            <div className="buscador-header">
              <h3 className="filtros-titulo compacto">
                <BsSearch />
                <span>Buscar Canción</span>
              </h3>
              
              {searchQuery && (
                <button 
                  className="buscador-limpiar-compacto"
                  onClick={() => setSearchQuery('')}
                  title="Limpiar búsqueda"
                >
                  ✕ Limpiar
                </button>
              )}
            </div>
            
            <div className="buscador-contenedor">
              <input
                type="text"
                className="buscador-input"
                placeholder={`Buscar en ${getNombreCategoria(categoria)}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loading}
              />
            </div>
            
            {searchQuery && (
              <div className="buscador-info compacto">
                <span>Buscando: "{searchQuery}"</span>
              </div>
            )}
          </div>
        )}
        
        {/* ============================================
            INFO DE CATEGORÍA ACTUAL
        ============================================ */}
        {bloques[categoria] && Object.keys(bloques[categoria]).length > 0 && (
          <div className="categoria-info-footer">
            <div className="categoria-stats">
              <span className="stat-item">
                <strong>{Object.keys(bloques[categoria]).length}</strong> {categoria === 'homenajes' ? 'artistas' : 'bloques'}
              </span>
              <span className="stat-divider">•</span>
              <span className="stat-item">
                <strong>
                  {Object.values(bloques[categoria]).reduce((total, bloque) => 
                    total + (bloque.canciones?.length || 0), 0)}
                </strong> canciones
              </span>
              {categoria === 'homenajes' && homenajesExpandidos && (
                <>
                  <span className="stat-divider">•</span>
                  <span className="stat-item">
                    <button 
                      className="contraer-btn"
                      onClick={() => setHomenajesExpandidos(false)}
                    >
                      <BsGrid3x3Gap /> Contraer
                    </button>
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        
      </div>
      
    </div>
  );
};

export default MusicaFiltros;