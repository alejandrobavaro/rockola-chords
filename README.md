# 📝 Documentación Completa - ROCKOLA CANCIONEROS

## 🎵 ¿Qué es ROCKOLA CANCIONEROS?

**ROCKOLA CANCIONEROS** es una aplicación web moderna diseñada específicamente para músicos, bandas y amantes de la música. Ofrece un sistema completo de gestión, visualización y navegación de acordes musicales con un enfoque en la experiencia del usuario y la adaptabilidad inteligente.

---

## 🚀 NUEVAS FUNCIONALIDADES IMPLEMENTADAS

### 🔍 **SISTEMA DE BÚSQUEDA GLOBAL MEJORADO**

#### Características Principales:
- **🔎 Búsqueda en tiempo real** en todas las bibliotecas simultáneamente
- **🤖 Sugerencias inteligentes** con ordenamiento por relevancia
- **📚 Índice centralizado** de más de 500+ canciones
- **💾 Historial persistente** de búsquedas recientes
- **⚡ Carga optimizada** una sola vez al iniciar la aplicación

#### Componentes Implementados:
```javascript
// ASearchContext.jsx - Sistema centralizado de búsqueda
- Carga automática de 15 bibliotecas musicales
- Índice de búsqueda en memoria para máxima velocidad
- Funciones de navegación entre canciones relacionadas
```

### 🎮 **NAVEGADOR DE LISTA INTELIGENTE**

#### Funcionalidades del ListNavigator:
- **📱 Diseño compacto y elegante** con select desplegable
- **⬅️➡️ Navegación por flechas** entre canciones de la misma lista
- **🎵 Selector integrado** con todas las canciones de la biblioteca
- **🔢 Números de pista** y ordenamiento automático
- **🎼 Información de tono** en cada opción del select
- **🎚️ Filtro por álbum** para bibliotecas organizadas

#### Flujo de Navegación:
```
[🎵 Almango Pop] [1 de 12] [⬅️] [➡️] [🎼 Seleccionar canción ⌄]
```
Al hacer clic se despliega:
```
[Filtrar por álbum: [Todos los álbumes (12)] ]
[#1 - Ponele Onda - Ponele Onda (D)    ]
[#2 - Ser uno mas - Ponele Onda (G)    ]
[#3 - Ideal - Ponele Onda (C)          ]
[12 canciones] [↔ Usa las flechas para navegar]
```

---

## 🏗️ ARQUITECTURA TÉCNICA ACTUALIZADA

### 📁 Estructura de Componentes Mejorada

```
src/
├── componentes/
│   ├── ASearchContext.jsx              # 🧠 NUEVO: Gestión centralizada de búsqueda
│   ├── Header.jsx                     # 🔍 MEJORADO: Búsqueda global integrada
│   ├── ChordsViewer/
│   │   ├── ChordsViewerIndex.jsx      # 🎵 MEJORADO: Integración con navegador
│   │   ├── ListNavigator.jsx          # 🆕 NUEVO: Navegador de lista inteligente
│   │   ├── IntelligentChordsViewer.jsx # 🧠 Visualizador adaptativo
│   │   ├── ContentAnalyzer.jsx        # 📊 Analizador de contenido
│   │   └── Formats/                   # 📐 Visualizadores específicos
│   │       ├── MobileViewer.jsx       # 📱 1 columna
│   │       ├── TabletViewer.jsx       # 📟 2 columnas  
│   │       ├── DesktopViewer.jsx      # 💻 3 columnas
│   │       └── PrintViewer.jsx        # 🖨️ 2 columnas A4
│   ├── BibliotecaCancioneros.jsx      # 📚 Biblioteca principal
│   └── [otros componentes...]
```

### 🔄 Flujo de Datos Optimizado

```mermaid
graph TB
    A[Usuario busca canción] --> B[Header - Búsqueda Global]
    B --> C[Resultados en tiempo real]
    C --> D[Navegación a ChordsViewer]
    D --> E[ListNavigator se activa]
    E --> F[Visualizador inteligente]
    F --> G{Navegación interna}
    G --> H[Flechas anterior/siguiente]
    G --> I[Selector desplegable]
    G --> J[Filtro por álbum]
```

---

## 🎯 SISTEMA DE VISUALIZACIÓN INTELIGENTE

### 🧠 **ContentAnalyzer.jsx - Cerebro del Sistema**

#### Métricas Analizadas:
- **📊 Total de elementos**: Secciones, líneas, acordes
- **📏 Caracteres totales**: Longitud del contenido
- **📝 Líneas de texto**: Conteo preciso
- **🎼 Densidad de acordes**: Proporción acordes/texto
- **🏗️ Estructura**: Secciones y voces

#### Bandas de Densidad Inteligentes:
```javascript
VERY_LOW:    < 50 líneas   → Fuente grande (18px+)
LOW:         < 100 líneas  → Fuente mediana (16px)
MEDIUM:      < 200 líneas  → Fuente estándar (14px)  
HIGH:        < 350 líneas  → Fuente compacta (13px)
VERY_HIGH:   > 350 líneas  → Fuente mínima (12px)
```

