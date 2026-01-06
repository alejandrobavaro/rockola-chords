// ============================================
// ARCHIVO: musicDataService.jsx - VERSIÓN COMPLETA Y CORREGIDA
// DESCRIPCIÓN: Servicio completo para cargar datos musicales de 5 categorías
// CORRECCIÓN CRÍTICA: Asegurar que todos los homenajes aparezcan como bloques separados en los filtros
// RUTAS ACTUALIZADAS: Todas las rutas apuntan a public/listados/
// FECHA: Versión final con corrección para homenajes
// ============================================

// ============================================
// FUNCIÓN: loadMusicData
// DESCRIPCIÓN: Carga datos de un archivo JSON y detecta su formato
// PARÁMETROS: jsonPath - Ruta al archivo JSON
// RETORNO: Configuración procesada para discos/canciones
// ============================================
export const loadMusicData = async (jsonPath) => {
  try {
    console.log(`📥 Cargando: ${jsonPath}`);
    const response = await fetch(jsonPath);

    if (!response.ok) {
      throw new Error(`Archivo no encontrado: ${jsonPath}`);
    }

    const jsonData = await response.json();

    // DETECTAR FORMATO Y TRANSFORMAR
    if (jsonData.artista && jsonData.discografia) {
      // FORMATO 1: ORIGINALES, MEDLEYS, HOMENAJES Y ZAPADAS
      console.log(`🔧 Formato detectado: ${jsonPath}`);
      return transformToConfigDiscos(jsonData);
    } else if (jsonData.name && jsonData.albums) {
      // FORMATO 2: COVERS
      console.log(`🔧 Formato COVER detectado: ${jsonPath}`);
      return transformCoversFormat(jsonData);
    } else {
      console.error(`❌ Formato desconocido en ${jsonPath}:`, jsonData);
      throw new Error(`Formato no reconocido: ${jsonPath}`);
    }

  } catch (error) {
    console.error('Error en loadMusicData:', error);
    throw error;
  }
};

// ============================================
// FUNCIÓN: transformToConfigDiscos - VERSIÓN CORREGIDA PARA HOMENAJES
// DESCRIPCIÓN: Transforma datos del formato original a configuración interna
// CORRECCIÓN CRÍTICA: Asegurar que cada homenaje sea un bloque/disco separado
// ============================================
const transformToConfigDiscos = (artistData) => {
  const config = {};

  // DETECTAR SI ES HOMENAJE POR LA CATEGORÍA
  const esHomenaje = artistData.categoria === 'homenajes' || 
                    (artistData.discografia && artistData.discografia[0]?.genre?.includes('Homenajes'));

  // OBTENER NOMBRE DEL ARTISTA HOMENAJEADO
  let artistaHomenajeado = artistData.artista || 'Artista Desconocido';
  
  // Si el archivo tiene información del nombre del artista homenajeado
  if (artistData._sourceFile && artistData._sourceFile.includes('homenaje-')) {
    const nombreArchivo = artistData._sourceFile.replace('listado-musica-homenaje-', '').replace('.json', '');
    
    // Formatear el nombre para mostrar
    const nombresFormateados = {
      'acdc': 'AC/DC',
      'adams-sting-stewart': 'Adams, Sting & Stewart',
      'aerosmith': 'Aerosmith',
      'alejandro-lerner': 'Alejandro Lerner',
      'andres-calamaro': 'Andrés Calamaro',
      'beatles': 'The Beatles',
      'bon-jovi': 'Bon Jovi',
      'cadillacs-pericos-kapanga': 'Cadillacs, Pericos & Kapanga',
      'ccr': 'Creedence Clearwater Revival',
      'cerati-soda': 'Cerati & Soda Stereo',
      'coldplay': 'Coldplay',
      'diego-torres': 'Diego Torres',
      'divididos': 'Divididos',
      'elton-john-georgemichael': 'Elton John & George Michael',
      'enanitosverdes': 'Enanitos Verdes',
      'garcia-paez-spinetta': 'García, Páez & Spinetta',
      'green-day-offspring': 'Green Day & The Offspring',
      'gunsnroses': 'Guns N\' Roses',
      'inxs': 'INXS',
      'labersuit-vergarabat': 'Bersuit Vergarabat',
      'laley-mana': 'La Ley & Maná',
      'larenga-pappo-redondos-ratones': 'La Renga, Pappo, Redondos & Ratones',
      'lenny-kravitz': 'Lenny Kravitz',
      'los-pijos': 'Los Piojos',
      'michaeljackson': 'Michael Jackson',
      'nirvana-foo-fighters-system': 'Nirvana, Foo Fighters & System',
      'oasis': 'Oasis',
      'philcollins': 'Phil Collins',
      'queen': 'Queen',
      'redhotchili': 'Red Hot Chili Peppers',
      'robbiewilliams': 'Robbie Williams',
      'rolling-stones': 'The Rolling Stones',
      'roxette': 'Roxette',
      'u2': 'U2'
    };
    
    // Usar nombre formateado si existe
    if (nombresFormateados[nombreArchivo]) {
      artistaHomenajeado = nombresFormateados[nombreArchivo];
    } else {
      // Formatear automáticamente
      artistaHomenajeado = nombreArchivo
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  }

  // PARA HOMENAJES: CREAR UN BLOQUE/DISCO POR CADA ARTISTA
  if (esHomenaje) {
    // Usar un ID único para este homenaje
    const artistaSlug = artistaHomenajeado.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const discoId = `homenaje-${artistaSlug}`;

    // PORTADA ESPECÍFICA PARA HOMENAJES
    const portadaDefault = '/img/02-logos/logo-formateo-chords2.png';

    // AGREGAR TODAS LAS CANCIONES DE TODOS LOS DISCOS EN UN SOLO BLOQUE
    let todasLasCanciones = [];
    
    artistData.discografia.forEach((album, albumIndex) => {
      const cancionesAlbum = album.songs.map((song, songIndex) => {
        // ARTISTA DE LA CANCIÓN (el homenajeado)
        const artistaCancion = artistaHomenajeado;
        
        // CONSTRUIR URLs
        let mp3Url = song.mp3_url || song.url || '';
        let chordsUrl = song.chords_url || null;
        
        // Si no hay URL de MP3, intentar construir una
        if (!mp3Url) {
          // Intentar extraer información del ID de la canción
          if (song.id && song.id.includes('-')) {
            const idParts = song.id.split('-');
            if (idParts.length >= 3) {
              const tipo = idParts[0]; // "homenaje"
              const artistaId = idParts[1]; // "acdc", "queen", etc.
              const cancionSlug = song.id.replace(`${tipo}-${artistaId}-`, '');
              mp3Url = `/audio/04-mp3-homenajes/mp3-homenajes-${artistaId}/${artistaId}-${cancionSlug}.mp3`;
            }
          }
        }

        return {
          id: song.id || `homenaje-${artistaSlug}-${albumIndex}-${songIndex}`,
          nombre: song.title,
          artista: artistaCancion,
          duracion: song.duration || '3:30',
          url: mp3Url || '/audio/default-song.mp3',
          chords_url: chordsUrl,
          imagen: album.cover_image || portadaDefault,
          disco: discoId,
          detalles: {
            ...song.details,
            artistaOriginal: artistaHomenajeado,
            categoria: 'homenajes',
            genero: 'Homenajes'
          },
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: (albumIndex * 100) + (songIndex + 1), // Para ordenar
          esHomenaje: true,
          esZapada: false
        };
      });
      
      todasLasCanciones.push(...cancionesAlbum);
    });

    // CREAR UN SOLO DISCO/BLOQUE PARA ESTE HOMENAJE
    config[discoId] = {
      id: discoId,
      nombre: `HOMENAJE A ${artistaHomenajeado.toUpperCase()}`,
      artista: artistaHomenajeado,
      portada: artistData.discografia[0]?.cover_image || portadaDefault,
      año: artistData.discografia[0]?.year || '2024',
      genero: 'Homenajes',
      categoria: 'homenajes',
      canciones: todasLasCanciones,
      // METADATOS ADICIONALES PARA FILTROS
      _esHomenaje: true,
      _artistaOriginal: artistaHomenajeado,
      _totalCanciones: todasLasCanciones.length
    };

  } else {
    // FORMATO ORIGINAL PARA OTRAS CATEGORÍAS
    artistData.discografia.forEach((album, albumIndex) => {
      let artistaNombre = artistData.artista || 'Almango Pop';
      const artistaSlug = artistaNombre.toLowerCase().replace(/\s+/g, '-');
      const discoId = `${artistaSlug}-${album.album_id || albumIndex}`;

      // DETERMINAR PORTADA
      let portadaDefault = '/img/default-cover.png';

      if (album.genre?.includes('Zapadas')) {
        portadaDefault = '/img/300.jpg';
      }

      // NOMBRE DEL DISCO
      let nombreDisco = album.album_name || `Álbum ${albumIndex + 1}`;

      config[discoId] = {
        id: discoId,
        nombre: nombreDisco,
        artista: artistaNombre,
        portada: album.cover_image || portadaDefault,
        año: album.year || '2024',
        genero: album.genre || 'Varios',
        categoria: artistData.categoria || 'original',
        canciones: album.songs.map((song, songIndex) => {
          const artistaCancion = song.artist || artistaNombre;
          
          let mp3Url = song.mp3_url || song.url || '';
          let chordsUrl = song.chords_url || null;

          return {
            id: song.id || `song-${albumIndex}-${songIndex}`,
            nombre: song.title,
            artista: artistaCancion,
            duracion: song.duration || '3:30',
            url: mp3Url || '/audio/default-song.mp3',
            chords_url: chordsUrl,
            imagen: album.cover_image || portadaDefault,
            disco: discoId,
            detalles: song.details || {},
            esMedley: false,
            cancionesIncluidas: 1,
            track_number: song.track_number || songIndex + 1,
            esHomenaje: false,
            esZapada: album.genre?.includes('Zapadas') || false
          };
        })
      };
    });
  }

  return config;
};

// ============================================
// FUNCIÓN: transformCoversFormat
// DESCRIPCIÓN: Transforma datos del formato COVERS a configuración interna
// ============================================
const transformCoversFormat = (coverData) => {
  const config = {};

  // Usar "discografia" en lugar de "discografia"
  coverData.albums.forEach((album, albumIndex) => {
    const artistaSlug = coverData.artist.toLowerCase().replace(/\s+/g, '-');
    const discoId = `${artistaSlug}-${album.album_id || albumIndex}`;

    // PORTADA UNIFICADA PARA COVERS
    const portadaDefault = '/img/09-discos/tapa-listado-covers.jpg';

    config[discoId] = {
      id: discoId,
      nombre: album.album_name || `Covers ${coverData.name}`,
      artista: coverData.artist,
      portada: album.cover_image || portadaDefault,
      año: album.year || '2025',
      genero: album.genre || 'Covers',
      categoria: 'covers',
      canciones: album.songs.map((song, songIndex) => {
        // CONSTRUIR chords_url A PARTIR DEL file Y basePath
        let chordsUrl = null;

        if (song.file) {
          // Ejemplo: file: "alejandro-lerner-juntos-para-siempre.json"
          // basePath: "/data/02-chords-covers/cancionescovers-baladasespanol/"
          chordsUrl = `${coverData.basePath || '/chords/02-cancioneroscovers/'}${song.file}`;
        } else if (song.chords_url) {
          chordsUrl = song.chords_url;
        }

        // CONSTRUIR mp3_url
        let mp3Url = song.mp3_file || song.url || '/audio/default-cover-song.mp3';

        return {
          id: song.id || `song-${albumIndex}-${songIndex}`,
          nombre: song.title,
          artista: song.artist,
          duracion: song.duration || '3:30',
          url: mp3Url,
          chords_url: chordsUrl,
          imagen: album.cover_image || portadaDefault,
          disco: discoId,
          detalles: {
            ...song,
            categoria: coverData.name,
            genero: album.genre,
            style: song.style,
            // Agregar información adicional
            letra: song.details?.letra || '',
            acordes: song.details?.acordes || [],
            bpm: song.bpm || 0,
            key: song.key || '',
            tonalidad: song.details?.tonalidad || '',
            dificultad: song.details?.dificultad || 'Intermedia'
          },
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: song.track_number || songIndex + 1
        };
      })
    };
  });

  console.log(`📊 Covers transformados: ${Object.keys(config).length} discos`);
  return config;
};

// ============================================
// FUNCIÓN: transformZapadasData - VERSIÓN ESPECÍFICA
// DESCRIPCIÓN: Transforma datos de zapadas SIN afectar otras categorías
// ============================================
const transformZapadasData = (zapadasData) => {
  const config = {};

  // DETECTAR SI ES ZAPADA POR EL NOMBRE DEL ARCHIVO
  const esZapada = zapadasData.categoria === 'zapadas' || 
                  (zapadasData.discografia && zapadasData.discografia[0]?.genre?.includes('Zapadas'));

  zapadasData.discografia.forEach((album, albumIndex) => {
    // PARA ZAPADAS, SIEMPRE USAR "Almango Pop" como artista
    const artistaNombre = 'Almango Pop';
    const artistaSlug = artistaNombre.toLowerCase().replace(/\s+/g, '-');
    const discoId = `${artistaSlug}-${album.album_id || albumIndex}`;

    // PORTADA ESPECÍFICA PARA ZAPADAS
    const portadaDefault = '/img/300.jpg';

    // NOMBRE DEL DISCO PARA ZAPADAS
    let nombreDisco = album.album_name || 'ZAPADAS DE TODOS LOS ESTILOS';
    if (!nombreDisco.includes('ZAPADAS')) {
      nombreDisco = 'ZAPADAS DE TODOS LOS ESTILOS';
    }

    config[discoId] = {
      id: discoId,
      nombre: nombreDisco,
      artista: artistaNombre,
      portada: album.cover_image || portadaDefault,
      año: album.year || '2024',
      genero: album.genre || 'Zapadas',
      categoria: 'zapadas',
      canciones: album.songs.map((song, songIndex) => {
        // ARTISTA SIEMPRE "Almango Pop" PARA ZAPADAS
        const artistaCancion = 'Almango Pop';
        
        // CONSTRUIR URL DE MP3 BASADA EN EL ID
        let mp3Url = song.mp3_url || song.url || '';
        let chordsUrl = song.chords_url || null;
        
        // CORRECCIÓN CRÍTICA: Construir URL automática para zapadas
        if (!mp3Url || mp3Url === '/audio/default-song.mp3') {
          // Ejemplo: ID "zapada-rock-001" → estilo: "rock", número: "001"
          const match = song.id.match(/zapada-(\w+)-(\d+)/i);
          if (match) {
            const estilo = match[1].toLowerCase(); // "rock", "blues", etc.
            const numero = match[2]; // "001", "02", etc.
            mp3Url = `/audio/05-mp3-zapadas/mp3-zapadas-${estilo}/mp3-zapadas-${estilo}-${numero}.mp3`;
          }
        }
        
        // CORRECCIÓN CRÍTICA: Construir URL de chords automática
        if (!chordsUrl) {
          const match = song.id.match(/zapada-(\w+)-(\d+)/i);
          if (match) {
            const estilo = match[1].toLowerCase();
            const numero = match[2];
            chordsUrl = `/chords/05-cancioneroszapadas/cancioneroszapadas-${estilo}/cancioneroszapadas-${estilo}-${numero}.json`;
          }
        }

        return {
          id: song.id || `zapada-${albumIndex}-${songIndex}`,
          nombre: song.title,
          artista: artistaCancion,
          duracion: song.duration || '3:30',
          url: mp3Url || '/audio/default-song.mp3',
          chords_url: chordsUrl,
          imagen: album.cover_image || portadaDefault,
          disco: discoId,
          detalles: song.details || {},
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: song.track_number || songIndex + 1,
          esHomenaje: false,
          esZapada: true
        };
      })
    };
  });

  console.log(`🎹 Zapadas transformadas: ${Object.keys(config).length} discos`);
  return config;
};

// ============================================
// FUNCIÓN: loadHomenajesData - VERSIÓN MEJORADA CON LOGS DETALLADOS
// DESCRIPCIÓN: Carga todos los homenajes y asegura que cada uno sea un bloque separado
// ============================================
const loadHomenajesData = async () => {
  try {
    console.log('📥 Cargando HOMENAJES (archivos individuales)...');
    
    // LISTA COMPLETA DE ARCHIVOS DE HOMENAJES (34 archivos según tu lista)
    const homenajesFiles = [
      '/listados/listados-musica-homenajes/listado-musica-homenaje-acdc.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-adams-sting-stewart.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-aerosmith.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-alejandro-lerner.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-andres-calamaro.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-beatles.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-bersuit.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-bon-jovi.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-cadillacs-pericos-kapanga.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-ccr.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-cerati-soda.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-coldplay.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-diego-torres.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-divididos.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-elton-john-georgemichael.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-enanitosverdes.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-garcia-paez-spinetta.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-green-day-offspring.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-gunsnroses.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-inxs.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-laley-mana.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-larenga-pappo-redondos-ratones.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-lenny-kravitz.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-los-pijos.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-michaeljackson.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-nirvana-foo-fighters-system.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-oasis.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-philcollins.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-queen.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-redhotchili.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-robbiewilliams.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-rolling-stones.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-roxette.json',
      '/listados/listados-musica-homenajes/listado-musica-homenaje-u2.json'
    ];

    let homenajesConfig = {};
    let cargasExitosas = 0;
    let cargasFallidas = 0;
    let archivosConProblemas = [];

    console.log(`📋 Total de archivos de homenajes: ${homenajesFiles.length}`);

    // CARGAR CADA ARCHIVO INDIVIDUALMENTE
    for (const file of homenajesFiles) {
      try {
        console.log(`📄 Procesando: ${file}`);
        
        // Extraer nombre del artista del archivo para logging
        const nombreArchivo = file.split('/').pop().replace('.json', '');
        const nombreArtista = nombreArchivo.replace('listado-musica-homenaje-', '');
        
        const response = await fetch(file);
        
        if (!response.ok) {
          console.log(`⚠️ Archivo no encontrado: ${file}`);
          cargasFallidas++;
          archivosConProblemas.push({file, error: `HTTP ${response.status}`});
          continue;
        }

        const responseText = await response.text();
        
        // Verificar si es HTML
        if (responseText.trim().startsWith('<!DOCTYPE') || 
            responseText.trim().startsWith('<html')) {
          console.log(`❌ El archivo devuelve HTML (404): ${file}`);
          cargasFallidas++;
          archivosConProblemas.push({file, error: 'Devuelve HTML (404)'});
          continue;
        }

        // Parsear JSON
        let homenajeData;
        try {
          homenajeData = JSON.parse(responseText);
        } catch (parseError) {
          console.error(`❌ Error parseando JSON: ${file}`, parseError.message);
          cargasFallidas++;
          archivosConProblemas.push({file, error: `JSON inválido: ${parseError.message}`});
          continue;
        }
        
        // VERIFICAR ESTRUCTURA
        if (!homenajeData.artista && !homenajeData.discografia) {
          console.error(`❌ Estructura inválida en ${file}: falta "artista" y "discografia"`);
          cargasFallidas++;
          archivosConProblemas.push({file, error: 'Estructura JSON inválida'});
          continue;
        }

        // AGREGAR INFORMACIÓN DEL ARCHIVO FUENTE
        homenajeData._sourceFile = nombreArchivo;
        
        // FORZAR CATEGORÍA PARA HOMENAJES
        homenajeData.categoria = 'homenajes';
        
        // TRANSFORMAR LOS DATOS
        const config = transformToConfigDiscos(homenajeData);
        
        // VERIFICAR QUE SE CREÓ AL MENOS UN DISCO/BLOQUE
        if (Object.keys(config).length === 0) {
          console.error(`❌ No se crearon discos/bloques para ${file}`);
          cargasFallidas++;
          archivosConProblemas.push({file, error: 'No se generaron discos'});
          continue;
        }
        
        // AGREGAR AL RESULTADO
        Object.assign(homenajesConfig, config);
        
        cargasExitosas++;
        
        // LOG DEL HOMENAJE PROCESADO
        const discoId = Object.keys(config)[0];
        const disco = config[discoId];
        console.log(`✅ Homenaje cargado: ${disco.nombre} - ${disco.canciones?.length || 0} canciones`);

      } catch (error) {
        console.error(`❌ Error cargando ${file}:`, error.message);
        cargasFallidas++;
        archivosConProblemas.push({file, error: error.message});
      }
    }

    console.log(`📊 RESUMEN HOMENAJES:`);
    console.log(`   ✅ Cargas exitosas: ${cargasExitosas}`);
    console.log(`   ❌ Cargas fallidas: ${cargasFallidas}`);
    console.log(`   📁 Total discos/bloques: ${Object.keys(homenajesConfig).length}`);
    
    // CONTAR CANCIONES TOTALES
    const totalCanciones = Object.values(homenajesConfig).reduce((total, disco) => 
      total + (disco.canciones?.length || 0), 0);
    console.log(`   🎵 Total canciones: ${totalCanciones}`);
    
    // MOSTRAR LISTA DE HOMENAJES CARGADOS
    if (cargasExitosas > 0) {
      console.log('👑 HOMENAJES CARGADOS EXITOSAMENTE:');
      Object.values(homenajesConfig).forEach((disco, index) => {
        console.log(`   ${index + 1}. ${disco.nombre} - ${disco.canciones?.length || 0} canciones`);
      });
    }
    
    // MOSTRAR ARCHIVOS CON PROBLEMAS
    if (archivosConProblemas.length > 0) {
      console.warn('📋 ARCHIVOS CON PROBLEMAS:');
      archivosConProblemas.forEach((item, index) => {
        console.warn(`   ${index + 1}. ${item.file} - ${item.error}`);
      });
    }
    
    // SI NO SE CARGÓ NINGÚN HOMENAJE, CREAR HOMENAJES DE EJEMPLO
    if (Object.keys(homenajesConfig).length === 0) {
      console.log('🔄 Creando homenajes de ejemplo...');
      homenajesConfig = crearHomenajesEjemplo();
    }

    return homenajesConfig;

  } catch (error) {
    console.error('❌ Error crítico en loadHomenajesData:', error);
    return crearHomenajesEjemplo();
  }
};

// ============================================
// FUNCIÓN AUXILIAR: crearHomenajesEjemplo - VERSIÓN MEJORADA
// DESCRIPCIÓN: Crea datos de homenajes de ejemplo con múltiples artistas
// ============================================
const crearHomenajesEjemplo = () => {
  const homenajesEjemplo = {
    'homenaje-acdc': {
      id: 'homenaje-acdc',
      nombre: 'HOMENAJE A AC/DC',
      artista: 'AC/DC',
      portada: '/img/02-logos/logo-formateo-chords2.png',
      año: '2024',
      genero: 'Homenajes',
      categoria: 'homenajes',
      _esHomenaje: true,
      _artistaOriginal: 'AC/DC',
      _totalCanciones: 3,
      canciones: [
        {
          id: 'homenaje-acdc-01',
          nombre: 'Back in Black',
          artista: 'AC/DC',
          duracion: '4:15',
          url: '/audio/04-mp3-homenajes/mp3-homenajes-acdc/acdc-back-in-black.mp3',
          chords_url: '/chords/04-cancioneroshomenajes/cancioneroshomenajes-acdc/acdc-back-in-black.json',
          imagen: '/img/02-logos/logo-formateo-chords2.png',
          disco: 'homenaje-acdc',
          detalles: {
            style: 'Hard Rock',
            genre: 'Rock',
            artistaOriginal: 'AC/DC',
            categoria: 'Homenajes'
          },
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: 1,
          esHomenaje: true,
          esZapada: false
        },
        {
          id: 'homenaje-acdc-02',
          nombre: 'Highway to Hell',
          artista: 'AC/DC',
          duracion: '3:30',
          url: '/audio/04-mp3-homenajes/mp3-homenajes-acdc/acdc-highway-to-hell.mp3',
          chords_url: '/chords/04-cancioneroshomenajes/cancioneroshomenajes-acdc/acdc-highway-to-hell.json',
          imagen: '/img/02-logos/logo-formateo-chords2.png',
          disco: 'homenaje-acdc',
          detalles: {
            style: 'Hard Rock',
            genre: 'Rock',
            artistaOriginal: 'AC/DC',
            categoria: 'Homenajes'
          },
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: 2,
          esHomenaje: true,
          esZapada: false
        },
        {
          id: 'homenaje-acdc-03',
          nombre: 'Thunderstruck',
          artista: 'AC/DC',
          duracion: '4:52',
          url: '/audio/04-mp3-homenajes/mp3-homenajes-acdc/acdc-thunderstruck.mp3',
          chords_url: '/chords/04-cancioneroshomenajes/cancioneroshomenajes-acdc/acdc-thunderstruck.json',
          imagen: '/img/02-logos/logo-formateo-chords2.png',
          disco: 'homenaje-acdc',
          detalles: {
            style: 'Hard Rock',
            genre: 'Rock',
            artistaOriginal: 'AC/DC',
            categoria: 'Homenajes'
          },
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: 3,
          esHomenaje: true,
          esZapada: false
        }
      ]
    },
    'homenaje-queen': {
      id: 'homenaje-queen',
      nombre: 'HOMENAJE A QUEEN',
      artista: 'Queen',
      portada: '/img/02-logos/logo-formateo-chords2.png',
      año: '2024',
      genero: 'Homenajes',
      categoria: 'homenajes',
      _esHomenaje: true,
      _artistaOriginal: 'Queen',
      _totalCanciones: 2,
      canciones: [
        {
          id: 'homenaje-queen-01',
          nombre: 'Bohemian Rhapsody',
          artista: 'Queen',
          duracion: '5:55',
          url: '/audio/04-mp3-homenajes/mp3-homenajes-queen/queen-bohemian-rhapsody.mp3',
          chords_url: '/chords/04-cancioneroshomenajes/cancioneroshomenajes-queen/queen-bohemian-rhapsody.json',
          imagen: '/img/02-logos/logo-formateo-chords2.png',
          disco: 'homenaje-queen',
          detalles: {
            style: 'Rock',
            genre: 'Rock',
            artistaOriginal: 'Queen',
            categoria: 'Homenajes'
          },
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: 1,
          esHomenaje: true,
          esZapada: false
        },
        {
          id: 'homenaje-queen-02',
          nombre: 'We Will Rock You',
          artista: 'Queen',
          duracion: '2:02',
          url: '/audio/04-mp3-homenajes/mp3-homenajes-queen/queen-we-will-rock-you.mp3',
          chords_url: '/chords/04-cancioneroshomenajes/cancioneroshomenajes-queen/queen-we-will-rock-you.json',
          imagen: '/img/02-logos/logo-formateo-chords2.png',
          disco: 'homenaje-queen',
          detalles: {
            style: 'Rock',
            genre: 'Rock',
            artistaOriginal: 'Queen',
            categoria: 'Homenajes'
          },
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: 2,
          esHomenaje: true,
          esZapada: false
        }
      ]
    },
    'homenaje-beatles': {
      id: 'homenaje-beatles',
      nombre: 'HOMENAJE A THE BEATLES',
      artista: 'The Beatles',
      portada: '/img/02-logos/logo-formateo-chords2.png',
      año: '2024',
      genero: 'Homenajes',
      categoria: 'homenajes',
      _esHomenaje: true,
      _artistaOriginal: 'The Beatles',
      _totalCanciones: 2,
      canciones: [
        {
          id: 'homenaje-beatles-01',
          nombre: 'Let It Be',
          artista: 'The Beatles',
          duracion: '4:03',
          url: '/audio/04-mp3-homenajes/mp3-homenajes-beatles/beatles-let-it-be.mp3',
          chords_url: '/chords/04-cancioneroshomenajes/cancioneroshomenajes-beatles/beatles-let-it-be.json',
          imagen: '/img/02-logos/logo-formateo-chords2.png',
          disco: 'homenaje-beatles',
          detalles: {
            style: 'Rock',
            genre: 'Rock',
            artistaOriginal: 'The Beatles',
            categoria: 'Homenajes'
          },
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: 1,
          esHomenaje: true,
          esZapada: false
        },
        {
          id: 'homenaje-beatles-02',
          nombre: 'Hey Jude',
          artista: 'The Beatles',
          duracion: '7:11',
          url: '/audio/04-mp3-homenajes/mp3-homenajes-beatles/beatles-hey-jude.mp3',
          chords_url: '/chords/04-cancioneroshomenajes/cancioneroshomenajes-beatles/beatles-hey-jude.json',
          imagen: '/img/02-logos/logo-formateo-chords2.png',
          disco: 'homenaje-beatles',
          detalles: {
            style: 'Rock',
            genre: 'Rock',
            artistaOriginal: 'The Beatles',
            categoria: 'Homenajes'
          },
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: 2,
          esHomenaje: true,
          esZapada: false
        }
      ]
    }
  };
  
  console.log('✅ Homenajes de ejemplo creados (3 artistas)');
  return homenajesEjemplo;
};

// ============================================
// FUNCIÓN: loadZapadasData - VERSIÓN ACTUALIZADA PARA MÚLTIPLES ARCHIVOS
// DESCRIPCIÓN: Carga datos de zapadas desde los 17 archivos separados por género
// ============================================
const loadZapadasData = async () => {
  try {
    console.log('📥 Cargando ZAPADAS por género (17 archivos)...');
    
    // LISTA DE TODOS LOS ARCHIVOS DE ZAPADAS POR GÉNERO
    const zapadasFiles = [
      '/listados/listados-musica-zapadas/listado-musica-zapadas-blues.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-country.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-electronica.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-experimentales.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-folklore.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-funk.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-jazz.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-latino.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-metal.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-pop.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-r&b.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-reggae.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-rock.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-ska.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-soul.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-tango.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-urban.json'
    ];

    let zapadasConfig = {};
    let cargasExitosas = 0;
    let cargasFallidas = 0;
    let archivosConProblemas = [];

    // CARGAR CADA ARCHIVO DE ZAPADAS POR GÉNERO
    for (const file of zapadasFiles) {
      try {
        console.log(`📄 Intentando cargar zapadas: ${file}`);
        const response = await fetch(file);
        
        if (!response.ok) {
          console.log(`⚠️ Archivo no encontrado (${response.status}): ${file}`);
          cargasFallidas++;
          archivosConProblemas.push({file, error: `HTTP ${response.status}`});
          continue;
        }

        const responseText = await response.text();
        
        // Verificar si es HTML (error 404)
        if (responseText.trim().startsWith('<!DOCTYPE') || 
            responseText.trim().startsWith('<html') ||
            responseText.includes('Page Not Found')) {
          console.log(`❌ El archivo devuelve HTML (probablemente 404): ${file}`);
          cargasFallidas++;
          archivosConProblemas.push({file, error: 'Devuelve HTML (404)'});
          continue;
        }

        // Intentar parsear como JSON
        let zapadaData;
        try {
          zapadaData = JSON.parse(responseText);
        } catch (parseError) {
          console.error(`❌ Error parseando JSON de ${file}:`, parseError.message);
          cargasFallidas++;
          archivosConProblemas.push({file, error: `JSON inválido: ${parseError.message}`});
          continue;
        }
        
        // VERIFICAR ESTRUCTURA
        if (!zapadaData.artista || !zapadaData.discografia) {
          console.error(`❌ Estructura inválida en ${file}: falta "artista" o "discografia"`);
          cargasFallidas++;
          archivosConProblemas.push({file, error: 'Estructura JSON inválida'});
          continue;
        }

        // AGREGAR INFORMACIÓN DEL ARCHIVO FUENTE
        zapadaData._sourceFile = file.split('/').pop();
        
        // FORZAR CATEGORÍA PARA ZAPADAS Y AGREGAR GÉNERO
        zapadaData.categoria = 'zapadas';
        
        // Extraer el género del nombre del archivo
        const matchGenero = file.match(/zapadas-([^\.]+)\.json/);
        if (matchGenero) {
          let genero = matchGenero[1].replace('&', 'and');
          // Formatear el nombre del género
          genero = genero.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          // Asignar el género a cada disco
          if (zapadaData.discografia && zapadaData.discografia.length > 0) {
            zapadaData.discografia.forEach(disco => {
              disco.genre = `Zapadas ${genero}`;
            });
          }
        }
        
        // TRANSFORMAR LOS DATOS USANDO LA FUNCIÓN EXISTENTE
        const config = transformZapadasData(zapadaData);
        
        // AGREGAR AL RESULTADO
        Object.assign(zapadasConfig, config);
        
        cargasExitosas++;
        
        console.log(`✅ Zapadas cargadas: ${file.split('/').pop()}`);

      } catch (error) {
        console.error(`❌ Error cargando ${file}:`, error.message);
        cargasFallidas++;
        archivosConProblemas.push({file, error: error.message});
      }
    }

    console.log(`📊 Resumen Zapadas: ${cargasExitosas} exitosas, ${cargasFallidas} fallidas`);
    
    // MOSTRAR ARCHIVOS CON PROBLEMAS
    if (archivosConProblemas.length > 0) {
      console.warn('📋 Archivos de zapadas con problemas:');
      archivosConProblemas.forEach((item, index) => {
        console.warn(`${index + 1}. ${item.file} - ${item.error}`);
      });
    }
    
    console.log(`🎹 Total discos de zapadas: ${Object.keys(zapadasConfig).length}`);

    // SI NO SE CARGÓ NINGUNA ZAPADA, CREAR ZAPADAS DE EJEMPLO
    if (Object.keys(zapadasConfig).length === 0) {
      console.log('🔄 Creando zapadas de ejemplo...');
      zapadasConfig = crearZapadasEjemplo();
    }

    return zapadasConfig;

  } catch (error) {
    console.error('❌ Error crítico en loadZapadasData:', error);
    return crearZapadasEjemplo();
  }
};

// ============================================
// FUNCIÓN AUXILIAR: crearZapadasEjemplo
// DESCRIPCIÓN: Crea datos de zapadas de ejemplo
// ============================================
const crearZapadasEjemplo = () => {
  const zapadasEjemplo = {
    'zapadas-ejemplo-00': {
      id: 'zapadas-ejemplo-00',
      nombre: 'ZAPADAS DE EJEMPLO',
      artista: 'Almango Pop',
      portada: '/img/300.jpg',
      año: '2024',
      genero: 'Zapadas',
      categoria: 'zapadas',
      canciones: [
        {
          id: 'zapada-rock-001',
          nombre: 'Zapada Rock Clásico',
          artista: 'Almango Pop',
          duracion: '4:30',
          url: '/audio/05-mp3-zapadas/mp3-zapadas-rock/mp3-zapadas-rock-01.mp3',
          chords_url: '/chords/05-cancioneroszapadas/cancioneroszapadas-rock/cancioneroszapadas-rock-01.json',
          imagen: '/img/300.jpg',
          disco: 'zapadas-ejemplo-00',
          detalles: {
            style: 'Rock Clásico',
            genre: 'Rock',
            categoria: 'Zapadas'
          },
          esMedley: false,
          cancionesIncluidas: 1,
          track_number: 1,
          esHomenaje: false,
          esZapada: true
        }
      ]
    }
  };
  
  console.log('✅ Zapadas de ejemplo creadas');
  return zapadasEjemplo;
};

// ============================================
// FUNCIÓN PRINCIPAL: loadAllMusicData (5 CATEGORÍAS)
// DESCRIPCIÓN: Carga todos los datos musicales de las 5 categorías con nuevas rutas
// ============================================
export const loadAllMusicData = async () => {
  try {
    console.log('='.repeat(60));
    console.log('🔄 INICIANDO CARGA DE DATOS MUSICALES (5 CATEGORÍAS)');
    console.log('📁 Zapadas divididas en 17 archivos por género');
    console.log('📁 Homenajes: 34 artistas como bloques separados');
    console.log('='.repeat(60));

    // ================================
    // CATEGORÍA 1: ORIGINAL
    // ================================
    console.log('\n📥 CATEGORÍA 1: Cargando MÚSICA ORIGINAL...');

    let aleGondraData = {};
    let almangoData = {};

    try {
      // NUEVA RUTA PARA ALE GONDRA
      aleGondraData = await loadMusicData('/listados/listados-musica-original/listado-musica-alegondra.json');
      console.log(`✅ Ale Gondra: ${Object.keys(aleGondraData).length} discos`);
    } catch (error) {
      console.log(`❌ Error cargando Ale Gondra: ${error.message}`);
    }

    try {
      // NUEVA RUTA PARA ALMANGO POP
      almangoData = await loadMusicData('/listados/listados-musica-original/listado-musica-almango.json');
      console.log(`✅ Almango Pop: ${Object.keys(almangoData).length} discos`);
    } catch (error) {
      console.log(`❌ Error cargando Almango Pop: ${error.message}`);
    }

    // ================================
    // CATEGORÍA 2: COVERS (12 archivos con nuevas rutas)
    // ================================
    console.log('\n📥 CATEGORÍA 2: Cargando COVERS (12 categorías)...');

    // NUEVAS RUTAS PARA COVERS
    const coversFiles = [
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-baladasespanol.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-baladasingles.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-discoingles.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-festivos-bso.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-hardrock-punkespanol.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-hardrock-punkingles.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-latinobailableespanol.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-poprockespanol.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-poprockingles.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-reggaeingles.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-rockbailableespanol.json',
      '/listados/listados-musica-covers-por-genero/listadocancionescovers-rockbailableingles.json'
    ];

    let coversData = {};
    let coversCargados = 0;

    for (const file of coversFiles) {
      try {
        const data = await loadMusicData(file);
        Object.assign(coversData, data);
        coversCargados++;
        console.log(`✅ ${file.split('/').pop()}: cargado`);
      } catch (error) {
        console.log(`⚠️ No se pudo cargar ${file}: ${error.message}`);
      }
    }

    console.log(`📊 Covers: ${coversCargados}/${coversFiles.length} categorías cargadas`);

    // ================================
    // CATEGORÍA 3: MEDLEYS
    // ================================
    console.log('\n📥 CATEGORÍA 3: Cargando MEDLEYS...');

    let medleysData = {};
    try {
      // NUEVA RUTA PARA MEDLEYS
      medleysData = await loadMusicData('/listados/listados-musica-medleys/listado-musica-covers-medleys.json');
      console.log(`✅ Medleys: ${Object.keys(medleysData).length} discos`);
    } catch (error) {
      console.log('ℹ️ No se encontró archivo de medleys');
    }

    // ================================
    // CATEGORÍA 4: HOMENAJES
    // ================================
    console.log('\n📥 CATEGORÍA 4: Cargando HOMENAJES...');

    let homenajesData = {};
    try {
      homenajesData = await loadHomenajesData();

      const homenajesDiscos = Object.keys(homenajesData).length;
      const homenajesCanciones = Object.values(homenajesData)
        .reduce((acc, disco) => acc + (disco.canciones?.length || 0), 0);

      console.log(`✅ Homenajes: ${homenajesDiscos} artistas, ${homenajesCanciones} canciones`);
      
      // MOSTRAR ARTISTAS CARGADOS
      console.log('\n👑 ARTISTAS DE HOMENAJES CARGADOS:');
      Object.values(homenajesData).slice(0, 10).forEach((disco, index) => {
        console.log(`${index + 1}. ${disco.nombre} - ${disco.canciones?.length || 0} canciones`);
      });
      
      if (homenajesDiscos > 10) {
        console.log(`   ... y ${homenajesDiscos - 10} más`);
      }

    } catch (error) {
      console.log('❌ Error cargando homenajes:', error.message);
      homenajesData = {};
    }

    // ================================
    // CATEGORÍA 5: ZAPADAS (POR GÉNERO)
    // ================================
    console.log('\n📥 CATEGORÍA 5: Cargando ZAPADAS por género (17 archivos)...');

    let zapadasData = {};
    try {
      zapadasData = await loadZapadasData();

      const zapadasDiscos = Object.keys(zapadasData).length;
      const zapadasCanciones = Object.values(zapadasData)
        .reduce((acc, disco) => acc + (disco.canciones?.length || 0), 0);

      console.log(`✅ Zapadas: ${zapadasDiscos} géneros, ${zapadasCanciones} canciones`);
      
      // MOSTRAR GÉNEROS DE ZAPADAS CARGADOS
      if (zapadasDiscos > 0) {
        console.log('\n🎹 GÉNEROS DE ZAPADAS CARGADOS:');
        const generosUnicos = [...new Set(Object.values(zapadasData).map(disco => disco.genero))];
        generosUnicos.slice(0, 5).forEach((genero, index) => {
          const cancionesEnGenero = Object.values(zapadasData)
            .filter(disco => disco.genero === genero)
            .reduce((acc, disco) => acc + (disco.canciones?.length || 0), 0);
          console.log(`${index + 1}. ${genero} - ${cancionesEnGenero} canciones`);
        });
        
        if (generosUnicos.length > 5) {
          console.log(`   ... y ${generosUnicos.length - 5} más`);
        }
      }

    } catch (error) {
      console.log('❌ Error cargando zapadas:', error.message);
      zapadasData = {};
    }

    // ================================
    // ESTRUCTURA FINAL CON 5 CATEGORÍAS
    // ================================
    const ALL_MUSIC_CONFIG = {
      original: {
        ...aleGondraData,
        ...almangoData
      },

      covers: coversData,

      medleys: medleysData,

      homenajes: homenajesData,

      zapadas: zapadasData
    };

    // ================================
    // ESTADÍSTICAS FINALES
    // ================================
    console.log('\n' + '='.repeat(60));
    console.log('🎵 RESUMEN FINAL DEL CATÁLOGO');
    console.log('='.repeat(60));

    let totalDiscos = 0;
    let totalCanciones = 0;

    Object.entries(ALL_MUSIC_CONFIG).forEach(([categoria, datos]) => {
      const numDiscos = Object.keys(datos).length;
      const numCanciones = Object.values(datos)
        .reduce((acc, disco) => acc + (disco.canciones?.length || 0), 0);
      
      totalDiscos += numDiscos;
      totalCanciones += numCanciones;
      
      const iconos = {
        original: '🎤',
        covers: '🎸',
        medleys: '🎶',
        homenajes: '👑',
        zapadas: '🎹'
      };
      
      console.log(`${iconos[categoria] || '📁'} ${categoria.toUpperCase()}: ${numDiscos} discos, ${numCanciones} canciones`);
    });

    console.log('='.repeat(60));
    console.log(`📊 TOTAL: ${totalDiscos} discos, ${totalCanciones} canciones`);
    console.log('='.repeat(60));
    console.log('✅ CARGA COMPLETADA EXITOSAMENTE');
    console.log('='.repeat(60));

    return ALL_MUSIC_CONFIG;

  } catch (error) {
    console.error('❌ Error crítico en loadAllMusicData:', error);

    // ESTRUCTURA DE FALLBACK
    return {
      original: {
        'fallback-original': {
          id: 'fallback-original',
          nombre: 'MÚSICA ORIGINAL',
          artista: 'Almango Pop',
          portada: '/img/default-cover.png',
          año: '2024',
          genero: 'Original',
          categoria: 'original',
          canciones: []
        }
      },
      covers: {
        'fallback-covers': {
          id: 'fallback-covers',
          nombre: 'COVERS',
          artista: 'Almango Pop',
          portada: '/img/09-discos/tapa-listado-covers.jpg',
          año: '2024',
          genero: 'Covers',
          categoria: 'covers',
          canciones: []
        }
      },
      medleys: {
        'fallback-medleys': {
          id: 'fallback-medleys',
          nombre: 'MEDLEYS',
          artista: 'Almango Pop',
          portada: '/img/medleys-default.jpg',
          año: '2024',
          genero: 'Medleys',
          categoria: 'medleys',
          canciones: []
        }
      },
      homenajes: {
        'fallback-homenajes': {
          id: 'fallback-homenajes',
          nombre: 'HOMENAJES',
          artista: 'Almango Pop',
          portada: '/img/02-logos/logo-formateo-chords2.png',
          año: '2024',
          genero: 'Homenajes',
          categoria: 'homenajes',
          canciones: []
        }
      },
      zapadas: {
        'fallback-zapadas': {
          id: 'fallback-zapadas',
          nombre: 'ZAPADAS',
          artista: 'Almango Pop',
          portada: '/img/02-logos/logo-formateo-chords2.png',
          año: '2024',
          genero: 'Zapadas',
          categoria: 'zapadas',
          canciones: []
        }
      }
    };
  }
};

// ============================================
// FUNCIÓN: loadChordsData - VERSIÓN MEJORADA
// DESCRIPCIÓN: Carga datos de acordes con manejo robusto de errores
// ============================================
export const loadChordsData = async (chordsUrl) => {
  try {
    console.log(`🎵 Intentando cargar chords:`, chordsUrl);

    // CASO 1: NO HAY chords_url
    if (!chordsUrl) {
      console.log('ℹ️ No hay chords_url disponible, creando ejemplo');
      return crearChordsEjemplo("Sin acordes disponibles");
    }

    // CASO 2: ES ARRAY (MEDLEY)
    if (Array.isArray(chordsUrl)) {
      console.log(`🎶 Cargando MEDLEY con ${chordsUrl.length} canciones...`);
      
      const chordsPromises = chordsUrl.map(url =>
        fetch(url)
          .then(response => {
            if (!response.ok) throw new Error(`Error ${response.status}`);
            return response.json();
          })
          .catch(err => {
            console.error(`❌ Error cargando ${url}:`, err.message);
            return crearChordsEjemplo("Error cargando");
          })
      );

      const allChordsData = await Promise.all(chordsPromises);
      
      const combinedChordsData = {
        id: `medley-${Date.now()}`,
        title: `Medley de ${allChordsData.length} canciones`,
        artist: 'Varios Artistas',
        originalKey: "C",
        esMedley: true,
        cancionesIncluidas: allChordsData.length,
        content: []
      };

      // AGREGAR CONTENIDO DE CADA CANCIÓN
      allChordsData.forEach((chordsData, index) => {
        combinedChordsData.content.push({
          type: 'section',
          name: `🎵 PARTE ${index + 1}: ${chordsData.title || `Canción ${index + 1}`}`,
          lines: [
            { type: 'lyric', content: `Artista: ${chordsData.artist || 'Desconocido'}` }
          ]
        });

        if (chordsData.content && Array.isArray(chordsData.content)) {
          combinedChordsData.content.push(...chordsData.content);
        }
      });

      console.log(`✅ Medley cargado: ${allChordsData.length} canciones`);
      return combinedChordsData;
    }

    // CASO 3: ES STRING (CANCIÓN INDIVIDUAL)
    console.log(`📄 Cargando canción individual: ${chordsUrl}`);
    const response = await fetch(chordsUrl);

    if (!response.ok) {
      console.error(`❌ No se encontró ${chordsUrl} (${response.status}), creando ejemplo`);
      return crearChordsEjemplo("Acordes no encontrados");
    }

    const chordsData = await response.json();
    console.log(`✅ Chords cargados: ${chordsData.title || chordsData.id}`);
    return chordsData;

  } catch (error) {
    console.error('❌ Error en loadChordsData:', error.message);
    return crearChordsEjemplo("Error cargando acordes");
  }
};

// ============================================
// FUNCIÓN AUXILIAR: crearChordsEjemplo
// DESCRIPCIÓN: Crea datos de acordes de ejemplo cuando hay errores
// ============================================
const crearChordsEjemplo = (titulo) => {
  return {
    id: `ejemplo-${Date.now()}`,
    title: titulo,
    artist: "Artista",
    originalKey: "C",
    tempo: "120",
    timeSignature: "4/4",
    esMedley: false,
    cancionesIncluidas: 1,
    content: [
      {
        type: "section",
        name: "INTRO",
        lines: [
          { type: "chords", content: ["C", "G", "Am", "F"] }
        ]
      },
      {
        type: "divider"
      },
      {
        type: "section",
        name: "ESTROFA",
        lines: [
          { type: "chord", content: "C" },
          { type: "lyric", content: "Ejemplo de canción" },
          { type: "chord", content: "G" },
          { type: "lyric", content: "Mientras se cargan los acordes reales" },
          { type: "chord", content: "Am" },
          { type: "lyric", content: "O si hay algún error" },
          { type: "chord", content: "F" },
          { type: "lyric", content: "En la carga del archivo" }
        ]
      }
    ]
  };
};

// ============================================
// FUNCIÓN: loadCoversByCategory - VERSIÓN CON RUTAS ACTUALIZADAS
// DESCRIPCIÓN: Carga covers por categoría específica
// ============================================
export const loadCoversByCategory = async (category) => {
  try {
    // MAPA DE ARCHIVOS CON NUEVAS RUTAS
    const fileMap = {
      'baladasespanol': '/listados/listados-musica-covers-por-genero/listadocancionescovers-baladasespanol.json',
      'baladasingles': '/listados/listados-musica-covers-por-genero/listadocancionescovers-baladasingles.json',
      'discoingles': '/listados/listados-musica-covers-por-genero/listadocancionescovers-discoingles.json',
      'festivos-bso': '/listados/listados-musica-covers-por-genero/listadocancionescovers-festivos-bso.json',
      'hardrock-punkespanol': '/listados/listados-musica-covers-por-genero/listadocancionescovers-hardrock-punkespanol.json',
      'hardrock-punkingles': '/listados/listados-musica-covers-por-genero/listadocancionescovers-hardrock-punkingles.json',
      'latinobailableespanol': '/listados/listados-musica-covers-por-genero/listadocancionescovers-latinobailableespanol.json',
      'poprockespanol': '/listados/listados-musica-covers-por-genero/listadocancionescovers-poprockespanol.json',
      'poprockingles': '/listados/listados-musica-covers-por-genero/listadocancionescovers-poprockingles.json',
      'reggaeingles': '/listados/listados-musica-covers-por-genero/listadocancionescovers-reggaeingles.json',
      'rockbailableespanol': '/listados/listados-musica-covers-por-genero/listadocancionescovers-rockbailableespanol.json',
      'rockbailableingles': '/listados/listados-musica-covers-por-genero/listadocancionescovers-rockbailableingles.json',
      'todos': null
    };

    if (category === 'todos') {
      const allFiles = Object.values(fileMap).filter(Boolean);
      let combinedData = {};

      for (const file of allFiles) {
        try {
          const data = await loadMusicData(file);
          Object.assign(combinedData, data);
        } catch (error) {
          console.log(`⚠️ Omitiendo ${file}: ${error.message}`);
        }
      }

      return combinedData;
    }

    const filePath = fileMap[category];
    if (!filePath) {
      throw new Error(`Categoría no encontrada: ${category}`);
    }

    return await loadMusicData(filePath);
  } catch (error) {
    console.error(`Error cargando categoría ${category}:`, error);
    throw error;
  }
};

// ============================================
// FUNCIÓN: getAvailableCategories
// DESCRIPCIÓN: Retorna todas las categorías disponibles
// ============================================
export const getAvailableCategories = () => {
  return [
    { id: 'original', name: 'Música Original', icon: '🎤', desc: 'Musica Original' },
    { id: 'covers', name: 'Todos los Covers', icon: '🎸', desc: 'Covers Versionados' },
    { id: 'medleys', name: 'Medleys', icon: '🎶', desc: 'Enganchados' },
    { id: 'homenajes', name: 'Homenajes', icon: '👑', desc: 'Tributos Musicales' },
    { id: 'zapadas', name: 'Zapadas', icon: '🎹', desc: 'Sesiones Espontáneas' },
    { id: 'baladasespanol', name: 'Baladas Español', icon: '💔', desc: 'Baladas románticas en español' },
    { id: 'baladasingles', name: 'Baladas Inglés', icon: '💔', desc: 'Baladas románticas en inglés' },
    { id: 'poprockespanol', name: 'Pop/Rock Español', icon: '🎸', desc: 'Pop y rock en español' },
    { id: 'poprockingles', name: 'Pop/Rock Inglés', icon: '🎸', desc: 'Pop y rock en inglés' },
    { id: 'rockbailableespanol', name: 'Rock Bailable Español', icon: '🕺', desc: 'Rock para bailar en español' },
    { id: 'rockbailableingles', name: 'Rock Bailable Inglés', icon: '🕺', desc: 'Rock para bailar en inglés' },
    { id: 'hardrock-punkespanol', name: 'Hard Rock/Punk Español', icon: '🤘', desc: 'Hard rock y punk en español' },
    { id: 'hardrock-punkingles', name: 'Hard Rock/Punk Inglés', icon: '🤘', desc: 'Hard rock y punk en inglés' },
    { id: 'discoingles', name: 'Disco Inglés', icon: '💃', desc: 'Música disco en inglés' },
    { id: 'latinobailableespanol', name: 'Latino Bailable Español', icon: '🌴', desc: 'Música latina bailable' },
    { id: 'reggaeingles', name: 'Reggae Inglés', icon: '☮️', desc: 'Reggae y música jamaiquina' },
    { id: 'festivos-bso', name: 'Festivos & BSO', icon: '🎄', desc: 'Música festiva y bandas sonoras' }
  ];
};

// ============================================
// FUNCIÓN: getAvailableZapadasGenres
// DESCRIPCIÓN: Retorna todos los géneros de zapadas disponibles
// ============================================
export const getAvailableZapadasGenres = () => {
  return [
    { id: 'zapadas-blues', name: 'Zapadas Blues', icon: '🎹', desc: 'Sesiones Blues' },
    { id: 'zapadas-rock', name: 'Zapadas Rock', icon: '🎹', desc: 'Sesiones Rock' },
    { id: 'zapadas-country', name: 'Zapadas Country', icon: '🎹', desc: 'Sesiones Country' },
    { id: 'zapadas-electronica', name: 'Zapadas Electrónica', icon: '🎹', desc: 'Sesiones Electrónicas' },
    { id: 'zapadas-experimentales', name: 'Zapadas Experimentales', icon: '🎹', desc: 'Sesiones Experimentales' },
    { id: 'zapadas-folklore', name: 'Zapadas Folklore', icon: '🎹', desc: 'Sesiones Folklore' },
    { id: 'zapadas-funk', name: 'Zapadas Funk', icon: '🎹', desc: 'Sesiones Funk' },
    { id: 'zapadas-jazz', name: 'Zapadas Jazz', icon: '🎹', desc: 'Sesiones Jazz' },
    { id: 'zapadas-latino', name: 'Zapadas Latino', icon: '🎹', desc: 'Sesiones Latino' },
    { id: 'zapadas-metal', name: 'Zapadas Metal', icon: '🎹', desc: 'Sesiones Metal' },
    { id: 'zapadas-pop', name: 'Zapadas Pop', icon: '🎹', desc: 'Sesiones Pop' },
    { id: 'zapadas-r&b', name: 'Zapadas R&B', icon: '🎹', desc: 'Sesiones R&B' },
    { id: 'zapadas-reggae', name: 'Zapadas Reggae', icon: '🎹', desc: 'Sesiones Reggae' },
    { id: 'zapadas-ska', name: 'Zapadas Ska', icon: '🎹', desc: 'Sesiones Ska' },
    { id: 'zapadas-soul', name: 'Zapadas Soul', icon: '🎹', desc: 'Sesiones Soul' },
    { id: 'zapadas-tango', name: 'Zapadas Tango', icon: '🎹', desc: 'Sesiones Tango' },
    { id: 'zapadas-urban', name: 'Zapadas Urban', icon: '🎹', desc: 'Sesiones Urban' }
  ];
};

// ============================================
// FUNCIÓN: searchSongs
// DESCRIPCIÓN: Busca canciones en todas las categorías
// ============================================
export const searchSongs = async (query, category = 'all') => {
  try {
    console.log(`🔍 Buscando: "${query}" en categoría: ${category}`);

    const allData = await loadAllMusicData();
    const results = [];
    const queryLower = query.toLowerCase();

    // Buscar en original si corresponde
    if (category === 'all' || category === 'original') {
      Object.values(allData.original).forEach(disco => {
        disco.canciones?.forEach(cancion => {
          if (
            cancion.nombre.toLowerCase().includes(queryLower) ||
            cancion.artista.toLowerCase().includes(queryLower) ||
            (cancion.detalles?.genero?.toLowerCase() || '').includes(queryLower)
          ) {
            results.push({
              ...cancion,
              tipo: 'original',
              discoNombre: disco.nombre,
              categoria: 'original'
            });
          }
        });
      });
    }

    // Buscar en covers si corresponde
    if (category === 'all' || category === 'covers' || (category !== 'original' && category !== 'medleys' && category !== 'homenajes' && category !== 'zapadas')) {
      Object.values(allData.covers).forEach(disco => {
        disco.canciones?.forEach(cancion => {
          if (
            cancion.nombre.toLowerCase().includes(queryLower) ||
            cancion.artista.toLowerCase().includes(queryLower) ||
            (cancion.detalles?.categoria?.toLowerCase() || '').includes(queryLower) ||
            (cancion.detalles?.genero?.toLowerCase() || '').includes(queryLower)
          ) {
            results.push({
              ...cancion,
              tipo: 'covers',
              discoNombre: disco.nombre,
              categoria: disco.genero || 'covers'
            });
          }
        });
      });
    }

    // Buscar en medleys si corresponde
    if (category === 'all' || category === 'medleys') {
      Object.values(allData.medleys).forEach(disco => {
        disco.canciones?.forEach(cancion => {
          if (
            cancion.nombre.toLowerCase().includes(queryLower) ||
            cancion.artista.toLowerCase().includes(queryLower) ||
            (cancion.esMedley && 'medley'.includes(queryLower))
          ) {
            results.push({
              ...cancion,
              tipo: 'medleys',
              discoNombre: disco.nombre,
              categoria: 'medleys',
              esMedley: cancion.esMedley,
              cancionesIncluidas: cancion.cancionesIncluidas
            });
          }
        });
      });
    }

    // Buscar en homenajes si corresponde
    if (category === 'all' || category === 'homenajes') {
      Object.values(allData.homenajes).forEach(disco => {
        disco.canciones?.forEach(cancion => {
          if (
            cancion.nombre.toLowerCase().includes(queryLower) ||
            cancion.artista.toLowerCase().includes(queryLower) ||
            (cancion.esHomenaje && 'homenaje'.includes(queryLower)) ||
            disco.nombre.toLowerCase().includes(queryLower)
          ) {
            results.push({
              ...cancion,
              tipo: 'homenajes',
              discoNombre: disco.nombre,
              categoria: 'homenajes',
              esHomenaje: true
            });
          }
        });
      });
    }

    // Buscar en zapadas si corresponde
    if (category === 'all' || category === 'zapadas') {
      Object.values(allData.zapadas).forEach(disco => {
        disco.canciones?.forEach(cancion => {
          if (
            cancion.nombre.toLowerCase().includes(queryLower) ||
            cancion.artista.toLowerCase().includes(queryLower) ||
            (cancion.esZapada && 'zapada'.includes(queryLower)) ||
            disco.nombre.toLowerCase().includes(queryLower)
          ) {
            results.push({
              ...cancion,
              tipo: 'zapadas',
              discoNombre: disco.nombre,
              categoria: 'zapadas',
              esZapada: true
            });
          }
        });
      });
    }

    console.log(`✅ Búsqueda completada: ${results.length} resultados`);
    return results;

  } catch (error) {
    console.error('❌ Error en búsqueda:', error);
    return [];
  }
};

// ============================================
// FUNCIÓN AUXILIAR: getFileFromCategory
// DESCRIPCIÓN: Obtiene la ruta del archivo según la categoría
// ============================================
export const getFileFromCategory = (category) => {
  const categoryMap = {
    // Original
    'original': [
      '/listados/listados-musica-original/listado-musica-alegondra.json',
      '/listados/listados-musica-original/listado-musica-almango.json'
    ],
    
    // Covers por género
    'covers': '/listados/listados-musica-covers-por-genero/',
    
    // Medleys
    'medleys': '/listados/listados-musica-medleys/listado-musica-covers-medleys.json',
    
    // Homenajes
    'homenajes': '/listados/listados-musica-homenajes/',
    
    // Zapadas (lista de archivos)
    'zapadas': [
      '/listados/listados-musica-zapadas/listado-musica-zapadas-blues.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-country.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-electronica.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-experimentales.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-folklore.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-funk.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-jazz.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-latino.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-metal.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-pop.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-r&b.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-reggae.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-rock.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-ska.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-soul.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-tango.json',
      '/listados/listados-musica-zapadas/listado-musica-zapadas-urban.json'
    ]
  };
  
  return categoryMap[category] || null;
};

// ============================================
// EXPORTACIONES PRINCIPALES
// ============================================
export default {
  loadAllMusicData,
  loadMusicData,
  loadChordsData,
  loadCoversByCategory,
  loadZapadasData,
  getAvailableCategories,
  getAvailableZapadasGenres,
  searchSongs,
  getFileFromCategory
};