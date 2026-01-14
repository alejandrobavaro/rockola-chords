// ============================================
// ARCHIVO: src/componentes/ChordsViewer/utils/chordsProcessor.js
// OBJETIVO: Procesamiento con funciones avanzadas de formateo
// ============================================

// ============================================
// FUNCIONES DE ANÁLISIS BÁSICO
// ============================================

export const analizarContenidoCancion = (songData) => {
    if (!songData || !songData.content) {
      return {
        lineasTotales: 0,
        acordesTotales: 0,
        seccionesTotales: 0,
        vocesTotales: 0,
        caracteresTotales: 0,
        densidad: 'baja'
      };
    }
  
    const metricas = {
      lineasTotales: 0,
      acordesTotales: 0,
      seccionesTotales: 0,
      vocesTotales: 0,
      caracteresTotales: 0,
      densidad: 'baja'
    };
  
    const analizarElementos = (elementos) => {
      elementos.forEach(elemento => {
        if (!elemento) return;
  
        switch (elemento.type) {
          case 'section':
            metricas.seccionesTotales++;
            metricas.lineasTotales += 1.5;
            if (elemento.name) {
              metricas.caracteresTotales += elemento.name.length;
            }
            break;
  
          case 'voice':
            metricas.vocesTotales++;
            metricas.lineasTotales += 1.2;
            if (elemento.name) {
              metricas.caracteresTotales += elemento.name.length;
            }
            break;
  
          case 'chord':
          case 'chords':
            metricas.acordesTotales++;
            metricas.lineasTotales += 0.8;
            const acordes = Array.isArray(elemento.content) ? elemento.content : [elemento.content];
            acordes.forEach(acorde => {
              if (acorde && !['-', '–', '', 'X', 'N.C.', '(E)'].includes(acorde.trim())) {
                metricas.caracteresTotales += acorde.length;
              }
            });
            break;
  
          case 'lyric':
            metricas.lineasTotales += 1.2;
            if (elemento.content) {
              metricas.caracteresTotales += elemento.content.length;
            }
            break;
  
          case 'text':
            metricas.lineasTotales += 1;
            if (elemento.content) {
              metricas.caracteresTotales += elemento.content.length;
            }
            break;
  
          case 'divider':
            metricas.lineasTotales += 0.5;
            break;
  
          default:
            metricas.lineasTotales += 1;
        }
  
        if (elemento.lines) {
          analizarElementos(elemento.lines);
        }
      });
    };
  
    analizarElementos(songData.content);
    metricas.lineasTotales = Math.max(1, Math.ceil(metricas.lineasTotales));
    
    if (metricas.lineasTotales > 80) metricas.densidad = 'muy-alta';
    else if (metricas.lineasTotales > 60) metricas.densidad = 'alta';
    else if (metricas.lineasTotales > 40) metricas.densidad = 'media';
    else metricas.densidad = 'baja';
    
    return metricas;
  };
  
  export const normalizarDatosCancion = (datosCrudos) => {
    if (!datosCrudos) {
      return {
        id: `cancion-${Date.now()}`,
        titulo: 'Sin título',
        artista: 'Desconocido',
        tono: 'C',
        contenido: []
      };
    }
  
    return {
      id: datosCrudos.id || `cancion-${Date.now()}`,
      titulo: datosCrudos.title || datosCrudos.titulo || 'Sin título',
      artista: datosCrudos.artist || datosCrudos.artista || 'Desconocido',
      tono: datosCrudos.key || datosCrudos.originalKey || datosCrudos.tono || 'C',
      contenido: datosCrudos.content || datosCrudos.contenido || []
    };
  };
  
  export const normalizarParaRenderizado = (valor) => {
    if (valor === null || valor === undefined) return '';
    
    if (typeof valor === 'string') {
      return valor.trim();
    }
    
    if (typeof valor === 'number') {
      return valor.toString();
    }
    
    if (Array.isArray(valor)) {
      return valor.map(item => normalizarParaRenderizado(item)).join(' ');
    }
    
    if (valor && typeof valor === 'object' && valor.content !== undefined) {
      return normalizarParaRenderizado(valor.content);
    }
    
    try {
      return String(valor);
    } catch (error) {
      console.warn('Error normalizando valor:', valor, error);
      return '';
    }
  };
  
  // ============================================
  // FUNCIONES DE FORMATEO AVANZADO
  // ============================================
  
  /**
   * Determina si una sección es intro o solo
   */
  export const esIntroOSolo = (nombreSeccion, tipo = 'intro') => {
    if (!nombreSeccion) return false;
    
    const nombreLower = nombreSeccion.toLowerCase();
    
    if (tipo === 'intro') {
      return nombreLower.includes('intro') || 
             nombreLower.includes('introducción') ||
             nombreLower.includes('entrada');
    }
    
    if (tipo === 'solo') {
      return nombreLower.includes('solo') || 
             nombreLower.includes('instrumental') ||
             nombreLower.includes('lead');
    }
    
    return false;
  };
  
  /**
   * Procesa una línea de acordes para formateo óptimo
   * Ejemplo: ["D", "A7"] → "D     A7" en misma línea
   */
  export const formatearLineaAcordes = (acordes, config = {}) => {
    if (!acordes || !Array.isArray(acordes) || acordes.length === 0) {
      return [];
    }
    
    const { esIntro = false, esSolo = false, transposicion = 0 } = config;
    const resultado = [];
    
    // Si es intro o solo, usar guiones y espacios normales
    if (esIntro || esSolo) {
      acordes.forEach((acorde, index) => {
        // Agregar acorde
        resultado.push({
          tipo: 'acorde',
          contenido: normalizarParaRenderizado(acorde)
        });
        
        // Agregar separador (guión) si no es el último
        if (index < acordes.length - 1) {
          resultado.push({
            tipo: 'separador',
            contenido: ' - '
          });
          
          // Agregar espacio adicional
          resultado.push({
            tipo: 'espacio',
            contenido: ' '
          });
        }
      });
    } 
    // Para acordes normales, usar espacios grandes
    else {
      acordes.forEach((acorde, index) => {
        // Agregar acorde
        resultado.push({
          tipo: 'acorde',
          contenido: normalizarParaRenderizado(acorde)
        });
        
        // Agregar espacios grandes entre acordes (no al final)
        if (index < acordes.length - 1) {
          resultado.push({
            tipo: 'espacio',
            contenido: '   '
          });
        }
      });
    }
    
    return resultado;
  };
  
  /**
   * Optimiza contenido completo para visualización
   */
  export const optimizarContenidoParaVisualizacion = (contenido, config = {}) => {
    if (!contenido || !Array.isArray(contenido)) return [];
    
    const { modo = 'vertical', forceCompact = false, lineasTotales = 0, necesitaCompactar = false } = config;
    
    return contenido.map(elemento => {
      if (!elemento) return elemento;
      
      const elementoOptimizado = { ...elemento };
      
      // Optimizar secciones
      if (elemento.type === 'section') {
        if (elemento.name) {
          elementoOptimizado.name = elemento.name.trim();
        }
        
        // Optimizar líneas de la sección
        if (elemento.lines && Array.isArray(elemento.lines)) {
          elementoOptimizado.lines = optimizarLineasSeccion(elemento.lines, {
            esIntro: esIntroOSolo(elemento.name, 'intro'),
            esSolo: esIntroOSolo(elemento.name, 'solo'),
            forceCompact: forceCompact || necesitaCompactar
          });
        }
      }
      
      // Optimizar voces
      if (elemento.type === 'voice') {
        if (elemento.name) {
          elementoOptimizado.name = elemento.name
            .replace('VOZ ', 'V')
            .replace('º', '')
            .replace('1º ', 'V1 ')
            .replace('2º ', 'V2 ')
            .replace('ALE', 'A')
            .replace('PATO', 'P')
            .trim();
        }
        
        if (elemento.lines && Array.isArray(elemento.lines)) {
          elementoOptimizado.lines = optimizarLineasSeccion(elemento.lines, {
            forceCompact: forceCompact || necesitaCompactar
          });
        }
      }
      
      // Optimizar líneas individuales de acordes
      if (elemento.type === 'chord' || elemento.type === 'chords') {
        // Asegurar que los acordes se muestren en la misma línea
        if (Array.isArray(elemento.content)) {
          // Si hay pocos acordes, mantenerlos juntos
          if (elemento.content.length <= 3) {
            elementoOptimizado.content = elemento.content;
          } else {
            // Para muchos acordes, intentar agrupar
            elementoOptimizado.content = agruparAcordesParaLinea(elemento.content);
          }
        }
      }
      
      return elementoOptimizado;
    });
  };
  
  /**
   * Optimiza líneas de una sección
   */
  const optimizarLineasSeccion = (lineas, config = {}) => {
    if (!lineas || !Array.isArray(lineas)) return lineas;
    
    const { esIntro = false, esSolo = false, forceCompact = false } = config;
    
    return lineas
      .filter(linea => {
        if (!linea) return false;
        
        // Eliminar líneas completamente vacías
        if (linea.type === 'lyric' || linea.type === 'text') {
          const contenido = normalizarParaRenderizado(linea.content);
          return contenido.trim() !== '';
        }
        
        return true;
      })
      .map(linea => {
        if (!linea) return linea;
        
        const lineaOptimizada = { ...linea };
        
        // Acortar texto muy largo si es necesario
        if ((linea.type === 'lyric' || linea.type === 'text') && 
            linea.content && 
            typeof linea.content === 'string') {
          
          if (forceCompact && linea.content.length > 35) {
            lineaOptimizada.content = linea.content.substring(0, 33) + '...';
          }
        }
        
        return lineaOptimizada;
      });
  };
  
  /**
   * Agrupa acordes para mostrar en una sola línea
   */
  const agruparAcordesParaLinea = (acordes) => {
    if (!acordes || !Array.isArray(acordes) || acordes.length === 0) {
      return acordes;
    }
    
    // Si son pocos acordes, mantener todos
    if (acordes.length <= 4) {
      return acordes;
    }
    
    // Para muchos acordes, intentar agrupar lógicamente
    const resultado = [];
    let grupoActual = [];
    
    acordes.forEach((acorde, index) => {
      const acordeStr = normalizarParaRenderizado(acorde);
      
      // Si es un acorde simple, agregar al grupo actual
      if (acordeStr.length <= 4) {
        grupoActual.push(acorde);
      } else {
        // Si el acorde es complejo, procesar grupo actual y empezar nuevo
        if (grupoActual.length > 0) {
          resultado.push(grupoActual.join(' '));
          grupoActual = [];
        }
        resultado.push(acorde);
      }
      
      // Si es el último elemento, procesar grupo actual
      if (index === acordes.length - 1 && grupoActual.length > 0) {
        resultado.push(grupoActual.join(' '));
      }
    });
    
    return resultado;
  };
  
  /**
   * Procesa contenido completo para visualización
   */
  export const procesarContenidoParaVisualizacion = (contenido, config = {}) => {
    if (!contenido || !Array.isArray(contenido)) return [];
    
    const { modo = 'vertical', transposicion = 0, compactado = false } = config;
    
    // Primero optimizar el contenido
    const contenidoOptimizado = optimizarContenidoParaVisualizacion(contenido, {
      modo: modo,
      forceCompact: compactado
    });
    
    return contenidoOptimizado;
  };
  
  // ============================================
  // EXPORT COMPLETO
  // ============================================
  export default {
    analizarContenidoCancion,
    normalizarDatosCancion,
    normalizarParaRenderizado,
    esIntroOSolo,
    formatearLineaAcordes,
    optimizarContenidoParaVisualizacion,
    procesarContenidoParaVisualizacion
  };