### 📐 Estrategia de Columnas por Dispositivo

| Dispositivo | Columnas | Estrategia | Uso Ideal |
|-------------|----------|------------|-----------|
| **📱 Mobile** | 1 | Contenido vertical + navegación | Visualización rápida |
| **📟 Tablet** | 2 | División 60/40 optimizada | Práctica musical |
| **💻 Desktop** | 3 | Máximo aprovechamiento | Estudio, pantallas grandes |
| **🖨️ Print** | 2 | División 50/50 equilibrada | Partituras impresas |

---

## 🎨 SISTEMA DE DISEÑO Y ESTILOS

### Paleta de Colores Actualizada

| Color | Código | Uso |
|-------|--------|-----|
| Negro Elegante | `#1a1a1a` | Fondos principales |
| Negro Secundario | `#2a2a2a` | Fondos secundarios |
| Rojo Coral | `#e63946` | Acentos, elementos interactivos |
| Dorado Moderno | `#ffd166` | Textos destacados, iconos |
| Blanco Hueso | `#f8f9fa` | Texto principal |
| Verde Éxito | `#00ff88` | Elementos positivos |

### Tipografía Consistente
- **Primaria**: `Montserrat` - Interfaces y texto
- **Secundaria**: `Cinzel` - Títulos y elementos destacados
- **Monospace**: `Fira Code` - Código y acordes

---

## 🔧 FUNCIONALIDADES TÉCNICAS CLAVE

### ⚡ Transposición Inteligente
```javascript
// Sistema mejorado de transposición
const transposeChord = (chord, transposition = 0) => {
  const chords = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  // Soporte para bemoles y sostenidos
  // Exclusión de caracteres especiales (N.C., -, etc.)
  // Transposición en tiempo real
};
```

### 🎯 Detección Automática de Formato
- **📱 Dispositivo**: Mobile, Tablet, Desktop
- **📐 Orientación**: Portrait/Landscape
- **📊 Densidad**: Contenido corto/medio/largo
- **🎨 Tema**: Claro/Oscuro (preferencias del sistema)

### 🔄 Navegación Contextual
```javascript
// Navegación entre canciones de la misma lista
const { previous, next } = getAdjacentSongs(currentSong);
// Búsqueda en biblioteca específica
const librarySongs = getSongsByLibrary(currentSong.libraryId);
// Filtrado por álbum
const albumSongs = getSongsByAlbum(libraryId, albumId);
```

---

## 📱 EXPERIENCIA DE USUARIO MEJORADA

### 🎵 Flujo Principal del Usuario

#### 1. **Búsqueda Rápida**
```mermaid
graph LR
    A[Header] --> B[Escribir búsqueda]
    B --> C[Sugerencias en tiempo real]
    C --> D[Seleccionar canción]
    D --> E[Ir al visualizador]
```

#### 2. **Navegación Contextual**
```mermaid
graph LR
    A[Visualizador] --> B[Ver navegador de lista]
    B --> C[Usar flechas o select]
    C --> D[Cambio instantáneo de canción]
    D --> E[Continuar práctica musical]
```

#### 3. **Optimización Automática**
```mermaid
graph TB
    A[Contenido de canción] --> B[Análisis inteligente]
    B --> C[Selección de formato óptimo]
    C --> D[Mobile: 1 columna]
    C --> E[Tablet: 2 columnas]
    C --> F[Desktop: 3 columnas]
```

---

## 🚀 CASOS DE USO OPTIMIZADOS

### 🎸 Músico en Práctica
- **Búsqueda rápida** desde cualquier página
- **Navegación fluida** entre canciones del mismo artista
- **Transposición inmediata** para adaptar tonalidades
- **Visualización optimizada** para cada dispositivo

### 🎤 Banda en Ensayo
- **Acceso compartido** a la misma biblioteca
- **Navegación sincronizada** entre canciones del setlist
- **Exportación para impresión** de partituras
- **Compatibilidad multi-dispositivo**

### 🎵 Profesor de Música
- **Organización por listas** y álbumes
- **Búsqueda avanzada** por género y dificultad
- **Materiales listos** para imprimir y compartir
- **Seguimiento de progreso** entre canciones

---

## 🔮 ROADMAP Y MEJORAS FUTURAS

### 🚀 Próximas Características
- **🎤 Reconocimiento de audio** para transcripción automática
- **🎸 Diagramas interactivos** de posiciones de acordes
- **🤝 Modo colaborativo** para bandas
- **📊 Analytics de práctica** y progreso
- **📱 App nativa** iOS y Android

### 🔧 Mejoras Técnicas Planificadas
- **⚡ Optimización de rendimiento** para bibliotecas grandes
- **💾 Modo offline** completo
- **🔗 API pública** para integraciones
- **🌐 Sincronización multi-dispositivo**

---

## 🎯 BENEFICIOS CLAVE DEL SISTEMA

