// ============================================
// ARCHIVO: ChordImageModal.jsx
// ============================================

import React, { useState, useEffect } from 'react';
import { BsX, BsDownload, BsArrowLeft, BsArrowRight } from 'react-icons/bs';


import "../../assets/scss/_03-Componentes/ChordsViewer/_ChordImageModal.scss";

const ChordImageModal = ({ chord, isOpen, onClose, transposition }) => {
  const [chordImages, setChordImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && chord) {
      loadChordImages(chord);
    }
  }, [isOpen, chord]);

  const loadChordImages = async (chordName) => {
    setLoading(true);
    try {
      // Normalizar nombre del acorde
      const normalizedChord = chordName
        .replace(/[^\w\#\s]/g, '')
        .replace(/\s+/g, '_')
        .toLowerCase();
      
      // Buscar imágenes en diferentes formatos
      const imageFormats = [
        `/img/chords/${normalizedChord}.jpg`,
        `/img/chords/${normalizedChord}.png`,
        `/img/chords/${normalizedChord}-diagram.jpg`,
        `/img/chords/${normalizedChord}_chord.jpg`,
        `/img/chords/default_chord.jpg`
      ];
      
      setChordImages(imageFormats);
      setCurrentImageIndex(0);
    } catch (error) {
      console.error('Error cargando imágenes de acordes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (chordImages[currentImageIndex]) {
      const link = document.createElement('a');
      link.href = chordImages[currentImageIndex];
      link.download = `acorde-${chord.toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev > 0 ? prev - 1 : chordImages.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev < chordImages.length - 1 ? prev + 1 : 0
    );
  };

  if (!isOpen) return null;
  
  return (
    <div className="chord-image-modal-overlay">
      <div className="chord-image-modal">
        <div className="modal-header">
          <h3>Acorde: {chord}</h3>
          <button className="close-modal" onClick={onClose}>
            <BsX />
          </button>
        </div>
        
        <div className="modal-content">
          {loading ? (
            <div className="loading-chord">Cargando diagrama...</div>
          ) : (
            <>
              <div className="image-navigation">
                <button className="nav-btn" onClick={handlePrevImage}>
                  <BsArrowLeft />
                </button>
                
                <div className="chord-image-container">
                  <img 
                    src={chordImages[currentImageIndex]} 
                    alt={`Diagrama de acorde ${chord}`}
                    className="chord-diagram"
                    onError={(e) => {
                      e.target.src = '/img/chords/default_chord.jpg';
                    }}
                  />
                  <div className="image-counter">
                    {currentImageIndex + 1} / {chordImages.length}
                  </div>
                </div>
                
                <button className="nav-btn" onClick={handleNextImage}>
                  <BsArrowRight />
                </button>
              </div>
              
              <div className="modal-actions">
                <button className="btn-download-chord" onClick={handleDownload}>
                  <BsDownload /> Descargar Imagen
                </button>
                <button 
                  className="btn-copy-chord"
                  onClick={() => navigator.clipboard.writeText(chord)}
                >
                  Copiar Acorde: {chord}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChordImageModal;