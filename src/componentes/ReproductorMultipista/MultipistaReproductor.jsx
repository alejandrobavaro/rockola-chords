// ============================================
// ARCHIVO: MultipistaReproductor.jsx
// DESCRIPCIÓN: Reproductor compacto para multipista
// ============================================

import React from "react";
import { 
  FiPlayCircle, 
  FiPauseCircle, 
  FiSkipForward, 
  FiSkipBack, 
  FiVolume2, 
  FiVolumeX,
  FiVolume1,
  FiDownload,
  FiLayers
} from "react-icons/fi";
import { useMultipistaContexto } from './MultipistaContexto';
import '../../assets/scss/_03-Componentes/ReproductorMultipista/_MultipistaReproductor.scss';

function MultipistaReproductor({ 
  cancionActual,
  isPlaying,
  metadatos,
  onPlay,
  onPause,
  onStop,
  onNext,
  onPrev
}) {
  const { volumeMaster, setVolumeMaster } = useMultipistaContexto();

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const descargarPistas = () => {
    if (!cancionActual) {
      alert('No hay canción para descargar');
      return;
    }
    alert('Descarga de pistas multipista en desarrollo');
  };

  return (
    <div className="reproductor-header-multipista">
      <div className="reproductor-contenido-multipista">
        
        {/* CONTROLES IZQUIERDOS - COMPACTOS */}
        <div className="reproductor-controls-left-multipista">
          <button 
            className="control-btn-multipista control-prev-multipista"
            onClick={onPrev}
            disabled={!cancionActual}
            title="Anterior"
          >
            <FiSkipBack />
          </button>
          
          <button 
            className="control-btn-multipista control-play-multipista"
            onClick={isPlaying ? onPause : onPlay}
            disabled={!cancionActual}
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <FiPauseCircle /> : <FiPlayCircle />}
          </button>
          
          <button 
            className="control-btn-multipista control-next-multipista"
            onClick={onNext}
            disabled={!cancionActual}
            title="Siguiente"
          >
            <FiSkipForward />
          </button>
        </div>

        {/* CENTRO - INFO CANCIÓN */}
        <div className="reproductor-info-centro-multipista">
          {cancionActual ? (
            <>
              <div className="info-titulo-multipista">{cancionActual.title}</div>
              <div className="info-artista-multipista">
                <FiLayers className="icono-multipista" />
                {cancionActual.artist}
                {metadatos.bpm && (
                  <span className="info-bpm-multipista"> • {metadatos.bpm} BPM</span>
                )}
              </div>
            </>
          ) : (
            <div className="info-sin-cancion">
              <FiLayers className="icono-multipista" />
              <span>Selecciona una pista multipista</span>
            </div>
          )}
        </div>

        {/* CONTROLES DERECHOS - COMPACTOS */}
        <div className="reproductor-controls-right-multipista">
          {/* VOLUMEN */}
          <div className="volumen-control-multipista">
            <button 
              className="control-btn-mini control-vol-mini"
              onClick={() => setVolumeMaster(volumeMaster === 0 ? 0.8 : 0)}
              title={volumeMaster === 0 ? "Activar sonido" : "Silenciar"}
            >
              {volumeMaster === 0 ? <FiVolumeX /> : 
               volumeMaster < 0.3 ? <FiVolume1 /> : <FiVolume2 />}
            </button>
            
            <div className="volumen-slider-container-mini">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volumeMaster}
                onChange={(e) => setVolumeMaster(parseFloat(e.target.value))}
                className="volumen-slider-mini"
                title="Volumen maestro"
              />
            </div>
            <span className="volumen-porcentaje-mini">
              {Math.round(volumeMaster * 100)}%
            </span>
          </div>
          
          {/* DESCARGAR */}
          <button 
            className="control-btn-mini control-download-mini"
            onClick={descargarPistas}
            disabled={!cancionActual}
            title="Descargar pistas"
          >
            <FiDownload />
          </button>
        </div>

      </div>
    </div>
  );
}

export default MultipistaReproductor;