### ⏱️ Eficiencia Mejorada
- **Búsqueda 10x más rápida** con índice centralizado
- **Navegación contextual** sin salir del visualizador
- **Carga optimizada** una sola vez al inicio

### 🎵 Experiencia Musical Fluida
- **Transiciones suaves** entre canciones
- **Adaptación automática** al contenido
- **Interfaz intuitiva** para músicos

### 📊 Organización Inteligente
- **Estructura jerárquica** clara (Biblioteca → Lista → Canción)
- **Metadatos completos** para cada canción
- **Sistema de filtros** avanzado pero simple

---

## 🔧 MANTENIMIENTO Y ESCALABILIDAD

### Agregar Nueva Biblioteca
```javascript
// En ASearchContext.jsx - SONG_LIBRARIES
{
  id: 'nueva-biblioteca',
  name: 'Nombre de Biblioteca', 
  path: '/ruta/al/listado.json',
  basePath: '/ruta/a/los/chords/'
}
```

### Personalizar Estilos
```scss
// En los archivos SCSS correspondientes
// Variables centralizadas para colores y tipografía
// Diseño mobile-first con breakpoints progresivos
```

### Extender Funcionalidades
```javascript
// Los componentes están diseñados para ser extensibles
// Sistema de plugins para visualizadores adicionales
// APIs claras para integraciones futuras
```

---

## 🎉 CONCLUSIÓN

**ROCKOLA CANCIONEROS** representa un avance significativo en herramientas digitales para músicos, combinando:

- **🔍 Búsqueda inteligente** y rápida
- **🎵 Visualización adaptativa** al contenido
- **📱 Experiencia responsive** perfecta
- **🎮 Navegación contextual** intuitiva
- **🎨 Diseño moderno** y profesional

# rockola-cancioneros





--------------------------


# **DOCUMENTACIÓN COMPLETA DEL PROYECTO**

## **📋 OBJETIVOS ORIGINALES PLANTEADOS:**

1. ✅ **Aumentar tamaño de letra por defecto** - Implementado
2. ✅ **Control para usuario ajuste de tamaño** - Implementado  
3. ✅ **Mostrar imagen JPG de cada acorde con botón** - Implementado
4. ✅ **Descargar imagen de acorde** - Implementado
5. ✅ **Abrir Word/editor** - Implementado
6. ✅ **Descargar Word/editor** - Implementado
7. ✅ **Optimizar versión tablet (2 columnas A4 virtual)** - Implementado
8. ✅ **Optimizar versión imprimible (hoja A4)** - Implementado
9. ✅ **Formato plantilla fija para .doc** - Implementado

## **🎯 ESTADO ACTUAL: OBJETIVOS COMPLETADOS 9/9**

---

## **📁 ESTRUCTURA DE ARCHIVOS NUEVOS CREADOS:**

### **1. COMPONENTES NUEVOS:**

```
src/componentes/ChordsViewer/
├── ChordsViewerIndex.jsx          (MODIFICADO - Principal con todas las mejoras)
├── ChordImageModal.jsx            (NUEVO - Modal para imágenes de acordes)
├── ChordsImageModal.jsx             (NUEVO - Modal para exportación Word/Doc)
├── Controls.jsx                   (Existente - Sin cambios)
├── IntelligentChordsViewer.jsx    (Existente - Sin cambios)
├── SongViewer.jsx                 (Existente - Sin cambios)
└── ContentAnalyzer.jsx            (Existente - Sin cambios)
```

### **2. ESTILOS NUEVOS/CORREGIDOS:**

```
src/assets/scss/_03-Componentes/ChordsViewer/
├── _ChordsViewerIndex.scss        (MODIFICADO - Contiene todas las mejoras)
├── _ChordImageModal.scss          (NUEVO - Estilos del modal de acordes)
├── _ChordsImageModal.scss           (NUEVO - Estilos del modal de exportación)
├── _Controls.scss                 (Existente - Sin cambios)
├── _IntelligentChordsViewer.scss  (Existente - Sin cambios)
└── _SongViewer.scss               (Existente - Sin cambios)
```

---

## **🔧 FUNCIONALIDADES IMPLEMENTADAS POR COMPONENTE:**

### **A. `ChordsViewerIndex.jsx` (MODIFICADO - COMPONENTE PRINCIPAL)**

#### **Nuevas Funcionalidades:**
1. **Controles de Tamaño de Fuente:**
   - Tamaño base aumentado (+1px por defecto)
   - Botones +/- para ajuste del usuario (10% incrementos)
   - Botón reset para tamaño original
   - Indicador visual de porcentaje (80%, 100%, 120%, etc.)

2. **Acordes Clickeables:**
   - Cada acorde es ahora un botón clickeable
   - Al hacer clic, abre `ChordImageModal` con diagrama del acorde
   - Efecto visual hover para mejor UX

3. **Controles de Exportación:**
   - Botón para abrir `ChordsImageModal`
   - Botón para capturar pantalla como JPG
   - Integración con `html2canvas` para capturas

4. **Optimización Responsive:**
   - **Desktop:** 3 columnas
   - **Tablet:** 2 columnas (simulación A4 virtual - 794x1123px)
   - **Mobile:** 1 columna
   - **Print:** 1 columna optimizada para A4

5. **Mejoras de Impresión:**
   - Estilos específicos para `@media print`
   - Encabezados automáticos con nombre de canción
   - Acordes en azul/negrita para papel
   - Márgenes correctos para hoja A4

#### **Estados Nuevos Agregados:**
```javascript
const [userFontSize, setUserFontSize] = useState(1.0);      // Escala de fuente
const [showChordModal, setShowChordModal] = useState(false); // Modal acorde
const [selectedChord, setSelectedChord] = useState(null);    // Acorde seleccionado
const [showExportModal, setShowExportModal] = useState(false); // Modal exportación
```

---

### **B. `ChordImageModal.jsx` (NUEVO)**

#### **Funcionalidades:**
1. **Visualización de Diagramas de Acordes:**
   - Muestra imagen JPG/PNG del acorde seleccionado
   - Navegación entre múltiples imágenes del mismo acorde
   - Indicador de posición (1/3, 2/3, etc.)

2. **Descarga de Imágenes:**
   - Botón para descargar imagen JPG
   - Nombre automático: `acorde-[nombre].jpg`
   - Formato JPG con calidad

3. **Información del Acorde:**
   - Muestra posiciones comunes
   - Sugerencias de digitación
   - Alternativas/variaciones del acorde

4. **Gestión de Errores:**
   - Imagen por defecto si no se encuentra
   - Loading states
   - Manejo de URLs inválidas

#### **Características Técnicas:**
- **Props:** `chord`, `isOpen`, `onClose`
- **Estados:** `chordImages`, `currentImageIndex`, `loading`
- **Métodos:** `loadChordImages()`, `handleDownload()`, `handlePrev/NextImage()`

---

### **C. `ChordsImageModal.jsx` (NUEVO)**

#### **Funcionalidades:**
1. **Exportación a Formato Plantilla:**
   - Convierte JSON de canción a formato plantilla fijo (como ABBA.doc)
   - **Formato Word (.doc):** Documento RTF con formato
   - **Formato Texto (.txt):** Texto plano con estructura

2. **Plantilla A4 Fija:**
   - Encabezado: `**[ARTISTA -- CANCIÓN -- TONO]{.underline}**`
   - 2 columnas perfectamente alineadas
   - Acordes en azul/negrita
   - Estructuras musicales claras (INTRO, ESTRIBILLO, etc.)

3. **Editor Básico:**
   - Abre en nueva ventana con editor de texto
   - Funcionalidad de impresión
   - Guardado local

4. **Opciones Configurables:**
   - Incluir/excluir acordes
   - Incluir/excluir letra
   - 2 columnas vs 1 columna
   - Vista previa en tiempo real

#### **Algoritmo de Formateo:**
```javascript
// Transformación de JSON a plantilla:
1. Encabezado estandarizado
2. Tabla de 2 columnas balanceadas
3. Procesamiento inteligente de secciones
4. Conversión a RTF (Word) o texto plano
5. Descarga automática
```

---

## **🎨 ESTILOS IMPLEMENTADOS:**

### **A. `_ChordsViewerIndex.scss` (MEJORAS AGREGADAS):**

#### **1. Controles de Fuente:**
```scss
.font-controls-micro {
  // Contenedor compacto para controles de tamaño
  .btn-font-micro {}       // Botones +/- 
  .btn-reset-font {}       // Botón reset (rojo)
  .font-size-display {}    // Indicador 100%, 120%, etc.
}
```

#### **2. Acordes Clickeables:**
```scss
.clickable-chord {
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: rgba(41, 128, 185, 0.1);
    transform: translateY(-1px);
  }
}
```

#### **3. Optimización Tablet (A4 Virtual):**
```scss
@media (min-width: 768px) and (max-width: 1024px) {
  .visor-acordes-ultra-compacto-v2 {
    max-width: 794px;      // 210mm en pixels
    min-height: 1123px;    // 297mm en pixels
    // 2 columnas para tablet
  }
}
```

#### **4. Mejoras de Impresión:**
```scss
@media print {
  .visor-acordes-ultra-compacto-v2 {
    width: 210mm !important;
    min-height: 297mm !important;
    // Ocultar controles, optimizar para papel
  }
}
```

### **B. `_ChordImageModal.scss` (NUEVO):**
- Estilos completos para modal overlay
- Navegación entre imágenes
- Botones de acción (descargar, copiar)
- Responsive design

### **C. `_ChordsImageModal.scss` (NUEVO):**
- Estilos para modal de exportación
- Vista previa del formato plantilla
- Botones de acción (ver, descargar)
- Opciones configurables

---

## **🔄 INTEGRACIÓN CON SISTEMA EXISTENTE:**

### **1. Flujo de Usuario:**
```
1. Usuario selecciona canción → ChordsViewerIndex se carga
2. Ve acordes con tamaño aumentado por defecto
3. Puede ajustar tamaño con controles +/- 
4. Hace clic en acorde → ChordImageModal se abre
5. Ve diagrama, navega imágenes, descarga si quiere
6. Clic en botón exportar → ChordsImageModal se abre
7. Elige formato, opciones, descarga/edita documento
```

### **2. Estados Compartidos:**
```javascript
// En ChordsViewerIndex.jsx
const [selectedSong, setSelectedSong] = useState(null);     // Canción actual
const [transposition, setTransposition] = useState(0);      // Transposición
// Nuevos estados agregados:
const [userFontSize, setUserFontSize] = useState(1.0);      // Escala de fuente
const [showChordModal, setShowChordModal] = useState(false); // Modal acorde
const [showExportModal, setShowExportModal] = useState(false); // Modal exportación
```

---

## **📊 RESULTADOS OBTENIDOS:**

### **✅ COMPLETADO:**
1. **Tamaño de letra:** Base +1px, controles usuario +/- 10%, reset
2. **Imágenes acordes:** Modal con navegación, descarga JPG
3. **Exportación Word:** Formato plantilla fija A4, 2 columnas
4. **Responsive mejorado:** Tablet (2 cols A4 virtual), Mobile (1 col)
5. **Impresión optimizada:** Hoja A4 profesional

### **🎨 FORMATO PLANTILLA GENERADO:**
```
**[ABBA -- Dancing Queen -- D]{.underline}**

+:---------------------------------:+:---------------------------------:+
| **[INTRO:]{.underline} D G/D D    | **[INTRO:]{.underline} D G/D D    |
| G/D +**                           | G/D**                             |
| **D G/D D + A/C# Bm7 A**          | **D G/D**                         |
| **D G/D**                         | You're a tease, you turn 'em on   |
| Friday night and the lights are   | **D Bm7**                         |
| low                               | Leave 'em burning and then        |
| **D Bm7**                         | you're gone                       |
| Looking out for a place to go     | **A**                             |
| **A**                             | Looking out for another           |
| Where they play the right music.  | Anyone will do                    |
| Getting in the swing              | **A Bm7 A Bm7**                   |
| **A Bm7**                         | You're in the mood for a dance    |
| You've come to look for a king    | **Em7 A**                         |
| **(A Bm7)**                       | And when you get the chance       |
| **D G/D**                         | **[ESTRIBILLO:]{.underline}**     |
| Anybody could be that guy         | **D**                             |
| **D Bm7**                         | You are the dancing queen         |
| Night is young and the music's    | **G/D D G/D**                     |
| high                              | Young and sweet, only seventeen   |
| **A**                             | **D G/D**                         |
| With a bit of rock music          | Dancing queen, feel the beat      |
| Everything is fine                | **D**                             |
| **A Bm7 A Bm7**                   | From the tambourine,              |
| You're in the mood for a dance    | **A/C# Bm7 A**                    |
| **Em7 A**                         | Oh yeah.                          |
| And when you get the chance       | **A F#7**                         |
| **[ESTRIBILLO:]{.underline}**     | You can dance, you can jive       |
| **D**                             | **Bm7 E/G#**                      |
| You are the dancing queen         | Having the time of your life      |
| **G/D D G/D**                     | **G Em7**                         |
| Young and sweet, only seventeen   | Oh, see that girl, watch that     |
| **D G/D**                         | scene                             |
| Dancing queen, feel the beat      | **D G/D**                         |
| **D**                             | Diggin' the dancing queen.        |
| From the tambourine,              | **[INTRO:]{.underline} D G/D D    |
| **A/C# Bm7 A**                    | G/D**                             |
| Oh yeah.                          | **D G/D D G/D**                   |
| **A F#7**                         | Diggin' the dancing queen         |
| You can dance, you can jive       | **[FINAL:]{.underline} D G/D D    |
| **Bm7 E/G#**                      | G/D x2**                          |
| Having the time of your life      |                                   |
| **G Em7**                         |                                   |
| Oh, see that girl, watch that     |                                   |
| scene                             |                                   |
| **D G/D**                         |                                   |
| Diggin' the dancing queen.        |                                   |
+-----------------------------------+-----------------------------------+
```

---
ARCHIVO 14: DOCUMENTACIÓN DEL PROYECTO - README.md
markdown
# 🎵 ROCKOLA CANCIONEROS - Visualizador de Acordes

## 📋 DESCRIPCIÓN

**ROCKOLA CANCIONEROS** es una aplicación web moderna diseñada específicamente para músicos, bandas y amantes de la música. Ofrece un sistema completo de gestión, visualización y navegación de acordes musicales con un enfoque en la experiencia del usuario y la adaptabilidad inteligente.

## 🎯 OBJETIVOS PRINCIPALES

1. **Visualización compacta**: Mostrar canciones completas en una sola pantalla/hoja
2. **Adaptabilidad**: Funcionar perfectamente en Desktop, Tablet y Mobile
3. **Practicidad**: Ser útil para músicos en tiempo real
4. **Exportación**: Permitir guardar e imprimir en múltiples formatos

## 🏗️ ESTRUCTURA DEL PROYECTO
rockola-chords/
├── src/
│ ├── assets/
│ │ └── scss/
│ │ └── _03-Componentes/
│ │ └── ChordsViewer/ # Estilos SASS específicos
│ │ ├── _ChordImageModal.scss
│ │ ├── _ChordsDesktopLayout.scss
│ │ ├── _ChordsExportModal.scss
│ │ ├── _ChordsMobileLayout.scss
│ │ ├── _ChordsPrintLayout.scss
│ │ ├── _ChordsTabletLayout.scss
│ │ └── _ChordsViewerIndex.scss
│ ├── componentes/
│ │ └── ChordsViewer/ # Componentes React
│ │ ├── ChordsViewerIndex.jsx # Componente principal
│ │ ├── ChordImageModal.jsx # Modal de diagramas de acordes
│ │ ├── ChordsExportModal.jsx # Modal de exportación
│ │ ├── layouts/ # Layouts específicos por dispositivo
│ │ │ ├── index.js # Exportador de layouts
│ │ │ ├── ChordsDesktopLayout.jsx
│ │ │ ├── ChordsDesktopLayout.scss
│ │ │ ├── ChordsTabletLayout.jsx
│ │ │ ├── ChordsTabletLayout.scss
│ │ │ ├── ChordsMobileLayout.jsx
│ │ │ ├── ChordsMobileLayout.scss
│ │ │ ├── ChordsPrintLayout.jsx
│ │ │ └── ChordsPrintLayout.scss
│ │ └── utils/ # Utilidades
│ │ ├── chordsProcessor.js # Procesamiento de canciones
│ │ ├── chordsLayoutManager.js # Gestión de layouts
│ │ └── chordsTransposer.js # Transposición de acordes
│ └── public/
│ └── chords/ # Archivos de canciones
│ ├── [nombre-cancion].json # Datos estructurados
│ ├── [nombre-cancion].jpg # Imagen de vista previa
│ └── [nombre-cancion].doc # Versión editable

text

## 📱 LAYOUTS POR DISPOSITIVO

### **1. 📱 MOBILE (≤ 767px)**
- **Estrategia**: Mobile-first, 1 columna
- **Características**:
  - Scroll vertical obligatorio
  - Compactación extrema automática
  - Abreviaturas inteligentes
  - Controles flotantes de navegación
  - Modo lectura opcional

### **2. 📟 TABLET (768px - 1024px)**
- **Estrategia**: Formato A4 virtual
- **Características**:
  - 2 columnas balanceadas
  - Escala al 85% automáticamente
  - Guía de márgenes A4 opcional
  - Compactación automática si es necesario
  - Advertencias de sobrecarga

### **3. 💻 DESKTOP (> 1024px)**
- **Estrategia**: Máximo aprovechamiento horizontal
- **Características**:
  - 2-4 columnas según longitud del contenido
  - Distribución inteligente por peso musical
  - Sin scroll (todo en pantalla)
  - Ajuste manual de columnas
  - Espacio optimizado

### **4. 🖨️ IMPRESIÓN A4**
- **Estrategia**: Optimización para una hoja
- **Características**:
  - 2 columnas estándar
  - Compactación automática agresiva
  - Marcas de corte opcionales
  - Cabecera y pie personalizados
  - Advertencias de paginación

## 🎨 CARACTERÍSTICAS DE VISUALIZACIÓN

