// ============================================
// ARCHIVO: MultipistaContexto.jsx - VERSIÓN CON REPRODUCCIÓN REAL
// DESCRIPCIÓN: Contexto unificado para manejar multipista y canciones normales
// MEJORA: Implementación completa de reproducción de audio sincronizado
// ============================================

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

// ============================================
// CREACIÓN DEL CONTEXTO
// ============================================
const MultipistaContext = createContext();

// ============================================
// HOOK PERSONALIZADO PARA USAR EL CONTEXTO
// ============================================
export const useMultipistaContexto = () => {
  const context = useContext(MultipistaContext);
  if (!context) {
    throw new Error('useMultipistaContexto debe usarse dentro de MultipistaProvider');
  }
  return context;
};

// ============================================
// PROVIDER DEL CONTEXTO MULTIPISTA
// ============================================
export const MultipistaProvider = ({ children }) => {
  // ============================================
  // ESTADOS PRINCIPALES
  // ============================================
  const [canciones, setCanciones] = useState([]);
  const [cancionActual, setCancionActual] = useState(null);
  const [pistas, setPistas] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volumeMaster, setVolumeMaster] = useState(0.8);
  const [metadatos, setMetadatos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [esMultipistaActual, setEsMultipistaActual] = useState(false);
  const [datosChords, setDatosChords] = useState(null);
  const [cargandoChords, setCargandoChords] = useState(false);
  const [audioElements, setAudioElements] = useState({});
  const [audiosCargados, setAudiosCargados] = useState({});
  
  // ============================================
  // REFERENCIAS PARA AUDIO
  // ============================================
  const audioRefs = useRef({});
  const progressIntervalRef = useRef(null);
  const currentTimeRef = useRef(0);

  // ============================================
  // EFECTO: CARGAR DATOS DESDE JSON UNIFICADO
  // ============================================
  useEffect(() => {
    const cargarDatosMultipista = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('🔄 Cargando datos multipista unificados...');
        
        // Cargar el JSON principal de multipista mejorado
        const response = await fetch('/listados/listados-musica-multipista/listados-musica-multipista-homenajes\listado-musica-multipista-acdc-mejorado.json');
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el JSON de multipista');
        }
        
        const data = await response.json();
        console.log('✅ Datos multipista unificados cargados:', data);
        
        procesarDatosCanciones(data);
        
      } catch (err) {
        console.error('❌ Error cargando datos multipista:', err);
        setError(`Error al cargar pistas multipista: ${err.message}`);
        
        // Datos de fallback para desarrollo
        cargarDatosFallback();
      } finally {
        setLoading(false);
      }
    };

    // Procesar datos de canciones
    const procesarDatosCanciones = (data) => {
      const todasCanciones = data.discografia.flatMap(disco => 
        disco.songs.map(cancion => ({
          ...cancion,
          disco: disco.album_name,
          portada: disco.cover_image,
          artista: data.artista,
          categoria: data.categoria,
          // Asegurar que tenga propiedades unificadas
          nombre: cancion.title,
          es_multipista: cancion.multipista || false,
          es_homenaje: cancion.es_homenaje || false,
          // Para compatibilidad con el reproductor
          url: cancion.mp3_url || '',
          chords_url: cancion.chords_url || null,
          imagen: disco.cover_image || '/img/09-discos/ACDC-Thunderstruck.jpg'
        }))
      );
      
      setCanciones(todasCanciones);
      
      // Si hay canciones, seleccionar la primera multipista
      if (todasCanciones.length > 0) {
        const primeraMultipista = todasCanciones.find(c => c.es_multipista) || todasCanciones[0];
        seleccionarCancion(primeraMultipista);
      }
    };

    // Función para cargar datos de fallback
    const cargarDatosFallback = () => {
      const pistasIniciales = [
        {
          id: 'backing-vocals',
          nombre: 'Coros',
          instrumento: 'Voces de Acompañamiento',
          archivo: '/audio/04-mp3-multipistas/acdc-thunderstruck-backing-vocals-134bpm-440hz-b-major.mp3',
          color: '#FF6B6B',
          activa: true,
          volumen: 0.8,
          pan: 0,
          solo: false,
          mute: false,
          icono: '🎤',
          descripcion: 'Voces de fondo y coros',
          audioElement: null,
          loaded: false
        },
        {
          id: 'bass',
          nombre: 'Bajo',
          instrumento: 'Bajo Eléctrico',
          archivo: '/audio/04-mp3-multipistas/acdc-thunderstruck-bass-134bpm-440hz-b-major.mp3',
          color: '#4ECDC4',
          activa: true,
          volumen: 0.9,
          pan: 0,
          solo: false,
          mute: false,
          icono: '🎸',
          descripcion: 'Línea de bajo principal',
          audioElement: null,
          loaded: false
        },
        {
          id: 'drums',
          nombre: 'Batería',
          instrumento: 'Batería Completa',
          archivo: '/audio/04-mp3-multipistas/acdc-thunderstruck-drums-134bpm-440hz-b-major.mp3',
          color: '#FFD166',
          activa: true,
          volumen: 1.0,
          pan: 0,
          solo: false,
          mute: false,
          icono: '🥁',
          descripcion: 'Batería, platillos y percusión',
          audioElement: null,
          loaded: false
        },
        {
          id: 'lead',
          nombre: 'Guitarra Líder',
          instrumento: 'Guitarra Principal',
          archivo: '/audio/04-mp3-multipistas/acdc-thunderstruck-lead-134bpm-440hz-b-major.mp3',
          color: '#118AB2',
          activa: true,
          volumen: 0.85,
          pan: -0.3,
          solo: false,
          mute: false,
          icono: '🎸',
          descripcion: 'Solos y melodías principales',
          audioElement: null,
          loaded: false
        },
        {
          id: 'rhythm',
          nombre: 'Guitarra Rítmica',
          instrumento: 'Guitarra de Ritmo',
          archivo: '/audio/04-mp3-multipistas/acdc-thunderstruck-rhythm-134bpm-440hz-b-major.mp3',
          color: '#4361EE',
          activa: true,
          volumen: 0.85,
          pan: 0.3,
          solo: false,
          mute: false,
          icono: '🎸',
          descripcion: 'Acordes y ritmos',
          audioElement: null,
          loaded: false
        }
      ];

      const cancionFallback = {
        id: 'multipista-acdc-01-thunderstruck',
        title: 'Thunderstruck',
        artist: 'AC/DC',
        duration: '4:52',
        disco: 'AC/DC - PISTAS SEPARADAS',
        portada: '/img/09-discos/ACDC-Thunderstruck.jpg',
        pistas: pistasIniciales,
        es_multipista: true,
        mp3_url: '/audio/04-mp3-multipistas/acdc-thunderstruck-full-mix-134bpm-440hz-b-major.mp3',
        chords_url: '/chords/04-chords-multipista/acdc-thunderstruck.json'
      };

      setCanciones([cancionFallback]);
      seleccionarCancion(cancionFallback);
    };

    cargarDatosMultipista();
  }, []);

  // ============================================
  // EFECTO: INICIALIZAR AUDIO ELEMENTS CUANDO CAMBIAN PISTAS
  // ============================================
  useEffect(() => {
    if (esMultipistaActual && pistas.length > 0) {
      inicializarAudioElements();
    }
  }, [pistas, esMultipistaActual]);

  // ============================================
  // FUNCIÓN: INICIALIZAR ELEMENTOS DE AUDIO
  // ============================================
  const inicializarAudioElements = () => {
    console.log('🔊 Inicializando elementos de audio...');
    
    const newAudioElements = {};
    const newAudiosCargados = {};
    
    pistas.forEach(pista => {
      if (pista.activa && pista.archivo) {
        try {
          const audio = new Audio(pista.archivo);
          audio.preload = 'metadata';
          audio.volume = pista.volumen * volumeMaster;
          audio.muted = pista.mute;
          
          audio.onloadedmetadata = () => {
            console.log(`✅ Audio cargado: ${pista.nombre} (${Math.round(audio.duration)}s)`);
            newAudiosCargados[pista.id] = true;
            setAudiosCargados(prev => ({ ...prev, [pista.id]: true }));
            
            // Actualizar duración total
            const maxDuration = Math.max(...Object.values(newAudiosCargados).map(() => audio.duration || 0));
            setDuration(maxDuration);
          };
          
          audio.onerror = (e) => {
            console.error(`❌ Error cargando audio ${pista.nombre}:`, e);
            newAudiosCargados[pista.id] = false;
            setAudiosCargados(prev => ({ ...prev, [pista.id]: false }));
          };
          
          newAudioElements[pista.id] = audio;
        } catch (error) {
          console.error(`❌ Error creando audio para ${pista.nombre}:`, error);
        }
      }
    });
    
    setAudioElements(newAudioElements);
    audioRefs.current = newAudioElements;
  };

  // ============================================
  // FUNCIÓN: ACTUALIZAR VOLUMEN DE AUDIO
  // ============================================
  const actualizarVolumenAudio = useCallback((pistaId, volumen) => {
    const audio = audioRefs.current[pistaId];
    if (audio) {
      audio.volume = volumen * volumeMaster;
    }
  }, [volumeMaster]);

  // ============================================
  // FUNCIÓN: ACTUALIZAR MUTE DE AUDIO
  // ============================================
  const actualizarMuteAudio = useCallback((pistaId, mute) => {
    const audio = audioRefs.current[pistaId];
    if (audio) {
      audio.muted = mute;
    }
  }, []);

  // ============================================
  // FUNCIÓN: REPRODUCIR TODAS LAS PISTAS SINCRONIZADAS
  // ============================================
  const reproducirPistasSincronizadas = useCallback(() => {
    if (!esMultipistaActual) {
      // Reproducción de canción normal
      const audioPrincipal = audioRefs.current['principal'];
      if (audioPrincipal) {
        audioPrincipal.play().then(() => {
          console.log('▶️ Reproduciendo canción normal');
          iniciarActualizacionProgreso();
        }).catch(e => {
          console.error('❌ Error reproduciendo audio principal:', e);
        });
      }
      return;
    }

    // Reproducción multipista
    console.log('▶️ Iniciando reproducción multipista sincronizada...');
    
    const pistasActivas = pistas.filter(p => p.activa && !p.mute);
    
    if (pistasActivas.length === 0) {
      console.warn('⚠️ No hay pistas activas para reproducir');
      return;
    }

    // Obtener el tiempo actual de referencia
    const currentRefTime = currentTimeRef.current || 0;
    
    // Reproducir todas las pistas sincronizadas
    let reproduccionesExitosas = 0;
    
    pistasActivas.forEach(pista => {
      const audio = audioRefs.current[pista.id];
      if (audio && audiosCargados[pista.id]) {
        try {
          // Sincronizar tiempo
          audio.currentTime = currentRefTime;
          
          // Reproducir
          const playPromise = audio.play();
          
          if (playPromise !== undefined) {
            playPromise.then(() => {
              reproduccionesExitosas++;
              
              if (reproduccionesExitosas === pistasActivas.length) {
                console.log(`✅ Todas las ${pistasActivas.length} pistas reproduciéndose`);
                iniciarActualizacionProgreso();
              }
            }).catch(e => {
              console.error(`❌ Error reproduciendo ${pista.nombre}:`, e);
            });
          }
        } catch (error) {
          console.error(`❌ Error sincronizando ${pista.nombre}:`, error);
        }
      }
    });
    
    if (reproduccionesExitosas > 0) {
      setIsPlaying(true);
    }
  }, [esMultipistaActual, pistas, audiosCargados]);

  // ============================================
  // FUNCIÓN: PAUSAR TODAS LAS PISTAS
  // ============================================
  const pausarPistas = useCallback(() => {
    console.log('⏸️ Pausando todas las pistas...');
    
    // Pausar todos los audios
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause();
      }
    });
    
    // Detener actualización de progreso
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    setIsPlaying(false);
  }, []);

  // ============================================
  // FUNCIÓN: DETENER TODAS LAS PISTAS
  // ============================================
  const detenerPistas = useCallback(() => {
    console.log('⏹️ Deteniendo todas las pistas...');
    
    // Pausar y resetear todos los audios
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    
    // Detener actualización de progreso
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    setIsPlaying(false);
    setCurrentTime(0);
    currentTimeRef.current = 0;
  }, []);

  // ============================================
  // FUNCIÓN: INICIAR ACTUALIZACIÓN DE PROGRESO
  // ============================================
  const iniciarActualizacionProgreso = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    progressIntervalRef.current = setInterval(() => {
      // Buscar un audio activo para obtener el tiempo actual
      let tiempoActual = 0;
      const pistasActivas = pistas.filter(p => p.activa);
      
      for (const pista of pistasActivas) {
        const audio = audioRefs.current[pista.id];
        if (audio && !audio.paused && !audio.muted) {
          tiempoActual = audio.currentTime;
          break;
        }
      }
      
      // Actualizar tiempo si hay audio reproduciéndose
      if (tiempoActual > 0) {
        currentTimeRef.current = tiempoActual;
        setCurrentTime(tiempoActual);
        
        // Verificar si todas las pistas terminaron
        const todasTerminadas = pistasActivas.every(pista => {
          const audio = audioRefs.current[pista.id];
          return !audio || audio.ended;
        });
        
        if (todasTerminadas && pistasActivas.length > 0) {
          console.log('✅ Reproducción completada');
          detenerPistas();
        }
      }
    }, 100); // Actualizar cada 100ms
  }, [pistas, detenerPistas]);

  // ============================================
  // FUNCIÓN: CAMBIAR TIEMPO ACTUAL (SEEK)
  // ============================================
  const cambiarTiempoActual = useCallback((nuevoTiempo) => {
    console.log(`⏱️ Cambiando tiempo a: ${nuevoTiempo}s`);
    
    currentTimeRef.current = nuevoTiempo;
    setCurrentTime(nuevoTiempo);
    
    // Aplicar a todos los audios activos
    Object.entries(audioRefs.current).forEach(([pistaId, audio]) => {
      const pista = pistas.find(p => p.id === pistaId);
      if (audio && pista && pista.activa) {
        audio.currentTime = nuevoTiempo;
      }
    });
  }, [pistas]);

  // ============================================
  // FUNCIÓN: SELECCIONAR CANCIÓN (UNIFICADA)
  // ============================================
  const seleccionarCancion = useCallback((cancion) => {
    if (!cancion) return;
    
    console.log('🎵 Seleccionando canción:', cancion.title);
    
    // Detener reproducción actual
    detenerPistas();
    
    setCancionActual(cancion);
    setEsMultipistaActual(cancion.es_multipista || false);
    
    // Si es multipista, cargar las pistas
    if (cancion.es_multipista && cancion.pistas) {
      setPistas(cancion.pistas.map(p => ({ ...p, loaded: false })));
    } else {
      setPistas([]);
    }
    
    // Reiniciar estados de reproducción
    setCurrentTime(0);
    currentTimeRef.current = 0;
    setIsPlaying(false);
    
    // Actualizar metadatos
    setMetadatos({
      titulo: cancion.title,
      artista: cancion.artist,
      disco: cancion.disco,
      portada: cancion.portada,
      ...(cancion.multipista_config || {}),
      ...(cancion.details || {}),
      es_multipista: cancion.es_multipista || false,
      es_homenaje: cancion.es_homenaje || false
    });
    
    // Cargar chords si existe la URL
    if (cancion.chords_url) {
      cargarChords(cancion.chords_url);
    } else {
      setDatosChords(null);
    }
    
    // Inicializar audio después de un breve delay
    setTimeout(() => {
      if (cancion.es_multipista) {
        inicializarAudioElements();
      } else if (cancion.mp3_url) {
        // Para canción normal, crear un audio principal
        const audio = new Audio(cancion.mp3_url);
        audio.preload = 'metadata';
        audio.volume = volumeMaster;
        
        audio.onloadedmetadata = () => {
          setDuration(audio.duration);
          audioRefs.current['principal'] = audio;
        };
      }
    }, 100);
    
  }, [detenerPistas, volumeMaster]);

  // ============================================
  // FUNCIÓN: CAMBIAR CANCIÓN POR ID
  // ============================================
  const cambiarCancion = useCallback((cancionId) => {
    const cancion = canciones.find(c => c.id === cancionId);
    if (cancion) {
      seleccionarCancion(cancion);
    }
  }, [canciones, seleccionarCancion]);

  // ============================================
  // FUNCIÓN: CARGAR CHORDS
  // ============================================
  const cargarChords = useCallback(async (chordsUrl) => {
    if (!chordsUrl) {
      setDatosChords(null);
      return;
    }
    
    setCargandoChords(true);
    
    try {
      console.log('🎵 Cargando chords desde:', chordsUrl);
      const response = await fetch(chordsUrl);
      
      if (response.ok) {
        const chordsData = await response.json();
        setDatosChords(chordsData);
        console.log('✅ Chords cargados:', chordsData.title);
      } else {
        console.warn('⚠️ No se pudieron cargar los chords');
        setDatosChords(null);
      }
    } catch (error) {
      console.error('❌ Error cargando chords:', error);
      setDatosChords(null);
    } finally {
      setCargandoChords(false);
    }
  }, []);

  // ============================================
  // FUNCIONES DE CONTROL DE PISTAS INDIVIDUALES
  // ============================================
  const togglePista = useCallback((pistaId) => {
    if (!esMultipistaActual) return;
    
    setPistas(prevPistas => 
      prevPistas.map(pista => {
        if (pista.id === pistaId) {
          const nuevaActiva = !pista.activa;
          
          // Manejar elemento de audio
          if (nuevaActiva && !audioRefs.current[pistaId]) {
            // Crear nuevo audio si se activa
            const audio = new Audio(pista.archivo);
            audio.preload = 'metadata';
            audio.volume = pista.volumen * volumeMaster;
            audio.muted = pista.mute;
            
            audio.onloadedmetadata = () => {
              setAudiosCargados(prev => ({ ...prev, [pistaId]: true }));
            };
            
            audioRefs.current[pistaId] = audio;
          } else if (!nuevaActiva && audioRefs.current[pistaId]) {
            // Pausar y limpiar audio si se desactiva
            audioRefs.current[pistaId].pause();
            delete audioRefs.current[pistaId];
          }
          
          return { ...pista, activa: nuevaActiva };
        }
        return pista;
      })
    );
  }, [esMultipistaActual, volumeMaster]);

  const toggleSoloPista = useCallback((pistaId) => {
    if (!esMultipistaActual) return;
    
    setPistas(prevPistas => {
      const pistaClickada = prevPistas.find(p => p.id === pistaId);
      const nuevoSoloEstado = !pistaClickada.solo;
      
      return prevPistas.map(pista => {
        if (pista.id === pistaId) {
          return { ...pista, solo: nuevoSoloEstado };
        }
        // Si se activa solo en una pista, desactivar solo en las demás
        if (nuevoSoloEstado) {
          return { ...pista, solo: false };
        }
        return pista;
      });
    });
  }, [esMultipistaActual]);

  const toggleMutePista = useCallback((pistaId) => {
    if (!esMultipistaActual) return;
    
    setPistas(prevPistas => 
      prevPistas.map(pista => {
        if (pista.id === pistaId) {
          const nuevoMute = !pista.mute;
          actualizarMuteAudio(pistaId, nuevoMute);
          return { ...pista, mute: nuevoMute };
        }
        return pista;
      })
    );
  }, [esMultipistaActual, actualizarMuteAudio]);

  const updateVolumenPista = useCallback((pistaId, nuevoVolumen) => {
    if (!esMultipistaActual) return;
    
    setPistas(prevPistas => 
      prevPistas.map(pista => {
        if (pista.id === pistaId) {
          actualizarVolumenAudio(pistaId, nuevoVolumen);
          return { ...pista, volumen: nuevoVolumen };
        }
        return pista;
      })
    );
  }, [esMultipistaActual, actualizarVolumenAudio]);

  const updatePanPista = useCallback((pistaId, nuevoPan) => {
    if (!esMultipistaActual) return;
    
    setPistas(prevPistas => 
      prevPistas.map(pista => 
        pista.id === pistaId 
          ? { ...pista, pan: nuevoPan }
          : pista
      )
    );
  }, [esMultipistaActual]);

  // ============================================
  // FUNCIONES DE CONTROL MAESTRO DE PISTAS
  // ============================================
  const activarTodasPistas = useCallback(() => {
    if (!esMultipistaActual) return;
    
    setPistas(prevPistas => 
      prevPistas.map(pista => ({ 
        ...pista, 
        activa: true,
        loaded: false
      }))
    );
    
    // Reinicializar audios
    setTimeout(inicializarAudioElements, 100);
  }, [esMultipistaActual]);

  const desactivarTodasPistas = useCallback(() => {
    if (!esMultipistaActual) return;
    
    // Pausar y limpiar todos los audios
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause();
      }
    });
    audioRefs.current = {};
    
    setPistas(prevPistas => 
      prevPistas.map(pista => ({ 
        ...pista, 
        activa: false,
        loaded: false
      }))
    );
  }, [esMultipistaActual]);

  const silenciarTodasPistas = useCallback(() => {
    if (!esMultipistaActual) return;
    
    Object.keys(audioRefs.current).forEach(pistaId => {
      const audio = audioRefs.current[pistaId];
      if (audio) {
        audio.muted = true;
      }
    });
    
    setPistas(prevPistas => 
      prevPistas.map(pista => ({ ...pista, mute: true }))
    );
  }, [esMultipistaActual]);

  const activarSoloTodasPistas = useCallback(() => {
    if (!esMultipistaActual) return;
    
    setPistas(prevPistas => 
      prevPistas.map(pista => ({ ...pista, solo: false }))
    );
  }, [esMultipistaActual]);

  // ============================================
  // FUNCIONES DE RESET Y ESTADO
  // ============================================
  const resetMezcla = useCallback(() => {
    if (!esMultipistaActual) return;
    
    // Resetear volumen maestro
    setVolumeMaster(0.8);
    
    // Resetear pistas
    setPistas(prevPistas => 
      prevPistas.map(pista => ({
        ...pista,
        activa: true,
        volumen: pista.id === 'drums' ? 1.0 : 0.8,
        pan: 0,
        solo: false,
        mute: false
      }))
    );
    
    // Resetear audios
    Object.entries(audioRefs.current).forEach(([pistaId, audio]) => {
      if (audio) {
        audio.volume = (pistaId === 'drums' ? 1.0 : 0.8) * 0.8;
        audio.muted = false;
      }
    });
    
    // Reinicializar audios
    setTimeout(inicializarAudioElements, 100);
  }, [esMultipistaActual]);

  const getEstadoMezcla = useCallback(() => {
    if (!esMultipistaActual) {
      return {
        es_multipista: false,
        mensaje: 'Canción normal - sin pistas para mezclar'
      };
    }
    
    const pistasActivas = pistas.filter(p => p.activa);
    const pistasCargadas = pistasActivas.filter(p => audiosCargados[p.id]);
    
    return {
      es_multipista: true,
      pistasActivas: pistasActivas.length,
      pistasTotales: pistas.length,
      pistasSolo: pistas.filter(p => p.solo).length,
      pistasMute: pistas.filter(p => p.mute).length,
      pistasCargadas: pistasCargadas.length,
      volumenPromedio: pistas.reduce((acc, p) => acc + p.volumen, 0) / pistas.length,
      estadoCarga: `${pistasCargadas.length}/${pistasActivas.length} audios cargados`
    };
  }, [esMultipistaActual, pistas, audiosCargados]);

  // ============================================
  // LIMPIAR AL DESMONTAR
  // ============================================
  useEffect(() => {
    return () => {
      // Limpiar intervalo
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      // Pausar y limpiar audios
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
      audioRefs.current = {};
    };
  }, []);

  // ============================================
  // VALORES DEL CONTEXTO
  // ============================================
  const value = {
    // Estados principales
    canciones,
    cancionActual,
    pistas,
    isPlaying,
    currentTime,
    duration,
    volumeMaster,
    metadatos,
    loading,
    error,
    esMultipistaActual,
    datosChords,
    cargandoChords,
    audiosCargados,
    
    // Funciones de selección y carga
    seleccionarCancion,
    cambiarCancion,
    cargarChords,
    
    // Funciones de control de reproducción (ACTUALIZADAS)
    playAll: reproducirPistasSincronizadas,
    pauseAll: pausarPistas,
    stopAll: detenerPistas,
    setVolumeMaster: (vol) => {
      setVolumeMaster(vol);
      // Actualizar volumen de todos los audios
      Object.entries(audioRefs.current).forEach(([pistaId, audio]) => {
        const pista = pistas.find(p => p.id === pistaId);
        if (audio && pista) {
          audio.volume = pista.volumen * vol;
        }
      });
    },
    setCurrentTime: cambiarTiempoActual,
    setDuration,
    
    // Funciones de control de pistas
    togglePista,
    toggleSoloPista,
    toggleMutePista,
    updateVolumenPista,
    updatePanPista,
    
    // Funciones de control maestro de pistas
    activarTodasPistas,
    desactivarTodasPistas,
    silenciarTodasPistas,
    activarSoloTodasPistas,
    resetMezcla,
    
    // Funciones de información
    getEstadoMezcla,
    
    // Referencias
    audioRefs
  };

  // ============================================
  // RENDER DEL PROVIDER
  // ============================================
  return (
    <MultipistaContext.Provider value={value}>
      {children}
    </MultipistaContext.Provider>
  );
};

export default MultipistaContext;