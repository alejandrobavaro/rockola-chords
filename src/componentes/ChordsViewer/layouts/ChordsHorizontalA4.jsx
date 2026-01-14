// ============================================
// ARCHIVO: src/componentes/ChordsViewer/layouts/ChordsHorizontalA4.jsx
// OBJETIVO: Vista horizontal con formato mejorado
// MEJORAS: Acordes en azul, misma línea, sin defaultProps
// ============================================

import React, { useMemo } from 'react';

// ============================================
// UTILIDADES (mismas que vertical)
// ============================================
import { 
  normalizarParaRenderizado,
  formatearLineaAcordes,
  esIntroOSolo,
  procesarContenidoParaVisualizacion
} from '../utils/chordsProcessor';

import { transponerAcorde } from '../utils/chordsTransposer';

// ============================================
// COMPONENTE PRINCIPAL: ChordsHorizontalA4
// ============================================
const ChordsHorizontalA4 = ({ 
  contenido = [], 
  cancion = null,
  onChordClick = null,
  transposicion = 0,
  compactado = false,
  showA4Outline = false
}) => {
  
  // ============================================
  // MEMO: Contenido procesado
  // ============================================
  const contenidoProcesado = useMemo(() => {
    if (!contenido || !Array.isArray(contenido)) return [];
    
    return procesarContenidoParaVisualizacion(contenido, {
      modo: 'horizontal',
      transposicion: transposicion,
      compactado: compactado
    });
  }, [contenido, transposicion, compactado]);

  // ============================================
  // FUNCIÓN: Renderizar acorde individual - AZUL
  // ============================================
  const renderAcorde = (acorde, idx, esIntro = false, esSolo = false) => {
    if (!acorde || typeof acorde !== 'string') return null;
    
    const acordeTranspuesto = transponerAcorde(acorde, transposicion);
    const acordeLimpio = normalizarParaRenderizado(acordeTranspuesto).trim();
    
    if (!acordeLimpio || acordeLimpio === '') return null;
    
    const esAcordeClickeable = !['N.C.', '(E)', '-', '–', 'X', '', ' '].includes(acordeLimpio);
    
    if (esAcordeClickeable) {
      return (
        <button
          key={`acorde-${idx}`}
          className="acorde clickable"
          onClick={() => onChordClick && onChordClick(acordeLimpio)}
          title={`Ver diagrama: ${acordeLimpio}`}
          aria-label={`Acorde ${acordeLimpio}`}
          style={{ color: '#0033ff', fontWeight: 'bold' }}
        >
          {acordeLimpio}
        </button>
      );
    }
    
    return (
      <span key={`acorde-${idx}`} className="acorde no-clickable">
        {acordeLimpio}
      </span>
    );
  };

  // ============================================
  // FUNCIÓN: Renderizar línea de acordes - MISMA LÍNEA
  // ============================================
  const renderLineaAcordes = (linea, idx, contexto = {}) => {
    if (!linea) return null;
    
    const { esVozAle = false, esVozPato = false, esIntro = false, esSolo = false } = contexto;
    const claseVoz = esVozAle ? 'linea-ale' : esVozPato ? 'linea-pato' : '';
    const claseCompacta = compactado ? 'compacto' : '';
    
    let acordesArray = [];
    
    if (Array.isArray(linea.content)) {
      acordesArray = linea.content;
    } else if (linea.content) {
      acordesArray = [linea.content];
    }
    
    const acordesFiltrados = acordesArray.filter(acorde => {
      const acordeStr = normalizarParaRenderizado(acorde);
      return acordeStr && acordeStr.trim() !== '';
    });
    
    if (acordesFiltrados.length === 0) return null;
    
    const acordesFormateados = formatearLineaAcordes(acordesFiltrados, {
      esIntro: esIntro,
      esSolo: esSolo,
      transposicion: transposicion
    });
    
    return (
      <div 
        key={`chord-line-${idx}`} 
        className={`linea-acordes ${claseVoz} ${claseCompacta}`}
        data-tipo="acordes"
        data-es-intro={esIntro}
        data-es-solo={esSolo}
      >
        {acordesFormateados.map((item, i) => {
          if (item.tipo === 'acorde') {
            return renderAcorde(item.contenido, i, esIntro, esSolo);
          } else if (item.tipo === 'separador') {
            return (
              <span key={`sep-${i}`} className="separador-acordes">
                {item.contenido}
              </span>
            );
          } else if (item.tipo === 'espacio') {
            return (
              <span key={`esp-${i}`} className="espacio-acordes">
                &nbsp;&nbsp;
              </span>
            );
          }
          return null;
        })}
      </div>
    );
  };

  // ============================================
  // FUNCIÓN: Renderizar línea de letra
  // ============================================
  const renderLineaLetra = (linea, idx, contexto = {}) => {
    if (!linea) return null;
    
    const { esVozAle = false, esVozPato = false } = contexto;
    const claseVoz = esVozAle ? 'linea-ale' : esVozPato ? 'linea-pato' : '';
    const claseCompacta = compactado ? 'compacto' : '';
    
    const letra = normalizarParaRenderizado(linea.content);
    if (!letra || letra.trim() === '') return null;
    
    return (
      <div 
        key={`lyric-${idx}`} 
        className={`linea-letra ${claseVoz} ${claseCompacta}`}
        data-tipo="letra"
      >
        {letra}
      </div>
    );
  };

  // ============================================
  // FUNCIÓN: Renderizar línea de contenido
  // ============================================
  const renderLinea = (linea, idx, contexto = {}) => {
    if (!linea) return null;
    
    switch (linea.type) {
      case 'chord':
      case 'chords':
        return renderLineaAcordes(linea, idx, contexto);
      
      case 'lyric':
        return renderLineaLetra(linea, idx, contexto);
      
      case 'text':
        const texto = normalizarParaRenderizado(linea.content);
        if (!texto || texto.trim() === '') return null;
        
        return (
          <div key={`text-${idx}`} className="linea-texto">
            {texto}
          </div>
        );
      
      default:
        return null;
    }
  };

  // ============================================
  // FUNCIÓN: Renderizar sección musical
  // ============================================
  const renderSeccion = (seccion, idx) => {
    if (!seccion || seccion.type !== 'section') return null;
    
    const nombreSeccion = normalizarParaRenderizado(seccion.name);
    const esIntro = esIntroOSolo(nombreSeccion, 'intro');
    const esSolo = esIntroOSolo(nombreSeccion, 'solo');
    
    return (
      <div 
        key={`section-${idx}`} 
        className="seccion"
        data-tipo="seccion"
        data-nombre={nombreSeccion}
      >
        {nombreSeccion && (
          <div className="titulo-seccion">
            {nombreSeccion.toUpperCase()}
          </div>
        )}
        
        <div className="contenido-seccion">
          {(seccion.lines || []).map((linea, i) => {
            if (!linea) return null;
            
            if (linea.type === 'voice') {
              return renderVoz(linea, i, { esIntro, esSolo });
            }
            
            return renderLinea(linea, i, { esIntro, esSolo });
          })}
        </div>
      </div>
    );
  };

  // ============================================
  // FUNCIÓN: Renderizar voz con etiqueta vertical
  // ============================================
  const renderVoz = (voz, idx, contextoExtra = {}) => {
    if (!voz || voz.type !== 'voice') return null;
    
    const nombreVoz = normalizarParaRenderizado(voz.name);
    const colorVoz = voz.color || '';
    const { esIntro = false, esSolo = false } = contextoExtra;
    
    const esVozAle = colorVoz === 'ale' || 
                    (nombreVoz && (
                      nombreVoz.includes('ALE') || 
                      nombreVoz.includes('VOZ 1') || 
                      nombreVoz.includes('1º VOZ') ||
                      nombreVoz.includes('1VOZ') ||
                      nombreVoz.includes('V1') ||
                      /voz\s*1/i.test(nombreVoz)
                    ));
    
    const esVozPato = colorVoz === 'pato' || 
                     (nombreVoz && (
                       nombreVoz.includes('PATO') || 
                       nombreVoz.includes('VOZ 2') || 
                       nombreVoz.includes('2º VOZ') ||
                       nombreVoz.includes('2VOZ') ||
                       nombreVoz.includes('V2') ||
                       /voz\s*2/i.test(nombreVoz)
                     ));
    
    const claseVoz = esVozAle ? 'voz-ale' : 
                    esVozPato ? 'voz-pato' : 'voz-generica';
    
    return (
      <div 
        key={`voice-${idx}`} 
        className={`voz ${claseVoz}`}
        data-tipo="voz"
        data-color={colorVoz}
      >
        {nombreVoz && (
          <div className="etiqueta-voz-vertical">
            <div className="etiqueta-texto-vertical">
              {nombreVoz.toUpperCase()}
            </div>
          </div>
        )}
        
        <div className="contenido-voz">
          {(voz.lines || []).map((linea, i) => 
            renderLinea(linea, i, { esVozAle, esVozPato, esIntro, esSolo })
          )}
        </div>
      </div>
    );
  };

  // ============================================
  // FUNCIÓN: Renderizar elemento
  // ============================================
  const renderElemento = (elemento, idx) => {
    if (!elemento) return null;
    
    switch (elemento.type) {
      case 'section':
        return renderSeccion(elemento, idx);
      
      case 'voice':
        return renderVoz(elemento, idx);
      
      case 'divider':
        return <div key={`divider-${idx}`} className="divider" />;
      
      default:
        return renderLinea(elemento, idx);
    }
  };

  // ============================================
  // FUNCIÓN: Dividir en 3 columnas
  // ============================================
  const dividirEnTresColumnas = (contenido) => {
    if (!contenido || contenido.length === 0) return [[], [], []];
    
    const tercio = Math.ceil(contenido.length / 3);
    return [
      contenido.slice(0, tercio),
      contenido.slice(tercio, tercio * 2),
      contenido.slice(tercio * 2)
    ];
  };

  const columnas = dividirEnTresColumnas(contenidoProcesado);

  // ============================================
  // RENDER PRINCIPAL
  // ============================================
  return (
    <div 
      className={`chords-horizontal-a4 ${showA4Outline ? 'show-a4-outline' : ''}`}
      data-columnas="3"
      data-compactado={compactado}
    >
      <div className="columnas-container-horizontal">
        {columnas.map((columna, colIdx) => (
          <div key={`col-${colIdx}`} className="columna-a4">
            <div className="columna-contenido">
              {columna.map((elemento, idx) => 
                renderElemento(elemento, idx)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// EXPORT DEL COMPONENTE
// ============================================
export default ChordsHorizontalA4;