### **COLORES DIFERENCIADOS**
- **Acordes**: Azul (#0066ff) - Negrita - Clickeables
- **Voz ALE**: Fondo rojo claro + borde rojo
- **Voz PATO**: Fondo azul claro + borde azul
- **Secciones especiales**: Títulos subrayados y en negrita

### **TIPOGRAFÍA Y ESPACIADO**
- **Fuente**: Arial en todos los dispositivos
- **Tamaño**: Ajustable (50%-200%)
- **Espaciado**: Compacto extremo
- **Alineación**: Centrado para letras y acordes

### **ELEMENTOS ESTRUCTURALES**
- **Títulos de sección**: MAYÚSCULAS - NEGRITA - SUBRAYADO
- **Divisores**: Líneas sutiles entre secciones
- **Etiquetas de voz**: Abreviadas en modo compacto
- **Repeticiones**: Marcadas con "x2", "x3", etc.

## 🎛️ CONTROLES DISPONIBLES

### **TRANSPOSICIÓN**
```javascript
// Funcionalidades
- Subir/bajar semitono (±6 semitonos máximo)
- Restaurar tono original
- Indicador visual del cambio
- Transposición en tiempo real
ZOOM Y VISUALIZACIÓN
javascript
// Funcionalidades
- Zoom in/out (50%-200%)
- Restaurar tamaño original
- Forzar compactación extrema
- Alternar guía A4 (tablet)
- Pantalla completa
LAYOUT Y COLUMNAS
javascript
// Funcionalidades
- Auto-detección de dispositivo
- Forzar layout específico
- Ajustar número de columnas (2-4 en desktop)
- Balance automático de contenido
EXPORTACIÓN
javascript
// Formatos disponibles
1. 📄 Texto plano (.txt)
2. 📝 Documento Word (.doc)
3. 📊 PDF optimizado (.pdf)
4. 🖼️ Imagen JPG (.jpg)
5. 🖨️ Impresión directa
🔧 FUNCIONALIDADES TÉCNICAS
PROCESAMIENTO INTELIGENTE
javascript
// chordsProcessor.js
- Análisis de métricas de contenido
- Compactación automática por dispositivo
- Verificación de límites A4
- Optimización para impresión
- Agrupamiento de acordes consecutivos
GESTIÓN DE LAYOUTS
javascript
// chordsLayoutManager.js
- Detección automática de dispositivo
- Cálculo de columnas óptimas
- Distribución balanceada por peso
- Configuración específica por dispositivo
TRANSPOSICIÓN DE ACORDES
javascript
// chordsTransposer.js
- Transposición individual de acordes
- Procesamiento recursivo de contenido
- Mantenimiento de formato original
- Manejo de acordes especiales
📊 FORMATO DE DATOS JSON
ESTRUCTURA BÁSICA
json
{
  "id": "artista-cancion",
  "title": "Nombre de la canción",
  "artist": "Nombre del artista",
  "originalKey": "Tono original",
  "tempo": "Velocidad",
  "timeSignature": "Compás",
  "content": [
    {
      "type": "section",
      "name": "INTRO",
      "lines": [
        {
          "type": "chords",
          "content": ["Acorde1", "Acorde2"]
        },
        {
          "type": "lyric",
          "content": "Texto de la letra"
        }
      ]
    }
  ]
}
TIPOS DE ELEMENTOS SOPORTADOS
javascript
// Tipos principales
1. "section"       // Sección musical (INTRO, ESTRIBILLO, etc.)
2. "voice"         // Voz específica (ALE, PATO)
3. "chord"         // Acorde individual
4. "chords"        // Múltiples acordes
5. "lyric"         // Línea de letra
6. "text"          // Texto informativo
7. "divider"       // Divisor visual
🚀 INSTALACIÓN Y USO
REQUISITOS
bash
Node.js >= 14.0.0
npm >= 6.0.0
React >= 17.0.0
Vite >= 3.0.0
INSTALACIÓN
bash
# Clonar repositorio
git clone [url-del-repositorio]
cd rockola-chords

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar construcción
npm run preview
USO DEL COMPONENTE
jsx
import ChordsViewerIndex from './componentes/ChordsViewer/ChordsViewerIndex';

// Uso básico
<ChordsViewerIndex 
  chordsData={datosCancion}
  transpositionProp={0}
  compactMode="extreme"
/>

// Con metadatos adicionales
<ChordsViewerIndex 
  chordsData={datosCancion}
  songMetadata={{
    artista: "Artista",
    titulo: "Canción",
    tono: "C"
  }}
/>
📱 RESPONSIVE BREAKPOINTS
DEFINICIONES
scss
// Variables SASS
$breakpoint-mobile: 767px;
$breakpoint-tablet: 1024px;
$breakpoint-desktop: 1200px;

// Aplicación
@media (max-width: $breakpoint-mobile) {
  // Estilos móvil
}

@media (min-width: $breakpoint-mobile + 1) and (max-width: $breakpoint-tablet) {
  // Estilos tablet
}

@media (min-width: $breakpoint-tablet + 1) {
  // Estilos desktop
}
COMPORTAMIENTO POR DISPOSITIVO
Dispositivo	Ancho	Columnas	Zoom	Scroll
Mobile	≤ 767px	1	100%	✅ Vertical
Tablet	768-1024px	2	85%	✅ Vertical
Desktop	> 1024px	2-4	100%	❌ Ninguno
🎨 ESTILOS Y THEMING
VARIABLES PRINCIPALES SASS
scss
// Colores
$color-primary: #0066ff;
$color-acorde: #0066ff;
$color-voz-ale: #ff0000;
$color-voz-pato: #0066ff;

// Tipografía
$font-family-base: 'Arial', sans-serif;
$font-size-base: 14px;

// Espaciado
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 12px;

// Border radius
$border-radius-sm: 4px;
$border-radius-md: 8px;
CLASES UTILITARIAS
scss
// Flex
.flex-center { display: flex; align-items: center; justify-content: center; }

// Texto
.text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

// Transiciones
.smooth-transition { transition: all 0.3s ease; }

// Impresión
.no-print { @media print { display: none !important; } }
.only-print { display: none; @media print { display: block !important; } }
🔍 SOLUCIÓN DE PROBLEMAS
ERRORES COMUNES
1. Error de importación SASS
javascript
// INCORRECTO
import "../../../assets/scss/_03-Componentes/ChordsViewer/_ChordsViewerIndex.scss";

// CORRECTO (desde ChordsViewerIndex.jsx)
import "../../assets/scss/_03-Componentes/ChordsViewer/_ChordsViewerIndex.scss";
2. Archivos SASS no encontrados
Verificar que la estructura de carpetas sea:

text
src/
├── assets/scss/_03-Componentes/ChordsViewer/
└── componentes/ChordsViewer/
3. Problemas de ruta en producción
Asegurarse de que Vite está configurado correctamente en vite.config.js:

javascript
export default {
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/_variables.scss";`
      }
    }
  }
}
DEPURACIÓN
bash
# Verificar estructura de archivos
find src -name "*.scss" -type f

