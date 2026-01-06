// ================================================
// BIBLIOTECA DE ACORDES - COMPONENTE PRINCIPAL
// ================================================

// Importaciones de React y dependencias
import React, { useState, useEffect, useRef } from "react";
import { FiMusic, FiSearch, FiX } from "react-icons/fi";
import BibliotecaTeoriaMusicalDiagramaAcordes from "./BibliotecaTeoriaMusicalDiagramaAcordes";
import "../assets/scss/_03-Componentes/_BibliotecaTeoriaMusical.scss";

// 🎵 COMPONENTE PRINCIPAL - Biblioteca de Acordes
const BibliotecaTeoriaMusical = () => {
  // ============= ESTADOS DEL COMPONENTE =============
  // 📊 Estados para manejar los datos de acordes
  const [chords, setChords] = useState([]); // Lista completa de acordes
  const [filteredChords, setFilteredChords] = useState([]); // Acordes filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [selectedCategory, setSelectedCategory] = useState("TODOS"); // Categoría seleccionada
  const [selectedChord, setSelectedChord] = useState(null); // Acorde seleccionado para modal
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const modalRef = useRef(); // Referencia para el modal (para cerrar al hacer click fuera)

  // ============= EFECTO PARA CARGAR DATOS =============
  // 🔄 Se ejecuta al montar el componente para cargar los datos de acordes
  useEffect(() => {
    const loadChordsData = async () => {
      try {
        setIsLoading(true);
        // 📥 Intenta cargar los datos desde el archivo JSON
        const response = await fetch('/chordsData.json');
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo de acordes');
        }
        
        const chordsData = await response.json();
        setChords(chordsData); // Guarda los datos completos
        setFilteredChords(chordsData); // Inicializa los datos filtrados
      } catch (err) {
        console.error("Error cargando los acordes:", err);
        setError("No se pudieron cargar los acordes. Revisa el JSON.");
        
        // 🆘 Datos de ejemplo en caso de error
        const exampleChords = [
          { name: "Do Mayor", description: "Acorde básico de Do", category: "Mayor", fingering: "0-3-2-0-1-0", notes: "C-E-G", image: "" },
          { name: "Re Mayor", description: "Acorde básico de Re", category: "Mayor", fingering: "X-X-0-2-3-2", notes: "D-F#-A", image: "" },
          { name: "Mi Mayor", description: "Acorde básico de Mi", category: "Mayor", fingering: "0-2-2-1-0-0", notes: "E-G#-B", image: "" },
          { name: "Fa Mayor", description: "Acorde básico de Fa", category: "Mayor", fingering: "1-3-3-2-1-1", notes: "F-A-C", image: "" },
          { name: "Sol Mayor", description: "Acorde básico de Sol", category: "Mayor", fingering: "3-2-0-0-0-3", notes: "G-B-D", image: "" },
          { name: "La Mayor", description: "Acorde básico de La", category: "Mayor", fingering: "X-0-2-2-2-0", notes: "A-C#-E", image: "" },
          { name: "Si Mayor", description: "Acorde básico de Si", category: "Mayor", fingering: "X-2-4-4-4-2", notes: "B-D#-F#", image: "" },
          { name: "Do Menor", description: "Acorde menor de Do", category: "Menor", fingering: "X-3-1-0-1-0", notes: "C-E♭-G", image: "" },
          { name: "Re Menor", description: "Acorde menor de Re", category: "Menor", fingering: "X-X-0-2-3-1", notes: "D-F-A", image: "" },
          { name: "Mi Menor", description: "Acorde menor de Mi", category: "Menor", fingering: "0-2-2-0-0-0", notes: "E-G-B", image: "" },
          { name: "Fa Menor", description: "Acorde menor de Fa", category: "Menor", fingering: "1-3-3-1-1-1", notes: "F-A♭-C", image: "" },
          { name: "Sol Menor", description: "Acorde menor de Sol", category: "Menor", fingering: "3-1-0-0-3-3", notes: "G-B♭-D", image: "" },
          { name: "La Menor", description: "Acorde menor de La", category: "Menor", fingering: "X-0-2-2-1-0", notes: "A-C-E", image: "" },
          { name: "Si Menor", description: "Acorde menor de Si", category: "Menor", fingering: "X-2-4-4-3-2", notes: "B-D-F#", image: "" },
        ];
        setChords(exampleChords);
        setFilteredChords(exampleChords);
      } finally {
        setIsLoading(false); // Finaliza el estado de carga
      }
    };
    loadChordsData();
  }, []);

  // ============= EFECTO PARA FILTRAR ACORDES =============
  // 🔍 Se ejecuta cuando cambia searchTerm, selectedCategory o chords
  useEffect(() => {
    let results = chords;
    // 🔤 Filtro por término de búsqueda
    if (searchTerm) {
      results = results.filter(
        chord =>
          chord.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chord.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chord.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // 🏷️ Filtro por categoría
    if (selectedCategory !== "TODOS") {
      results = results.filter(chord => 
        chord.category.toUpperCase() === selectedCategory
      );
    }
    setFilteredChords(results);
  }, [searchTerm, selectedCategory, chords]);

  // 📋 Extrae categorías únicas de los acordes
  const categories = ["TODOS", ...new Set(chords.map(chord => chord.category.toUpperCase()))];

  // ============= MANEJADORES DE EVENTOS =============
  // ⌨️ Maneja cambios en el campo de búsqueda
  const handleSearchChange = e => setSearchTerm(e.target.value);
  
  // 🏷️ Maneja cambios en la categoría seleccionada
  const handleCategoryChange = cat => setSelectedCategory(cat);
  
  // 🎸 Maneja la selección de un acorde (abre modal)
  const handleChordSelect = chord => setSelectedChord(chord);

  // 🖱️ Cierra el modal al hacer click fuera de él
  const handleClickOutsideModal = e => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setSelectedChord(null);
    }
  };
  
  // 🔒 Controla eventos del modal y deshabilita scroll del body
  useEffect(() => {
    if (selectedChord) {
      document.addEventListener("mousedown", handleClickOutsideModal);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener("mousedown", handleClickOutsideModal);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
      document.body.style.overflow = 'unset';
    };
  }, [selectedChord]);

  // ============= RENDERIZAR DETALLE DEL ACORDE (MODAL) =============
  // 🪟 Modal que muestra detalles del acorde seleccionado
  const renderChordDetail = () => {
    if (!selectedChord) return null;
    return (
      <div className="chord-detail-modal">
        <div className="chord-detail-content" ref={modalRef}>
          <button className="close-button" onClick={() => setSelectedChord(null)}>
            <FiX />
          </button>
          <div className="chord-detail-header">
            <h2>{selectedChord.name}</h2>
            <span className="chord-category">{selectedChord.category}</span>
          </div>
          <div className="chord-detail-body">
            {/* 🎼 Componente que muestra el diagrama del acorde */}
            <BibliotecaTeoriaMusicalDiagramaAcordes fingering={selectedChord.fingering} />
            <div className="chord-detail-info">
              <h3>Descripción</h3>
              <p>{selectedChord.description}</p>
              <h3>Notas del Acorde</h3>
              <p>{selectedChord.notes || "Do - Mi - Sol"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============= ESTADOS DE CARGA Y ERROR =============
  // ⏳ Muestra estado de carga mientras se obtienen datos
  if (isLoading) return (
    <div className="loading-state">
      <FiMusic /> 
      <p>Cargando acordes...</p>
    </div>
  );
  
  // ❌ Muestra estado de error si falla la carga
  if (error) return (
    <div className="error-state">
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Reintentar</button>
    </div>
  );

  // ============= RENDERIZADO PRINCIPAL DEL COMPONENTE =============
  return (
    <div className="biblioteca-chords-container">
      <div className="biblioteca-content">

        {/* 📍 ENCABEZADO COMPRIMIDO - Título y descripción */}
        <div className="biblioteca-header compact">
          <div className="header-content">
            <FiMusic className="header-icon" />
            <div className="header-text">
              <h1>Biblioteca de Acordes</h1>
              <p>Archivo completo de combinaciones de acordes</p>
            </div>
          </div>
        </div>

        {/* 🔍 PANEL DE BÚSQUEDA - Campo para buscar acordes */}
        <div className="controls-panel compact">
          <div className="search-section expanded">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar acorde..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
          </div>
        </div>

        {/* 🏷️ PANEL DE CATEGORÍAS - Botones para filtrar por tipo de acorde */}
        <div className="categories-panel compact">
          <div className="category-buttons">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={selectedCategory === cat ? "active" : ""} 
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 📊 INFORMACIÓN DE RESULTADOS - Muestra cantidad de acordes encontrados */}
        <div className="results-info compact">
          <p>{filteredChords.length} acorde{filteredChords.length !== 1 ? 's' : ''} encontrado{filteredChords.length !== 1 ? 's' : ''}</p>
        </div>

        {/* 🎸 CONTENEDOR DE ACORDES - Grid con todos los acordes filtrados */}
        <div className="chords-container grid-view">
          {filteredChords.length === 0
            ? <div className="no-results">
                <FiMusic />
                <h3>No se encontraron acordes</h3>
                <p>Intenta con otros términos de búsqueda</p>
              </div>
            : filteredChords.map((chord, index) => (
              <div key={index} className="chord-item" onClick={() => handleChordSelect(chord)}>
                <div className="chord-diagram-wrapper">
                  <BibliotecaTeoriaMusicalDiagramaAcordes fingering={chord.fingering} />
                </div>
                <div className="chord-info">
                  <h3>{chord.name}</h3>
                  <p>{chord.description}</p>
                  <span className="chord-category-badge">{chord.category}</span>
                </div>
              </div>
            ))
          }
        </div>

        {/* 🪟 MODAL DE DETALLE DE ACORDE - Se muestra al hacer click en un acorde */}
        {renderChordDetail()}

      </div>
    </div>
  );
};

export default BibliotecaTeoriaMusical;