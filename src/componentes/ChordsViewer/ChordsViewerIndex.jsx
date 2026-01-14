// ============================================
// ARCHIVO: src/componentes/ChordsViewer/ChordsViewerIndex.jsx
// OBJETIVO: Componente principal con mejoras de formato y visualización
// MEJORAS: Acordes en azul, misma línea, controles visibles
// ============================================

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// ============================================
// ICONOS DE REACT ICONS
// ============================================
import {
  BsPrinter, BsDash, BsPlus, BsArrowCounterclockwise,
  BsZoomIn, BsZoomOut, BsImage, BsDownload,
  BsArrowUp, BsArrowDown,
  BsCheck, BsX,
  BsFileEarmarkPdf, BsFileText, BsMusicNoteBeamed,
  BsCardText, BsAspectRatio
} from "react-icons/bs";

// ============================================
// MODALES
// ============================================
import ChordImageModal from './ChordImageModal';

// ============================================
// LAYOUTS MEJORADOS
// ============================================
import ChordsVerticalA4 from './layouts/ChordsVerticalA4';
import ChordsHorizontalA4 from './layouts/ChordsHorizontalA4';

// ============================================
// UTILIDADES MEJORADAS
// ============================================
import {
  analizarContenidoCancion,
  normalizarDatosCancion,
  optimizarContenidoParaVisualizacion
} from './utils/chordsProcessor';

import {
  transponerContenidoCancion
} from './utils/chordsTransposer';

// ============================================
// ESTILOS SASS PRINCIPAL
// ============================================
import "../../assets/scss/_03-Componentes/ChordsViewer/_ChordsViewerIndex.scss";

// ============================================
// COMPONENTE PRINCIPAL: ChordsViewerIndex
// ============================================
const ChordsViewerIndex = ({
  chordsData = null,
  transpositionProp = 0,
  songMetadata = null
}) => {
  
  // ============================================
  // ESTADOS PRINCIPALES
  // ============================================
  const [song, setSong] = useState(null);
  const [transposition, setTransposition] = useState(transpositionProp);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modo, setModo] = useState('vertical');
  const [fontScale, setFontScale] = useState(1.0);
  const [showChordModal, setShowChordModal] = useState(false);
  const [selectedChord, setSelectedChord] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [forceCompact, setForceCompact] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [contentMetrics, setContentMetrics] = useState(null);
  const [necesitaCompactacion, setNecesitaCompactacion] = useState(false);
  const [showA4Outline, setShowA4Outline] = useState(false);
  const [contenidoOptimizado, setContenidoOptimizado] = useState(null);

  // ============================================
  // REFERENCIAS
  // ============================================
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const viewerRef = useRef(null);
  const chordsContainerRef = useRef(null);
  
  // ============================================
  // EFECTO: Procesar datos de canción con optimización
  // ============================================
  useEffect(() => {
    let isMounted = true;

    const procesarDatosCancion = async () => {
      try {
        if (!isMounted) return;
        
        setLoading(true);
        setError(null);
        
        if (!chordsData) {
          setSong(null);
          setContentMetrics(null);
          setContenidoOptimizado(null);
          setLoading(false);
          return;
        }

        // Normalizar datos
        const cancionNormalizada = normalizarDatosCancion(chordsData);
        
        if (!isMounted) return;
        
        // Analizar métricas
        const metricas = analizarContenidoCancion(cancionNormalizada);
        setContentMetrics(metricas);
        
        // Determinar si necesita compactación
        const lineasTotales = metricas.lineasTotales || 0;
        const necesitaCompactar = lineasTotales > (modo === 'vertical' ? 65 : 45);
        setNecesitaCompactacion(necesitaCompactar);
        
        // Optimizar contenido para visualización
        const contenidoOpt = optimizarContenidoParaVisualizacion(
          cancionNormalizada.contenido, 
          {
            modo: modo,
            forceCompact: forceCompact,
            lineasTotales: lineasTotales,
            necesitaCompactar: necesitaCompactar
          }
        );
        
        setContenidoOptimizado(contenidoOpt);
        
        // Calcular escala automática
        let escalaCalculada = 1.0;
        if (lineasTotales > 100) escalaCalculada = 0.75;
        else if (lineasTotales > 80) escalaCalculada = 0.8;
        else if (lineasTotales > 60) escalaCalculada = 0.85;
        else if (lineasTotales > 40) escalaCalculada = 0.9;
        else if (lineasTotales > 20) escalaCalculada = 0.95;
        else if (lineasTotales < 10) escalaCalculada = 1.1;
        
        // Aplicar escala inicial
        setFontScale(escalaCalculada);
        
        // Actualizar canción
        setSong({
          ...cancionNormalizada,
          contenido: contenidoOpt
        });
        
      } catch (err) {
        if (isMounted) {
          console.error('Error procesando canción:', err);
          setError(`Error al cargar la canción: ${err.message}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    procesarDatosCancion();
    
    return () => {
      isMounted = false;
    };
  }, [chordsData, songMetadata, modo, forceCompact]);

  // ============================================
  // EFECTO: Fullscreen
  // ============================================
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // ============================================
  // FUNCIONES DE MANEJO DE ACORDES
  // ============================================
  const handleChordClick = useCallback((chord) => {
    if (!chord || typeof chord !== 'string') return;
    
    const chordClean = chord.trim();
    if (!chordClean || chordClean === '' || 
        ['N.C.', '(E)', '-', '–', 'X', ' ', ''].includes(chordClean)) {
      return;
    }
    
    setSelectedChord(chordClean);
    setShowChordModal(true);
  }, []);

  // ============================================
  // FUNCIONES DE TRANSPOSICIÓN
  // ============================================
  const transposedContent = useMemo(() => {
    if (!song || !song.contenido || transposition === 0) return song?.contenido || [];
    
    try {
      return transponerContenidoCancion(song.contenido, transposition);
    } catch (error) {
      console.error('Error transponiendo:', error);
      return song.contenido;
    }
  }, [song, transposition]);

  const handleTransposeUp = useCallback(() => {
    setTransposition(prev => Math.min(6, prev + 1));
  }, []);

  const handleTransposeDown = useCallback(() => {
    setTransposition(prev => Math.max(-6, prev - 1));
  }, []);

  const handleResetTransposition = useCallback(() => {
    setTransposition(0);
  }, []);

  // ============================================
  // FUNCIONES DE ZOOM
  // ============================================
  const handleZoomIn = useCallback(() => {
    setFontScale(prev => Math.min(1.5, prev + 0.05));
  }, []);

  const handleZoomOut = useCallback(() => {
    setFontScale(prev => Math.max(0.5, prev - 0.05));
  }, []);

  const handleResetZoom = useCallback(() => {
    setFontScale(1.0);
  }, []);

  // ============================================
  // FUNCIONES DE EXPORTACIÓN
  // ============================================
  const captureScreenAsJPG = useCallback(async () => {
    if (!chordsContainerRef.current || !song) return;
    
    try {
      setExporting(true);
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(chordsContainerRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: modo === 'vertical' ? 794 : 1123,
        height: modo === 'vertical' ? 1123 : 794
      });
      
      const link = document.createElement('a');
      const fileName = `${song.artista || 'artista'}-${song.titulo || 'cancion'}`
        .replace(/\s+/g, '-')
        .toLowerCase();
      
      link.download = `${fileName}-${modo}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
      
    } catch (error) {
      console.error('Error capturando JPG:', error);
      alert('Error al capturar imagen.');
    } finally {
      setExporting(false);
    }
  }, [song, modo]);

  const handlePrint = useCallback(() => {
    if (!song) return;
    
    window.print();
  }, [song]);

  const exportAsText = useCallback(() => {
    if (!song || !transposedContent) return;
    
    try {
      setExporting(true);
      
      let texto = `[${song.artista || 'ARTISTA'} -- ${song.titulo || 'CANCIÓN'} -- TONO: ${song.tono || 'C'}]\n\n`;
      texto += '='.repeat(70) + '\n\n';
      
      transposedContent.forEach((seccion, idx) => {
        if (seccion.type === 'section' && seccion.name) {
          texto += `[${seccion.name.toUpperCase()}]\n`;
        }
        
        if (seccion.lines && Array.isArray(seccion.lines)) {
          seccion.lines.forEach(linea => {
            if (linea.type === 'chord' || linea.type === 'chords') {
              texto += `${Array.isArray(linea.content) ? linea.content.join('   ') : linea.content}\n`;
            } else if (linea.type === 'lyric') {
              texto += `${linea.content}\n`;
            }
          });
        }
        
        texto += '\n';
      });
      
      texto += '='.repeat(70) + '\n\n';
      texto += `Generado por ROCKOLA CANCIONEROS - Formato A4\n`;
      texto += `Fecha: ${new Date().toLocaleDateString()}\n`;
      
      const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      const fileName = `${song.artista || 'artista'}-${song.titulo || 'cancion'}`
        .replace(/\s+/g, '-')
        .toLowerCase();
      
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.txt`;
      link.click();
      URL.revokeObjectURL(link.href);
      
    } catch (error) {
      console.error('Error exportando texto:', error);
      alert('Error al exportar texto.');
    } finally {
      setExporting(false);
    }
  }, [song, transposedContent]);

  // ============================================
  // FUNCIONES DE INTERFAZ
  // ============================================
  const toggleFullscreen = useCallback(() => {
    if (!viewerRef.current) return;
    
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(err => {
        console.error(`Error al activar pantalla completa: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  const toggleForceCompact = useCallback(() => {
    setForceCompact(prev => !prev);
  }, []);

  const toggleA4Outline = useCallback(() => {
    setShowA4Outline(prev => !prev);
  }, []);

  const changeLayout = useCallback((layout) => {
    setModo(layout);
  }, []);

  // ============================================
  // RENDERIZADO DE CONTROLES MEJORADO
  // ============================================
  const renderDeviceControls = () => (
    <div className="device-controls">
      <button 
        className={`device-btn ${modo === 'vertical' ? 'active' : ''}`}
        onClick={() => changeLayout('vertical')}
        title="Vista vertical A4 (2 columnas)"
      >
        <span className="btn-text">Vertical</span>
        <span className="btn-subtext">(2 col)</span>
      </button>
      <button 
        className={`device-btn ${modo === 'horizontal' ? 'active' : ''}`}
        onClick={() => changeLayout('horizontal')}
        title="Vista horizontal A4 (3 columnas)"
      >
        <span className="btn-text">Horizontal</span>
        <span className="btn-subtext">(3 col)</span>
      </button>
    </div>
  );

  const renderTranspositionControls = () => (
    <div className="transposition-controls">
      <div className="control-group">
        <span className="control-label">Tono:</span>
        <button 
          onClick={handleTransposeDown}
          disabled={!song}
          title="Bajar semitono"
          className="control-btn"
        >
          <BsDash />
        </button>
        <span className="transposition-value">
          {transposition > 0 ? '+' : ''}{transposition}
        </span>
        <button 
          onClick={handleTransposeUp}
          disabled={!song}
          title="Subir semitono"
          className="control-btn"
        >
          <BsPlus />
        </button>
        <button 
          onClick={handleResetTransposition}
          disabled={!song || transposition === 0}
          title="Restaurar tono original"
          className="control-btn"
        >
          <BsArrowCounterclockwise />
        </button>
      </div>
    </div>
  );

  const renderZoomControls = () => (
    <div className="zoom-controls">
      <div className="control-group">
        <span className="control-label">Zoom:</span>
        <button 
          onClick={handleZoomOut}
          disabled={!song}
          title="Alejar (más contenido)"
          className="control-btn"
        >
          <BsZoomOut />
        </button>
        <span className="zoom-value">
          {Math.round(fontScale * 100)}%
        </span>
        <button 
          onClick={handleZoomIn}
          disabled={!song}
          title="Acercar (más legible)"
          className="control-btn"
        >
          <BsZoomIn />
        </button>
        <button 
          onClick={handleResetZoom}
          disabled={!song || fontScale === 1.0}
          title="Restaurar zoom"
          className="control-btn"
        >
          <BsArrowCounterclockwise />
        </button>
      </div>
    </div>
  );

  const renderExportControls = () => (
    <div className="export-controls">
      <div className="control-group">
        <span className="control-label">Exportar:</span>
        <button 
          onClick={captureScreenAsJPG}
          disabled={!song || exporting}
          title="Exportar como imagen JPG"
          className="control-btn"
        >
          <BsImage />
        </button>
        <button 
          onClick={exportAsText}
          disabled={!song || exporting}
          title="Exportar como texto"
          className="control-btn"
        >
          <BsFileText />
        </button>
        <button 
          onClick={handlePrint}
          disabled={!song || exporting}
          title="Imprimir"
          className="control-btn"
        >
          <BsPrinter />
        </button>
      </div>
    </div>
  );

  const renderUtilityControls = () => (
    <div className="utility-controls">
      <div className="control-group">
        <span className="control-label">Utilidades:</span>
        <button 
          className={`control-btn compact-btn ${forceCompact ? 'active' : ''}`}
          onClick={toggleForceCompact}
          disabled={!song}
          title={forceCompact ? "Compactación EXTREMA activada" : "Activar compactación EXTREMA"}
        >
          <BsCardText />
        </button>
        <button 
          className={`control-btn a4-btn ${showA4Outline ? 'active' : ''}`}
          onClick={toggleA4Outline}
          title={showA4Outline ? "Ocultar guía A4" : "Mostrar guía A4"}
        >
          <BsAspectRatio />
        </button>
        <button 
          className="control-btn fullscreen-btn"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
        >
          {isFullscreen ? <BsX /> : <BsArrowUp />}
        </button>
      </div>
    </div>
  );

  // ============================================
  // RENDERIZADO PRINCIPAL
  // ============================================
  if (loading) {
    return (
      <div className="chords-viewer-loading">
        <div className="loading-spinner">
          <BsMusicNoteBeamed className="spinner-icon" />
        </div>
        <p className="loading-text">Cargando acordes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chords-viewer-error">
        <div className="error-content">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
          <button 
            className="error-dismiss"
            onClick={() => setError(null)}
          >
            <BsX />
          </button>
        </div>
      </div>
    );
  }

  const contentStyle = {
    '--font-scale': fontScale,
    fontSize: `calc(14px * ${fontScale})`
  };

  return (
    <>
      <div 
        ref={viewerRef}
        className={`chords-viewer-container ${isFullscreen ? 'fullscreen' : ''} ${showA4Outline ? 'show-a4-outline' : ''}`}
        data-modo={modo}
      >
        {/* BARRA DE CONTROLES SUPERIOR - COMPACTA Y VISIBLE */}
        <div className="chords-controls-bar">
          <div className="controls-section">
            {renderDeviceControls()}
          </div>
          
          <div className="controls-section">
            {renderTranspositionControls()}
          </div>
          
          <div className="controls-section">
            {renderZoomControls()}
          </div>
          
          <div className="controls-section">
            {renderExportControls()}
          </div>
          
          <div className="controls-section">
            {renderUtilityControls()}
          </div>
          
          {necesitaCompactacion && (
            <div className="compact-warning">
              <span className="warning-icon">⚠️</span>
              <span className="warning-text">Compactado automático</span>
            </div>
          )}
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div 
          ref={contentRef}
          className="chords-viewer-content"
          style={contentStyle}
        >
          <div ref={chordsContainerRef} className="chords-container-wrapper">
            {/* TÍTULO DE LA CANCIÓN - COMPACTO */}
            {song && (
              <div className="song-title-header">
                <div className="song-title-content">
                  <span className="song-artist">{song.artista || 'Artista'}</span>
                  <span className="song-separator"> - </span>
                  <span className="song-title">{song.titulo || 'Canción'}</span>
                  <span className="song-key">
                    (TONO: {song.tono || 'C'})
                    {transposition !== 0 && (
                      <span className="song-transposition">
                        {transposition > 0 ? '+' : ''}{transposition}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            )}
            
            {/* CONTENIDO DE ACORDES */}
            <div className="chords-main-content">
              {song && (
                <>
                  {modo === 'vertical' ? (
                    <ChordsVerticalA4
                      contenido={transposedContent}
                      cancion={song}
                      onChordClick={handleChordClick}
                      transposicion={transposition}
                      compactado={forceCompact || necesitaCompactacion}
                      showA4Outline={showA4Outline}
                    />
                  ) : (
                    <ChordsHorizontalA4
                      contenido={transposedContent}
                      cancion={song}
                      onChordClick={handleChordClick}
                      transposicion={transposition}
                      compactado={forceCompact || necesitaCompactacion}
                      showA4Outline={showA4Outline}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER COMPACTO */}
        <div className="chords-viewer-footer">
          <div className="footer-status">
            <span className="layout-indicator">
              {modo === 'vertical' ? 'VERTICAL A4' : 'HORIZONTAL A4'}
            </span>
            <span className="status-separator"> • </span>
            <span className="zoom-indicator">
              {Math.round(fontScale * 100)}%
            </span>
            <span className="status-separator"> • </span>
            <span className="transposition-indicator">
              Tono: {transposition > 0 ? '+' : ''}{transposition}
            </span>
            {forceCompact && (
              <>
                <span className="status-separator"> • </span>
                <span className="compact-indicator">COMPACT</span>
              </>
            )}
          </div>
        </div>
        
        {exporting && (
          <div className="exporting-overlay">
            <div className="exporting-spinner"></div>
            <span className="exporting-text">Exportando...</span>
          </div>
        )}
      </div>

      {/* MODAL DE DIAGRAMA DE ACORDE */}
      <ChordImageModal 
        chord={selectedChord}
        isOpen={showChordModal}
        onClose={() => setShowChordModal(false)}
        transposition={transposition}
      />
    </>
  );
};

// ============================================
// EXPORT DEL COMPONENTE
// ============================================
export default ChordsViewerIndex;