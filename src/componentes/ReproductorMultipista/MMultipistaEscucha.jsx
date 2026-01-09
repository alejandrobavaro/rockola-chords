// ============================================
// ARCHIVO: MMultipistaEscucha.jsx
// DESCRIPCIÓN: Componente principal del reproductor multipista
// BASADO EN: MMusicaEscucha.jsx con adaptaciones para multipista
// ============================================

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useMultipistaContexto } from './MultipistaContexto';
import MultipistaCancionesLista from './MultipistaCancionesLista';
import MultipistaReproductor from './MultipistaReproductor';
import ChordsViewerIndex from '../ChordsViewer/ChordsViewerIndex';
import { 
  FiMusic,
  FiPlayCircle,
  FiPauseCircle,
  FiVolume2,
  FiDownload,
  FiSkipForward,
  FiSkipBack,
  FiList,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiFilter,
  FiPlay,
  FiVolumeX,
  FiVolume1,
  FiVolume,
  FiStar,
  FiZap,
  FiLayers,
  FiSliders,
  FiGrid,
  FiMic,
  FiMicOff
} from "react-icons/fi";
import '../../assets/scss/_03-Componentes/ReproductorMultipista/_MMultipistaEscucha.scss';

// ============================================
// COMPONENTE ERROR BOUNDARY
// ============================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ Error capturado en ErrorBoundary:', error);
    console.error('📋 Información del error:', errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <div className="error-boundary-icon">⚠️</div>
            <h2 className="error-boundary-title">¡Ups! Algo salió mal</h2>
            <p className="error-boundary-message">
              Se produjo un error al cargar el reproductor multipista.
            </p>
            <div className="error-boundary-actions">
              <button 
                className="error-boundary-btn error-boundary-btn-primary"
                onClick={this.handleReload}
              >
                Recargar página completa
              </button>
              <button 
                className="error-boundary-btn error-boundary-btn-secondary"
                onClick={this.handleReset}
              >
                Intentar nuevamente
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================
// COMPONENTE DE IMAGEN SEGURO
// ============================================
const SafeImage = memo(({ src, alt, className, fallbackSrc, onError, onLoad }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = (e) => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    } else if (onError) {
      onError(e);
    }
  };

  const handleLoad = (e) => {
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
      decoding="async"
    />
  );
});

SafeImage.displayName = 'SafeImage';