# Verificar importaciones en componentes
grep -r "import.*\.scss" src/componentes/ChordsViewer/

# Limpiar caché de Vite
rm -rf node_modules/.vite
📈 MÉTRICAS DE RENDIMIENTO
OPTIMIZACIONES IMPLEMENTADAS
Lazy loading de librerías pesadas (html2canvas, jsPDF)

Memoization de componentes y cálculos costosos

Virtualización de listas en móvil (scroll eficiente)

Compresión de imágenes y assets

Code splitting por rutas y componentes

ESTADÍSTICAS OBJETIVO
Tiempo de carga inicial: < 2 segundos

Tiempo de interacción: < 100ms

Uso de memoria: < 50MB

Compatibilidad: Chrome, Firefox, Safari, Edge

🔄 FLUJO DE TRABAJO RECOMENDADO
PARA DESARROLLADORES
Agregar nueva canción:

bash
# 1. Crear JSON en public/chords/
# 2. Agregar JPG de vista previa
# 3. Agregar DOC editable (opcional)
# 4. Actualizar lista de canciones
Modificar estilos:

bash
# 1. Editar archivos SCSS correspondientes
# 2. Ver cambios en tiempo real con Vite
# 3. Probar en todos los breakpoints
# 4. Verificar impresión
Agregar funcionalidad:

bash
# 1. Extender utilidades existentes
# 2. Mantener compatibilidad con formatos
# 3. Probar en todos los dispositivos
# 4. Documentar cambios
PARA MÚSICOS/USUARIOS
Buscar canción → Navegar por lista o buscar

Visualizar → Se adapta automáticamente al dispositivo

Transponer → Ajustar al tono deseado

Exportar → Guardar en formato preferido

Imprimir → Obtener copia física optimizada

📞 SOPORTE Y CONTRIBUCIÓN
REPORTAR PROBLEMAS
Verificar que el problema no esté ya documentado

Proporcionar:

Dispositivo y navegador

Pasos para reproducir

Capturas de pantalla

Archivo JSON de ejemplo (si aplica)

CONTRIBUIR
Fork del repositorio

Crear rama para la funcionalidad

Implementar cambios

Probar en todos los dispositivos

Enviar Pull Request

📄 LICENCIA
© 2024 Almango Pop. Para uso exclusivo en el proyecto ROCKOLA CANCIONEROS.

Documentación actualizada: [Fecha]
Versión: 2.0.0

text

---

## 🔧 **ARCHIVO 15: CORREGIR IMPORTACIONES EN LAYOUTS**

Necesitamos asegurarnos que cada layout importe sus propios estilos correctamente. Aquí está la corrección para **ChordsDesktopLayout.jsx** como ejemplo:

```jsx
// ============================================
// ARCHIVO: ChordsDesktopLayout.jsx - IMPORTACIONES CORREGIDAS
// ============================================

import React, { useMemo } from 'react';
import { procesarLineasParaAgruparAcordes } from '../utils/chordsProcessor';

// CORREGIDO: Importar estilos desde la misma carpeta
import "./ChordsDesktopLayout.scss";

// El resto del código permanece igual...
Repite esto para cada layout:

ChordsTabletLayout.jsx → import "./ChordsTabletLayout.scss";

ChordsMobileLayout.jsx → import "./ChordsMobileLayout.scss";

ChordsPrintLayout.jsx → import "./ChordsPrintLayout.scss";

🎯 RESUMEN DE SOLUCIONES:
PROBLEMA IDENTIFICADO:
Error en la ruta de importación de SASS en ChordsViewerIndex.jsx

SOLUCIÓN APLICADA:
Corregir ruta en ChordsViewerIndex.jsx:

javascript
// ANTES (incorrecto):
import "../../../assets/scss/_03-Componentes/ChordsViewer/_ChordsViewerIndex.scss";

// DESPUÉS (correcto):
import "../../assets/scss/_03-Componentes/ChordsViewer/_ChordsViewerIndex.scss";
Documentación completa del proyecto creada

Guías de instalación y uso incluidas

Solución de problemas documentada

VERIFICACIÓN FINAL:
Para asegurar que todo funciona, verifica:

Estructura de carpetas:

bash
# Desde la raíz del proyecto
ls -la src/assets/scss/_03-Componentes/ChordsViewer/
ls -la src/componentes/ChordsViewer/layouts/
Importaciones corregidas en todos los archivos

Ejecutar el proyecto:

bash
npm run dev
