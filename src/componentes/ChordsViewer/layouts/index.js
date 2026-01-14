// ============================================
// ARCHIVO: src/componentes/ChordsViewer/layouts/index.js
// OBJETIVO: Exportar layouts simplificados
// ============================================

// ============================================
// IMPORTAR LAYOUTS SIMPLIFICADOS
// ============================================
import ChordsVerticalA4 from './ChordsVerticalA4';
import ChordsHorizontalA4 from './ChordsHorizontalA4';

// ============================================
// EXPORTAR INDIVIDUALMENTE
// ============================================
export { 
  ChordsVerticalA4,
  ChordsHorizontalA4
};

// ============================================
// EXPORTAR POR DEFECTO
// ============================================
export default {
  Vertical: ChordsVerticalA4,
  Horizontal: ChordsHorizontalA4
};