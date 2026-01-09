// ============================================
// ARCHIVO: MultipistaCancionesLista.jsx
// DESCRIPCIÓN: Lista de canciones multipista
// ============================================

import React from 'react';
import { FiPlay, FiPause, FiMusic } from "react-icons/fi";
import '../../assets/scss/_03-Componentes/ReproductorMultipista/_MultipistaCancionesLista.scss';

const MultipistaCancionesLista = ({ 
  songs, 
  currentSong, 
  onSelectSong, 
  onViewDetails,
  compactView = false,
  mobileView = false 
}) => {
  
  const getIconoMultipista = (cancion) => {
    const pistasCount = cancion.pistas?.length || 0;
    if (pistasCount > 10) return '🎛️';
    if (pistasCount > 5) return '🎚️';
    return '🎵';
  };

  const getPistasInfo = (cancion) => {
    const pistasCount = cancion.pistas?.length || 0;
    const pistasActivas = cancion.pistas?.filter(p => p.activa).length || 0;
    
    if (pistasActivas === pistasCount) {
      return `${pistasCount}p`;
    } else {
      return `${pistasActivas}/${pistasCount}p`;
    }
  };

  return (
    <div className={`lista-canciones-multipista ${compactView ? 'compacta' : ''} ${mobileView ? 'mobile' : ''}`}>
      {songs.length === 0 ? (
        <div className="lista-vacia-multipista">
          <span className="icono-vacio"><FiMusic /></span>
          <p className="texto-vacio">No hay canciones multipista</p>
        </div>
      ) : (
        <ul className="lista-contenido-multipista">
          {songs.map((song, index) => {
            const isCurrent = currentSong?.id === song.id;
            
            return (
              <li 
                key={song.id} 
                className={`cancion-item-multipista ${isCurrent ? 'cancion-actual-multipista' : ''}`}
                onClick={() => onSelectSong(song)}
              >
                {/* Número de pista */}
                <div className="item-numero-multipista">
                  {isCurrent ? (
                    <span className="numero-reproduciendo">▶</span>
                  ) : (
                    <span className="numero-normal">{index + 1}</span>
                  )}
                </div>
                
                {/* Icono multipista */}
                <div className="item-icono-multipista">
                  <span className="icono">{getIconoMultipista(song)}</span>
                  <span className="contador-pistas">{getPistasInfo(song)}</span>
                </div>
                
                {/* Información principal */}
                <div className="item-info-multipista">
                  <div className="info-titulo" title={song.title}>{song.title}</div>
                  <div className="info-artista" title={song.artist}>{song.artist}</div>
                  {song.multipista_config?.bpm && (
                    <div className="info-metadatos">
                      <span className="metadato-bpm">{song.multipista_config.bpm} BPM</span>
                      <span className="metadato-tonalidad">{song.multipista_config.tonalidad}</span>
                    </div>
                  )}
                </div>
                
                {/* Duración */}
                <div className="item-duracion-multipista">{song.duration || '--:--'}</div>
                
                {/* Controles de acción */}
                <div className="item-controles-multipista">
                  <button 
                    className="control-btn control-select"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSong(song);
                    }}
                    title="Seleccionar canción"
                  >
                    {isCurrent ? <FiPause /> : <FiPlay />}
                  </button>
                  <button 
                    className="control-btn control-chords"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(song);
                    }}
                    title="Ver acordes"
                  >
                    🎵
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultipistaCancionesLista;