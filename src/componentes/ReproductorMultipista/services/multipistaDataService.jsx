// ============================================
// ARCHIVO: multipistaDataService.jsx
// DESCRIPCIÓN: Servicio para cargar y procesar datos multipista
// ============================================

// ============================================
// FUNCIÓN: cargarDatosMultipista
// ============================================
export const cargarDatosMultipista = async (jsonPath) => {
    try {
      console.log(`📥 Cargando datos multipista: ${jsonPath}`);
      const response = await fetch(jsonPath);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo cargar ${jsonPath}`);
      }
      
      const data = await response.json();
      console.log('✅ Datos multipista cargados:', data.artista);
      
      return {
        ...data,
        cancionesProcesadas: procesarCanciones(data)
      };
      
    } catch (error) {
      console.error('❌ Error cargando datos multipista:', error);
      throw error;
    }
  };
  
  // ============================================
  // FUNCIÓN: procesarCanciones
  // ============================================
  const procesarCanciones = (data) => {
    const cancionesProcesadas = [];
    
    data.discografia.forEach((disco, discoIndex) => {
      disco.songs.forEach((cancion, cancionIndex) => {
        const cancionProcesada = {
          // Información básica
          id: cancion.id || `cancion-${discoIndex}-${cancionIndex}`,
          title: cancion.title,
          artist: cancion.artist || data.artista,
          duration: cancion.duration,
          
          // URLs de audio y chords
          mp3_url: cancion.mp3_url || cancion.url || '',
          chords_url: cancion.chords_url || null,
          
          // Metadatos
          disco: disco.album_name,
          portada: disco.cover_image,
          categoria: data.categoria,
          year: disco.year,
          genre: disco.genre,
          
          // Detalles
          details: cancion.details || {},
          
          // Información multipista
          multipista: cancion.multipista || false,
          es_homenaje: cancion.es_homenaje || false,
          multipista_config: cancion.multipista_config || null,
          
          // Pistas (si es multipista)
          pistas: cancion.pistas || [],
          
          // Para compatibilidad con otros componentes
          nombre: cancion.title,
          url: cancion.mp3_url || cancion.url || '',
          imagen: disco.cover_image,
          es_multipista: cancion.multipista || false
        };
        
        // Traducir nombres de instrumentos si es necesario
        if (cancionProcesada.pistas && cancionProcesada.pistas.length > 0) {
          cancionProcesada.pistas = cancionProcesada.pistas.map(pista => ({
            ...pista,
            // Traducción de nombres de instrumentos
            instrumento: traducirInstrumento(pista.instrumento),
            // Asegurar icono
            icono: pista.icono || obtenerIconoPorInstrumento(pista.instrumento)
          }));
        }
        
        cancionesProcesadas.push(cancionProcesada);
      });
    });
    
    return cancionesProcesadas;
  };
  
  // ============================================
  // FUNCIÓN: traducirInstrumento
  // ============================================
  const traducirInstrumento = (instrumento) => {
    const traducciones = {
      'Vocals': 'Voz Principal',
      'Backing Vocals': 'Coros',
      'Lead Guitar': 'Guitarra Líder',
      'Rhythm Guitar': 'Guitarra Rítmica',
      'Bass': 'Bajo',
      'Drums': 'Batería',
      'Keys': 'Teclados',
      'Piano': 'Piano',
      'Strings': 'Cuerdas',
      'Wind': 'Vientos',
      'Metronome': 'Metrónomo',
      'Other': 'Otros',
      'Voces': 'Voz Principal',
      'Batería': 'Batería',
      'Guitarra Líder': 'Guitarra Líder',
      'Guitarra Rítmica': 'Guitarra Rítmica',
      'Teclados': 'Teclados',
      'Cuerdas': 'Cuerdas',
      'Vientos': 'Vientos',
      'Metrónomo': 'Metrónomo',
      'Otros': 'Otros'
    };
    
    return traducciones[instrumento] || instrumento;
  };
  
  // ============================================
  // FUNCIÓN: obtenerIconoPorInstrumento
  // ============================================
  const obtenerIconoPorInstrumento = (instrumento) => {
    const iconos = {
      'Voz Principal': '🎤',
      'Coros': '🎤',
      'Guitarra Líder': '🎸',
      'Guitarra Rítmica': '🎸',
      'Bajo': '🎸',
      'Batería': '🥁',
      'Teclados': '🎹',
      'Piano': '🎹',
      'Cuerdas': '🎻',
      'Vientos': '🎷',
      'Metrónomo': '⏱️',
      'Otros': '🎵'
    };
    
    return iconos[instrumento] || '🎵';
  };
  
  // ============================================
  // FUNCIÓN: filtrarCancionesPorTipo
  // ============================================
  export const filtrarCancionesPorTipo = (canciones, tipo) => {
    switch (tipo) {
      case 'multipista':
        return canciones.filter(c => c.multipista);
      case 'normal':
        return canciones.filter(c => !c.multipista);
      case 'homenaje':
        return canciones.filter(c => c.es_homenaje);
      case 'todos':
      default:
        return canciones;
    }
  };
  
  // ============================================
  // FUNCIÓN: buscarCanciones
  // ============================================
  export const buscarCanciones = (canciones, query) => {
    if (!query.trim()) return canciones;
    
    const queryLower = query.toLowerCase();
    
    return canciones.filter(cancion => {
      const titulo = (cancion.title || '').toLowerCase();
      const artista = (cancion.artist || '').toLowerCase();
      const album = (cancion.disco || '').toLowerCase();
      const genero = (cancion.genre || '').toLowerCase();
      
      return titulo.includes(queryLower) ||
             artista.includes(queryLower) ||
             album.includes(queryLower) ||
             genero.includes(queryLower);
    });
  };
  
  // ============================================
  // FUNCIÓN: obtenerEstadisticas
  // ============================================
  export const obtenerEstadisticas = (canciones) => {
    const totalCanciones = canciones.length;
    const cancionesMultipista = canciones.filter(c => c.multipista).length;
    const cancionesNormales = totalCanciones - cancionesMultipista;
    const cancionesHomenaje = canciones.filter(c => c.es_homenaje).length;
    
    let totalPistas = 0;
    canciones.forEach(c => {
      if (c.pistas && Array.isArray(c.pistas)) {
        totalPistas += c.pistas.length;
      }
    });
    
    return {
      totalCanciones,
      cancionesMultipista,
      cancionesNormales,
      cancionesHomenaje,
      totalPistas,
      promedioPistasPorMultipista: cancionesMultipista > 0 ? 
        Math.round(totalPistas / cancionesMultipista) : 0
    };
  };
  
  // ============================================
  // EXPORTACIONES
  // ============================================
  export default {
    cargarDatosMultipista,
    filtrarCancionesPorTipo,
    buscarCanciones,
    obtenerEstadisticas,
    traducirInstrumento,
    obtenerIconoPorInstrumento
  };