// ============================================
// COMPONENTE PRINCIPAL MMultipistaEscucha
// ============================================
const MMultipistaEscucha = () => {
  // ============================================
  // CONTEXTO MULTIPISTA
  // ============================================
  const { 
    canciones,
    cancionActual,
    pistas, 
    isPlaying, 
    metadatos, 
    loading,
    error,
    cambiarCancion,
    playAll, 
    pauseAll, 
    stopAll,
    volumeMaster, 
    setVolumeMaster,
    activarTodasPistas,
    desactivarTodasPistas,
    silenciarTodasPistas,
    activarSoloTodasPistas,
    resetMezcla,
    togglePista,
    toggleSoloPista,
    toggleMutePista,
    updateVolumenPista,
    updatePanPista,
    getEstadoMezcla
  } = useMultipistaContexto();

  // ============================================
  // ESTADOS PRINCIPALES
  // ============================================
  const [cancionesFiltradas, setCancionesFiltradas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cancionConChords, setCancionConChords] = useState(null);
  const [datosChords, setDatosChords] = useState(null);
  const [mostrarListaMobile, setMostrarListaMobile] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [autoExpandChords, setAutoExpandChords] = useState(true);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [mostrarPanelPistas, setMostrarPanelPistas] = useState(true);
  const [modoVisualizacion, setModoVisualizacion] = useState('mezcla'); // 'mezcla' o 'chords'
  const [mostrarControlesAvanzados, setMostrarControlesAvanzados] = useState(false);

  // ============================================
  // REFERENCIAS
  // ============================================
  const chordsContainerRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeSliderRef = useRef(null);

  // ============================================
  // EFECTO: Filtrar canciones
  // ============================================
  useEffect(() => {
    let isMounted = true;
    let timeoutId;
    
    const actualizarCanciones = () => {
      if (!canciones || !isMounted) return;
      
      let cancionesFilt = [...canciones];
      
      // Aplicar filtro de búsqueda
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        cancionesFilt = cancionesFilt.filter(c => {
          const nombre = (c.title || '').toLowerCase();
          const artista = (c.artist || '').toLowerCase();
          const album = (c.disco || '').toLowerCase();
          
          return nombre.includes(query) || 
                 artista.includes(query) ||
                 album.includes(query);
        });
      }
      
      if (isMounted) {
        requestAnimationFrame(() => {
          if (isMounted) {
            setCancionesFiltradas(cancionesFilt);
          }
        });
      }
    };
    
    timeoutId = setTimeout(actualizarCanciones, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [canciones, searchQuery]);

  // ============================================
  // FUNCIÓN: cargarChords
  // ============================================
  const cargarChords = async (cancion) => {
    console.log('🎵 Cargando chords para:', cancion.title);
    
    setCancionConChords(cancion);
    
    if (cancion.chords_url) {
      try {
        const response = await fetch(cancion.chords_url);
        if (response.ok) {
          const chordsData = await response.json();
          setDatosChords(chordsData);
        } else {
          crearChordsEjemplo(cancion);
        }
      } catch (error) {
        console.error('Error cargando chords:', error);
        crearChordsEjemplo(cancion);
      }
    } else {
      crearChordsEjemplo(cancion);
    }
  };

  // ============================================
  // FUNCIÓN: crearChordsEjemplo
  // ============================================
  const crearChordsEjemplo = (cancion) => {
    setDatosChords({
      id: `ejemplo-${Date.now()}`,
      title: cancion.title || "Canción Multipista",
      artist: cancion.artist || "AC/DC",
      originalKey: "B",
      tempo: "134",
      timeSignature: "4/4",
      esMedley: false,
      cancionesIncluidas: 1,
      content: [
        {
          type: "section",
          name: "MULTIPISTA",
          lines: [
            { type: "chords", content: ["B", "E", "F#", "B"] }
          ]
        },
        {
          type: "divider"
        },
        {
          type: "section",
          name: "ACORDES PRINCIPALES",
          lines: [
            { type: "chord", content: "B" },
            { type: "lyric", content: "Thunder!" },
            { type: "chord", content: "E" },
            { type: "lyric", content: "I was caught" },
            { type: "chord", content: "F#" },
            { type: "lyric", content: "In the middle of a railroad track" },
            { type: "chord", content: "B" },
            { type: "lyric", content: "Thunderstruck!" }
          ]
        }
      ]
    });
  };

  // ============================================
  // FUNCIÓN: manejarSeleccionarCancion
  // ============================================
  const manejarSeleccionarCancion = useCallback((cancion) => {
    console.log('🎵 Seleccionando canción:', cancion.title);
    cambiarCancion(cancion.id);
    
    // Cargar chords automáticamente
    setTimeout(() => {
      cargarChords(cancion);
    }, 200);
  }, [cambiarCancion]);

  // ============================================
  // FUNCIONES DE UTILIDAD
  // ============================================
  const descargarCancion = () => {
    if (!cancionActual) {
      alert('No hay canción para descargar');
      return;
    }
    
    // Para multipista, podríamos crear un ZIP con todas las pistas
    alert('Función de descarga de pistas multipista en desarrollo');
  };

  const ajustarAlturaChords = () => {
    if (chordsContainerRef.current && datosChords) {
      const contentHeight = chordsContainerRef.current.scrollHeight;
      const windowHeight = window.innerHeight;
      const headerHeight = 120;
      
      let optimalHeight = Math.max(contentHeight + 50, 600);
      optimalHeight = Math.min(optimalHeight, windowHeight - headerHeight);
      
      chordsContainerRef.current.style.height = 'auto';
      chordsContainerRef.current.style.minHeight = `${optimalHeight}px`;
      chordsContainerRef.current.style.maxHeight = 'none';
    }
  };

  useEffect(() => {
    if (datosChords && autoExpandChords) {
      setTimeout(ajustarAlturaChords, 300);
    }
  }, [datosChords, autoExpandChords]);

  // ============================================
  // FUNCIÓN: Renderizar mensaje cuando no hay canciones
  // ============================================
  const renderMensajeSinCanciones = () => {
    if (loading) return null;
    
    if (error) {
      return (
        <div className="error-micro">
          <span className="error-icono">⚠️</span>
          <span className="error-texto">{error}</span>
          <button 
            onClick={() => window.location.reload()}
            className="btn-reintentar-micro"
          >
            Reintentar
          </button>
        </div>
      );
    }
    
    if (cancionesFiltradas.length === 0) {
      if (searchQuery) {
        return (
          <div className="sin-resultados-micro">
            <span className="sin-resultados-icono">🔍</span>
            <div className="sin-resultados-contenido">
              <p>No se encontraron canciones con "{searchQuery}"</p>
              <p className="sin-resultados-sugerencia">
                Intenta con otros términos o{' '}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="btn-limpiar-busqueda-micro"
                >
                  limpiar búsqueda
                </button>
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="sin-resultados-micro">
            <span className="sin-resultados-icono">
              <FiLayers />
            </span>
            <div className="sin-resultados-contenido">
              <p>No hay pistas multipista disponibles todavía</p>
            </div>
          </div>
        );
      }
    }
    
    return null;
  };

  // ============================================
  // RENDERIZADO COMPLETO
  // ============================================
  return (
    <div className="reproductor-multipista-estructura reproductor-independiente">
      
      {/* ============================================
      HEADER ULTRA COMPACTO MULTIPISTA
      ============================================ */}
      <div className="header-ultra-compacto-multipista">
        
        {/* IZQUIERDA: TÍTULO Y CONTROLES BÁSICOS */}
        <div className="reproductor-izquierda-compacto">
          <button 
            className="boton-control-micro boton-lista-toggle"
            onClick={() => setMostrarListaMobile(!mostrarListaMobile)}
            title={mostrarListaMobile ? "Ocultar lista" : "Mostrar lista"}
          >
            <FiList />
            <span className="contador-micro">{cancionesFiltradas.length}</span>
          </button>

          <button 
            className="boton-control-micro boton-pistas-toggle"
            onClick={() => setMostrarPanelPistas(!mostrarPanelPistas)}
            title={mostrarPanelPistas ? "Ocultar pistas" : "Mostrar pistas"}
          >
            <FiSliders />
          </button>

          {cancionActual && (
            <div className="info-cancion-micro">
              <SafeImage 
                src={metadatos.portada || '/img/02-logos/logo-formateo-chords2.png'} 
                fallbackSrc={'/img/02-logos/logo-formateo-chords2.png'}
                alt="Portada" 
                className="portada-micro"
              />
              <div className="detalles-micro">
                <div className="titulo-micro">{cancionActual.title}</div>
                <div className="artista-micro">{cancionActual.artist}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* CENTRO: BARRA DE PROGRESO INTERACTIVA COMPACTA */}
        <div className="reproductor-centro-compacto">
          <div className="tiempo-micro">
            <span className="tiempo-actual">0:00</span>
          </div>
          
          <div 
            className="barra-progreso-interactiva-micro"
            ref={progressBarRef}
            title="Progreso de reproducción"
          >
            <div className="barra-progreso-fondo-micro">
              <div 
                className="barra-progreso-relleno-micro"
                style={{ width: `0%` }}
              ></div>
            </div>
          </div>
          
          <div className="tiempo-micro">
            <span className="tiempo-total">{cancionActual?.duration || '4:52'}</span>
          </div>
        </div>
        
        {/* CONTROLES DE REPRODUCCIÓN COMPACTOS */}
        <div className="controles-reproduccion-micro independiente">
          <button 
            className="boton-control-micro boton-prev-micro"
            onClick={() => {
              const currentIndex = cancionesFiltradas.findIndex(c => c.id === cancionActual?.id);
              const prevIndex = currentIndex <= 0 ? cancionesFiltradas.length - 1 : currentIndex - 1;
              if (cancionesFiltradas[prevIndex]) {
                manejarSeleccionarCancion(cancionesFiltradas[prevIndex]);
              }
            }}
            disabled={!cancionActual || cancionesFiltradas.length === 0}
            title="Canción anterior"
          >
            <FiSkipBack />
          </button>
          
          <button 
            className="boton-control-micro boton-play-micro"
            onClick={() => isPlaying ? pauseAll() : playAll()}
            disabled={!cancionActual}
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <FiPauseCircle /> : <FiPlayCircle />}
          </button>
          
          <button 
            className="boton-control-micro boton-next-micro"
            onClick={() => {
              const currentIndex = cancionesFiltradas.findIndex(c => c.id === cancionActual?.id);
              const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % cancionesFiltradas.length;
              if (cancionesFiltradas[nextIndex]) {
                manejarSeleccionarCancion(cancionesFiltradas[nextIndex]);
              }
            }}
            disabled={!cancionActual || cancionesFiltradas.length === 0}
            title="Siguiente canción"
          >
            <FiSkipForward />
          </button>
        </div>

        {/* DERECHA: ACCIONES RÁPIDAS MULTIPISTA */}
        <div className="reproductor-derecha-compacto">
          <div className="volumen-contenedor-micro" ref={volumeSliderRef}>
            <button 
              className="boton-control-micro boton-volumen-micro"
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              title={volumeMaster === 0 ? "Activar sonido" : "Ajustar volumen"}
            >
              {volumeMaster === 0 ? <FiVolumeX /> : 
               volumeMaster < 0.3 ? <FiVolume1 /> : <FiVolume2 />}
            </button>
            
            {showVolumeSlider && (
              <div className="volumen-slider-micro">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volumeMaster}
                  onChange={(e) => setVolumeMaster(parseFloat(e.target.value))}
                  className="volumen-input-micro"
                  title={`Volumen maestro: ${Math.round(volumeMaster * 100)}%`}
                />
                <div className="volumen-porcentaje-micro">
                  {Math.round(volumeMaster * 100)}%
                </div>
              </div>
            )}
          </div>
          
          <button 
            className="boton-control-micro boton-descarga-micro"
            onClick={descargarCancion}
            disabled={!cancionActual}
            title="Descargar pistas"
          >
            <FiDownload />
          </button>
          
          <div className="contador-pistas-micro">
            <span className="contador-icono">🎚️</span>
            <span className="contador-numero">{pistas.length} Pistas</span>
          </div>
        </div>
      </div>

      {/* ============================================
      NAVEGACIÓN Y FILTROS COMPACTOS
      ============================================ */}
      <div className="controles-superiores-compactos">
        
        <button 
          className="toggle-filtros-mobile"
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          title={mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
        >
          <FiFilter />
          <span className="toggle-filtros-texto">Filtros</span>
          <span className="toggle-filtros-indicador">{mostrarFiltros ? '▲' : '▼'}</span>
        </button>

        <div className={`filtros-contenedor ${mostrarFiltros ? 'visible' : ''}`}>
          <div className="filtros-micro">
            <div className="filtros-contenedor-micro">
              
              <div className="buscador-con-icono buscador-enfocado">
                <FiSearch className="icono-busqueda" />
                <input
                  type="text"
                  className="filtro-busqueda-micro"
                  placeholder="Buscar pistas multipista..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Buscar canción"
                  disabled={loading}
                />
                {searchQuery && (
                  <button 
                    className="buscador-limpiar-micro"
                    onClick={() => setSearchQuery('')}
                    title="Limpiar búsqueda"
                  >
                    ✕
                  </button>
                )}
              </div>

              {cancionActual && (
                <>
                  <div className="filtro-divisor"></div>
                  
                  <div className="filtro-info-micro-contenedor">
                    <div className="filtro-info-micro">
                      <span className="filtro-actual-micro">
                        <span className="filtro-icono-micro">
                          <FiLayers />
                        </span>
                        <span className="filtro-nombre-micro">Multipista</span>
                        <span className="filtro-genero-micro">
                          <span className="separador-filtro-micro"> • </span>
                          {metadatos.artista}
                        </span>
                      </span>
                      
                      <span className="filtro-contador-micro">
                        <span className="contador-icono-micro">🎵</span>
                        <span className="contador-numero-micro">{cancionesFiltradas.length}</span>
                        <span className="contador-texto-micro">canciones</span>
                        {searchQuery && (
                          <span className="contador-filtrado-micro">
                            <span className="filtrado-icono-micro">🔍</span>
                            <span className="filtrado-texto-micro">filtradas</span>
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
      CONTENIDO PRINCIPAL MULTIPISTA
      ============================================ */}
      <div className="contenido-estructura-optimizada-multipista">
        
        {/* ESTRUCTURA DESKTOP */}
        <div className="estructura-desktop-multipista">
          
          {/* PANEL LADO IZQUIERDO: LISTA DE CANCIONES */}
          <div className={`panel-lista-multipista ${!mostrarPanelPistas ? 'panel-comprimido' : ''}`}>
            <div className="panel-header-micro">
              <h3 className="panel-titulo-micro">
                <span className="panel-categoria-micro">
                  <FiLayers /> Multipista
                </span>
                <span className="panel-contador-micro">{cancionesFiltradas.length}</span>
                <button 
                  className="panel-toggle-btn"
                  onClick={() => setMostrarPanelPistas(!mostrarPanelPistas)}
                  title={mostrarPanelPistas ? "Comprimir panel" : "Expandir panel"}
                >
                  {mostrarPanelPistas ? '«' : '»'}
                </button>
              </h3>
            </div>
            
            <div className="panel-contenido-lista-multipista">
              {loading ? (
                <div className="cargando-micro">
                  <div className="spinner-micro"></div>
                  <span>Cargando pistas multipista...</span>
                </div>
              ) : (
                <>
                  {renderMensajeSinCanciones()}
                  
                  {cancionesFiltradas.length > 0 && (
                    <div className="lista-canciones-con-scroll">
                      <div className="lista-canciones-multipista">
                        <MultipistaCancionesLista
                          songs={cancionesFiltradas}
                          currentSong={cancionActual}
                          onSelectSong={manejarSeleccionarCancion}
                          onViewDetails={cargarChords}
                          compactView={true}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* PANEL CENTRAL: PISTAS DE AUDIO O CHORDS */}
          <div className="panel-central-multipista">
            <div className="panel-switch-modo">
              <button 
                className={`modo-btn ${modoVisualizacion === 'mezcla' ? 'modo-activo' : ''}`}
                onClick={() => setModoVisualizacion('mezcla')}
              >
                <FiSliders /> Mezcla
              </button>
              <button 
                className={`modo-btn ${modoVisualizacion === 'chords' ? 'modo-activo' : ''}`}
                onClick={() => setModoVisualizacion('chords')}
              >
                <FiMusic /> Acordes
              </button>
            </div>

            {modoVisualizacion === 'mezcla' ? (
              <div className="panel-pistas-mezcla">
                {/* CONTROLES DE MEZCLA MASIVOS */}
                <div className="controles-mezcla-rapidos">
                  <button 
                    className="control-mezcla-rapido"
                    onClick={activarTodasPistas}
                    title="Activar todas las pistas"
                  >
                    <FiMic /> Todas
                  </button>
                  <button 
                    className="control-mezcla-rapido"
                    onClick={desactivarTodasPistas}
                    title="Desactivar todas las pistas"
                  >
                    <FiMicOff /> Ninguna
                  </button>
                  <button 
                    className="control-mezcla-rapido"
                    onClick={silenciarTodasPistas}
                    title="Silenciar todas las pistas"
                  >
                    🔇 Todas
                  </button>
                  <button 
                    className="control-mezcla-rapido"
                    onClick={activarSoloTodasPistas}
                    title="Quitar solo de todas"
                  >
                    ⭐ Limpiar
                  </button>
                  <button 
                    className="control-mezcla-rapido"
                    onClick={resetMezcla}
                    title="Resetear mezcla"
                  >
                    🔄 Reset
                  </button>
                </div>

                {/* LISTA DE PISTAS */}
                <div className="lista-pistas-detallada">
                  {pistas.map(pista => (
                    <div 
                      key={pista.id} 
                      className={`pista-item ${pista.activa ? 'pista-activa' : 'pista-inactiva'} ${pista.solo ? 'pista-solo' : ''} ${pista.mute ? 'pista-mute' : ''}`}
                    >
                      <div className="pista-info">
                        <div 
                          className="pista-color" 
                          style={{backgroundColor: pista.color}}
                        >
                          <span className="pista-icono">{pista.icono}</span>
                        </div>
                        <div className="pista-datos">
                          <div className="pista-nombre">{pista.nombre}</div>
                          <div className="pista-instrumento">{pista.instrumento}</div>
                        </div>
                      </div>
                      
                      <div className="pista-controles">
                        <button 
                          className={`pista-toggle ${pista.activa ? 'pista-on' : 'pista-off'}`}
                          onClick={() => togglePista(pista.id)}
                          title={pista.activa ? "Desactivar pista" : "Activar pista"}
                        >
                          {pista.activa ? '✓' : '✗'}
                        </button>
                        
                        <div className="pista-volumen">
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={pista.volumen * 100}
                            onChange={(e) => updateVolumenPista(pista.id, e.target.value / 100)}
                            className="pista-slider"
                            title={`Volumen: ${Math.round(pista.volumen * 100)}%`}
                          />
                          <span className="pista-porcentaje">{Math.round(pista.volumen * 100)}%</span>
                        </div>
                        
                        <div className="pista-pan">
                          <input 
                            type="range" 
                            min="-100" 
                            max="100" 
                            value={pista.pan * 100}
                            onChange={(e) => updatePanPista(pista.id, e.target.value / 100)}
                            className="pista-slider"
                            title={`Pan: ${Math.round(pista.pan * 100)}%`}
                          />
                          <span className="pista-pan-valor">
                            {pista.pan === 0 ? 'C' : pista.pan > 0 ? `R${Math.round(pista.pan * 100)}` : `L${Math.round(Math.abs(pista.pan) * 100)}`}
                          </span>
                        </div>
                        
                        <button 
                          className={`pista-solo-btn ${pista.solo ? 'solo-activo' : ''}`}
                          onClick={() => toggleSoloPista(pista.id)}
                          title={pista.solo ? "Quitar solo" : "Solo"}
                        >
                          S
                        </button>
                        
                        <button 
                          className={`pista-mute-btn ${pista.mute ? 'mute-activo' : ''}`}
                          onClick={() => toggleMutePista(pista.id)}
                          title={pista.mute ? "Quitar mute" : "Mute"}
                        >
                          M
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* INFO ESTADO DE MEZCLA */}
                <div className="estado-mezcla-panel">
                  <div className="estado-mezcla-item">
                    <span className="estado-icono">🎚️</span>
                    <span className="estado-texto">{getEstadoMezcla().pistasActivas}/{getEstadoMezcla().pistasTotales} activas</span>
                  </div>
                  <div className="estado-mezcla-item">
                    <span className="estado-icono">🔇</span>
                    <span className="estado-texto">{getEstadoMezcla().pistasMute} silenciadas</span>
                  </div>
                  <div className="estado-mezcla-item">
                    <span className="estado-icono">⭐</span>
                    <span className="estado-texto">{getEstadoMezcla().pistasSolo} en solo</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="panel-chords-multipista" ref={chordsContainerRef}>
                {datosChords ? (
                  <div className="chords-viewer-integrado-expandido">
                    <ChordsViewerIndex 
                      chordsData={datosChords}
                      songMetadata={{
                        coverImage: metadatos.portada,
                        album: cancionActual?.disco,
                        category: 'Multipista'
                      }}
                      compactMode="extreme"
                      autoExpand={autoExpandChords}
                    />
                  </div>
                ) : (
                  <div className="instrucciones-chords-multipista">
                    <div className="logo-titulo-micro">
                      <span className="icono-instrucciones"><FiLayers /></span>
                      <span className="titulo-instrucciones">Acordes Multipista</span>
                    </div>
                    <p className="descripcion-principal">
                      Selecciona una canción multipista para ver sus acordes
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PANEL LADO DERECHO: INFO DETALLADA */}
          <div className="panel-info-detallada-multipista">
            <div className="panel-header-micro">
              <h3 className="panel-titulo-micro">
                <span className="panel-categoria-micro">Info Canción</span>
              </h3>
            </div>
            
            <div className="panel-contenido-info">
              {cancionActual ? (
                <>
                  <div className="info-portada-grande">
                    <SafeImage 
                      src={metadatos.portada || '/img/02-logos/logo-formateo-chords2.png'} 
                      fallbackSrc={'/img/02-logos/logo-formateo-chords2.png'}
                      alt={cancionActual.title}
                      className="portada-info-grande"
                    />
                  </div>
                  
                  <div className="info-detalles-completos">
                    <h4 className="info-titulo-completo">{cancionActual.title}</h4>
                    <p className="info-artista-completo">{cancionActual.artist}</p>
                    
                    <div className="info-metadatos-grid">
                      {metadatos.bpm && (
                        <div className="metadato-item">
                          <span className="metadato-label">BPM:</span>
                          <span className="metadato-valor">{metadatos.bpm}</span>
                        </div>
                      )}
                      {metadatos.tonalidad && (
                        <div className="metadato-item">
                          <span className="metadato-label">Tonalidad:</span>
                          <span className="metadato-valor">{metadatos.tonalidad}</span>
                        </div>
                      )}
                      {metadatos.frecuencia && (
                        <div className="metadato-item">
                          <span className="metadato-label">Frecuencia:</span>
                          <span className="metadato-valor">{metadatos.frecuencia}</span>
                        </div>
                      )}
                      {metadatos.formato && (
                        <div className="metadato-item">
                          <span className="metadato-label">Formato:</span>
                          <span className="metadato-valor">{metadatos.formato}</span>
                        </div>
                      )}
                      {metadatos.muestreo && (
                        <div className="metadato-item">
                          <span className="metadato-label">Muestreo:</span>
                          <span className="metadato-valor">{metadatos.muestreo}</span>
                        </div>
                      )}
                      {metadatos.canales && (
                        <div className="metadato-item">
                          <span className="metadato-label">Canales:</span>
                          <span className="metadato-valor">{metadatos.canales}</span>
                        </div>
                      )}
                    </div>
                    
                    {cancionActual.details?.letra && (
                      <div className="info-letra-preview">
                        <h5 className="letra-titulo">Fragmento Letra:</h5>
                        <p className="letra-texto">{cancionActual.details.letra.split('\n')[0]}</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="sin-info-seleccionada">
                  <span className="icono-sin-info"><FiLayers /></span>
                  <p>Selecciona una canción multipista para ver información detallada</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ESTRUCTURA MOBILE COMPACTA */}
        <div className="estructura-mobile-multipita">
          <div className="mobile-toggle-lista">
            <button 
              className="toggle-btn-lista"
              onClick={() => setMostrarListaMobile(!mostrarListaMobile)}
              title={mostrarListaMobile ? "Ocultar lista" : "Mostrar lista"}
            >
              <FiList />
              <span>{mostrarListaMobile ? 'Ocultar lista' : 'Mostrar lista'}</span>
              <span className="contador-toggle">{cancionesFiltradas.length}</span>
            </button>
          </div>

          {mostrarListaMobile && (
            <div className="panel-mobile-lista-multipista">
              <div className="panel-header-micro">
                <h3 className="panel-titulo-micro">
                  <span className="panel-categoria-micro">Pistas Multipista</span>
                  <span className="panel-contador-micro">{cancionesFiltradas.length}</span>
                </h3>
              </div>
              
              <div className="panel-contenido-mobile-lista">
                {loading ? (
                  <div className="cargando-micro">
                    <div className="spinner-micro"></div>
                    <span>Cargando...</span>
                  </div>
                ) : error ? (
                  <div className="error-micro">
                    <span className="error-icono">⚠️</span>
                    <span className="error-texto">{error}</span>
                  </div>
                ) : (
                  <MultipistaCancionesLista
                    songs={cancionesFiltradas}
                    currentSong={cancionActual}
                    onSelectSong={manejarSeleccionarCancion}
                    onViewDetails={cargarChords}
                    mobileView={true}
                  />
                )}
              </div>
            </div>
          )}

          <div className="panel-mobile-reproductor-multipista">
            <MultipistaReproductor
              cancionActual={cancionActual}
              isPlaying={isPlaying}
              metadatos={metadatos}
              onPlay={() => playAll()}
              onPause={() => pauseAll()}
              onStop={() => stopAll()}
              onNext={() => {
                const currentIndex = cancionesFiltradas.findIndex(c => c.id === cancionActual?.id);
                const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % cancionesFiltradas.length;
                if (cancionesFiltradas[nextIndex]) {
                  manejarSeleccionarCancion(cancionesFiltradas[nextIndex]);
                }
              }}
              onPrev={() => {
                const currentIndex = cancionesFiltradas.findIndex(c => c.id === cancionActual?.id);
                const prevIndex = currentIndex <= 0 ? cancionesFiltradas.length - 1 : currentIndex - 1;
                if (cancionesFiltradas[prevIndex]) {
                  manejarSeleccionarCancion(cancionesFiltradas[prevIndex]);
                }
              }}
            />
          </div>

          <div className="panel-mobile-pistas">
            <div className="panel-header-micro">
              <h3 className="panel-titulo-micro">
                <span className="panel-categoria-micro">Control Pistas</span>
                <button 
                  className="btn-expand-mobile"
                  onClick={() => setMostrarControlesAvanzados(!mostrarControlesAvanzados)}
                  title={mostrarControlesAvanzados ? "Contraer" : "Expandir"}
                >
                  {mostrarControlesAvanzados ? '−' : '+'}
                </button>
              </h3>
            </div>
            
            <div className="panel-contenido-pistas-mobile">
              {pistas.map(pista => (
                <div 
                  key={pista.id} 
                  className={`pista-mobile-item ${pista.activa ? 'pista-activa' : ''}`}
                >
                  <div className="pista-mobile-info">
                    <div 
                      className="pista-mobile-color" 
                      style={{backgroundColor: pista.color}}
                    >
                      {pista.icono}
                    </div>
                    <span className="pista-mobile-nombre">{pista.nombre}</span>
                  </div>
                  <div className="pista-mobile-controles">
                    <button 
                      className={`pista-mobile-toggle ${pista.activa ? 'activo' : ''}`}
                      onClick={() => togglePista(pista.id)}
                    >
                      {pista.activa ? '✓' : '✗'}
                    </button>
                    <button 
                      className={`pista-mobile-mute ${pista.mute ? 'activo' : ''}`}
                      onClick={() => toggleMutePista(pista.id)}
                    >
                      {pista.mute ? '🔊' : '🔇'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// EXPORTACIÓN CON ERROR BOUNDARY
// ============================================
const MMultipistaEscuchaWithErrorBoundary = () => (
  <ErrorBoundary>
    <MMultipistaEscucha />
  </ErrorBoundary>
);

export default MMultipistaEscuchaWithErrorBoundary;