// ============================================
// ARCHIVO: App.jsx - VERSIÓN COMPLETA MEJORADA
// DESCRIPCIÓN: Componente principal de la aplicación con nueva página de inicio
// MEJORAS: Nueva página de inicio marketingera con todos los componentes nuevos
// ============================================

// ======================================================
// IMPORTACIONES DE LIBRERÍAS EXTERNAS
// ======================================================
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/scss/estilo.scss";

// ======================================================
// IMPORTACIONES DE COMPONENTES PROPIOS - NUEVA PÁGINA DE INICIO
// ======================================================
import Header from "./componentes/Header";
import MainHomeContent from "./componentes/MainHomeContent"; // ✅ NUEVO: Página de inicio mejorada
import MainWhatsappIcon from "./componentes/MainWhatsappIcon";
import MainPublicidadSlider from "./componentes/MainPublicidadSlider";
import Footer from "./componentes/Footer";
import Contacto from "./componentes/Contacto";
import BibliotecaTeoriaMusical from "./componentes/BibliotecaTeoriaMusical";
import ConsultasAyuda from "./componentes/ConsultasAyuda";
import ReproductorVideo from "./componentes/ReproductorVideo"; 
import FormateoPartituras from "./componentes/FormateoPartituras";

// ======================================================
// IMPORTACIONES DEL REPRODUCTOR DE MÚSICA
// ======================================================
import MMusicaEscucha from "./componentes/ReproductorMusica/MMusicaEscucha";
import { MusicaProvider } from "./componentes/ReproductorMusica/MusicaContexto";

// ======================================================
// IMPORTACIONES DEL REPRODUCTOR MULTIPISTA
// ======================================================
import MMultipistaEscucha from "./componentes/ReproductorMultipista/MMultipistaEscucha";
import { MultipistaProvider } from "./componentes/ReproductorMultipista/MultipistaContexto";

// ======================================================
// CONTEXTOS EXISTENTES
// ======================================================
import { SearchProvider } from './componentes/ASearchContext';

// ======================================================
// BIBLIOTECAS DE CANCIONES (SIMPLIFICADO PARA APP.JSX)
// ======================================================
const SONG_LIBRARIES = [
  { 
    id: 'alegondra', 
    name: 'Ale Gondra', 
    path: '/listados/listados-musica-original/listado-musica-alegondra.json', 
    basePath: '/data/01-chords-musica-original/chords-alegondramusic/',
    tipo: 'original'
  },
  { 
    id: 'almangopop', 
    name: 'Almango Pop', 
    path: '/listados/listados-musica-original/listado-musica-almangopop.json', 
    basePath: '/data/01-chords-musica-original/chords-almangopop/',
    tipo: 'original'
  },
  { 
    id: 'covers-baladasespanol', 
    name: 'Baladas Español', 
    path: '/listados/listados-musica-covers/listado-musica-baladasespanol.json', 
    basePath: '/data/02-chords-covers/cancionescovers-baladasespanol/',
    tipo: 'covers'
  },
];

// ======================================================
// DATOS DE EJEMPLO PARA FORMATEO DE PARTITURAS
// ======================================================
const seccionesEjemplo = [
  [
    { tipo: "titulo", texto: "INTRO", voz: "VOZ1" },
    { tipo: "texto", texto: "F#m-D–A–(E)-\n(RIFF 1 - A) + (RIFF 2 + A)\n1º VOZ 1      A\nSomeone told me long before\nE\nThere's a calm before the storm, I know\nA\nAnd it's been coming for some time.", voz: "VOZ1" }
  ],
  [
    { tipo: "titulo", texto: "INTRO", voz: "VOZ2" },
    { tipo: "texto", texto: "1º VOZ 1      A\nYesterday and days before\nE\nSun is cold and rain is hard, I know\nA\nBeen that way for all my time.", voz: "VOZ2" }
  ]
];

// ======================================================
// COMPONENTE PRINCIPAL - APLICACIÓN
// ======================================================
function App() {
  return (
    <MusicaProvider>
      <SearchProvider>
        <MultipistaProvider>
          <Router>
            <div className="App">
              
              {/* ======================================================
                  HEADER DE LA APLICACIÓN
              ====================================================== */}
              <Header />
              <hr className="section-divider" />
              
              {/* ======================================================
                  CONTENIDO PRINCIPAL
              ====================================================== */}
              <div className="main-content">
                <div className="content">
                  <Routes>
                    
                    {/* ==============================================
                        RUTA PRINCIPAL - NUEVA PÁGINA DE INICIO
                    ============================================== */}
                    <Route path="/" element={<MainHomeContent />} />
                    
                    {/* ==============================================
                        MÚSICA - REPRODUCTOR CON VISUALIZADOR DE ACORDES
                    ============================================== */}
                    <Route path="/musica" element={
                      <MMusicaEscucha 
                        songLibraries={SONG_LIBRARIES}
                        defaultCategory="original"
                      />
                    } />
                    
                    {/* ==============================================
                        REPRODUCTOR MULTIPISTA MEJORADO
                    ============================================== */}
                    <Route path="/multipista" element={<MMultipistaEscucha />} />
                    
                    {/* ==============================================
                        VIDEOS - REPRODUCTOR DE VIDEO
                    ============================================== */}
                    <Route path="/Videos" element={<ReproductorVideo />} />
                    
                    {/* ==============================================
                        TEORÍA MUSICAL Y RECURSOS
                    ============================================== */}
                    <Route path="/formateo-chords" element={<BibliotecaTeoriaMusical />} />
                    
                    {/* ==============================================
                        FORMATEO DE PARTITURAS PROFESIONAL
                    ============================================== */}
                    <Route path="/chords-format" element={
                      <FormateoPartituras
                        titulo="Creedence - Have You Ever Seen The Rain"
                        tono="A"
                        secciones={seccionesEjemplo}
                      />
                    }/>
                    
                    {/* ==============================================
                        CONTACTO Y SOPORTE
                    ============================================== */}
                    <Route path="/contacto" element={<Contacto />} />
                    
                    {/* ==============================================
                        AYUDA Y CONSULTAS
                    ============================================== */}
                    <Route path="/ayuda" element={<ConsultasAyuda />} />
                    
                    {/* ==============================================
                        RUTA COMODÍN - REDIRIGE A INICIO
                    ============================================== */}
                    <Route path="*" element={<MainHomeContent />} />
                    
                  </Routes>
                </div>
              </div>
              
              {/* ======================================================
                  ELEMENTOS ADICIONALES
              ====================================================== */}
              <hr className="section-divider" />
              <MainPublicidadSlider />
              <Footer />
              <MainWhatsappIcon />
              
            </div>
          </Router>
        </MultipistaProvider>
      </SearchProvider>
    </MusicaProvider>
  );
}

export default App;