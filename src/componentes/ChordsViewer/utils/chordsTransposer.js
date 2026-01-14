// ============================================
// ARCHIVO: src/componentes/ChordsViewer/utils/chordsTransposer.js
// OBJETIVO: Transposición de acordes (mantenido igual)
// ============================================

// Mapeo de notas para transposición
const NOTAS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTAS_SIN_SOSTENIDO = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

/**
 * Transponer un acorde individual
 */
export const transponerAcorde = (acorde, semitonos) => {
  if (!acorde || semitonos === 0 || typeof acorde !== 'string') {
    return acorde;
  }
  
  const acordeStr = acorde.trim();
  
  if (!acordeStr || 
      acordeStr === 'N.C.' || 
      acordeStr === '(E)' || 
      acordeStr === 'X' ||
      acordeStr === '-' ||
      acordeStr === '–') {
    return acorde;
  }
  
  const match = acordeStr.match(/^([A-G][#b]?)/);
  if (!match) return acorde;
  
  const notaBase = match[1];
  const restoAcorde = acordeStr.substring(notaBase.length);
  
  let notaIndex = NOTAS.indexOf(notaBase);
  if (notaIndex === -1) {
    notaIndex = NOTAS_SIN_SOSTENIDO.indexOf(notaBase);
    if (notaIndex === -1) return acorde;
  }
  
  let nuevoIndice = (notaIndex + semitonos) % 12;
  if (nuevoIndice < 0) nuevoIndice += 12;
  
  const usaSostenido = NOTAS.includes(notaBase);
  const nuevaNota = usaSostenido ? NOTAS[nuevoIndice] : NOTAS_SIN_SOSTENIDO[nuevoIndice];
  
  return nuevaNota + restoAcorde;
};

/**
 * Transponer contenido completo de canción
 */
export const transponerContenidoCancion = (contenido, semitonos) => {
  if (!contenido || !Array.isArray(contenido) || semitonos === 0) {
    return contenido;
  }
  
  return contenido.map(elemento => {
    if (!elemento) return elemento;
    
    const elementoTranspuesto = { ...elemento };
    
    if (elemento.lines && Array.isArray(elemento.lines)) {
      elementoTranspuesto.lines = transponerLineas(elemento.lines, semitonos);
    }
    
    if (elemento.type === 'chord' || elemento.type === 'chords') {
      elementoTranspuesto.content = transponerContenidoAcorde(elemento.content, semitonos);
    }
    
    return elementoTranspuesto;
  });
};

/**
 * Transponer líneas individuales
 */
const transponerLineas = (lineas, semitonos) => {
  if (!lineas || !Array.isArray(lineas)) return lineas;
  
  return lineas.map(linea => {
    if (!linea) return linea;
    
    if (linea.type === 'voice') {
      return {
        ...linea,
        lines: transponerLineas(linea.lines, semitonos)
      };
    }
    
    if (linea.type === 'chord' || linea.type === 'chords') {
      return {
        ...linea,
        content: transponerContenidoAcorde(linea.content, semitonos)
      };
    }
    
    return linea;
  });
};

/**
 * Transponer contenido de acorde (puede ser string o array)
 */
const transponerContenidoAcorde = (contenido, semitonos) => {
  if (Array.isArray(contenido)) {
    return contenido.map(item => transponerAcorde(item, semitonos));
  }
  return transponerAcorde(contenido, semitonos);
};

/**
 * Obtener información de transposición
 */
export const obtenerInfoTransposicion = (semitonos, tonoOriginal) => {
  if (semitonos === 0) {
    return {
      texto: `Tono original: ${tonoOriginal}`,
      tonoActual: tonoOriginal,
      semitonos: 0
    };
  }
  
  const direccion = semitonos > 0 ? 'subido' : 'bajado';
  const valorAbsoluto = Math.abs(semitonos);
  const tonos = valorAbsoluto === 1 ? 'semitono' : 'semitonos';
  
  let notaIndex = NOTAS.indexOf(tonoOriginal);
  if (notaIndex === -1) notaIndex = NOTAS_SIN_SOSTENIDO.indexOf(tonoOriginal);
  if (notaIndex === -1) notaIndex = 0;
  
  let nuevoIndice = (notaIndex + semitonos) % 12;
  if (nuevoIndice < 0) nuevoIndice += 12;
  const tonoActual = NOTAS[nuevoIndice];
  
  return {
    texto: `${direccion} ${valorAbsoluto} ${tonos} (${tonoOriginal} → ${tonoActual})`,
    tonoActual: tonoActual,
    semitonos: semitonos,
    direccion: direccion,
    valorAbsoluto: valorAbsoluto
  };
};

/**
 * Calcular tono destino basado en semitonos
 */
export const calcularTonoDestino = (tonoOrigen, semitonos) => {
  if (!tonoOrigen || semitonos === 0) return tonoOrigen;
  
  let notaIndex = NOTAS.indexOf(tonoOrigen);
  if (notaIndex === -1) notaIndex = NOTAS_SIN_SOSTENIDO.indexOf(tonoOrigen);
  if (notaIndex === -1) return tonoOrigen;
  
  let nuevoIndice = (notaIndex + semitonos) % 12;
  if (nuevoIndice < 0) nuevoIndice += 12;
  
  return NOTAS[nuevoIndice];
};

// ============================================
// EXPORT COMPLETO
// ============================================
export default {
  transponerAcorde,
  transponerContenidoCancion,
  obtenerInfoTransposicion,
  calcularTonoDestino
};