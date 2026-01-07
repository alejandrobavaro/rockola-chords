// copy-audio.js (VERSIÓN QUE COPIA AUDIOS A dist/)
const fs = require('fs');
const path = require('path');

console.log('🚀 ===========================================');
console.log('🚀 COPIANDO AUDIOS DE public/ A dist/');
console.log('🚀 ===========================================');

const sourceDir = path.join(__dirname, 'public', 'audio');
const targetDir = path.join(__dirname, 'dist', 'audio');

// 1. Verificar si existen audios locales
if (!fs.existsSync(sourceDir)) {
  console.log('⚠️  ADVERTENCIA: No se encontró public/audio/');
  console.log('💡 Los audios NO están disponibles localmente.');
  console.log('   Para subir audios a Netlify, ejecuta: npm run deploy-audio');
  
  // Crear carpeta vacía para evitar errores
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log('📁 Carpeta dist/audio/ creada (vacía)');
  }
  
  process.exit(0); // Salir sin error
}

console.log(`📂 Origen: ${sourceDir}`);
console.log(`📂 Destino: ${targetDir}`);

// 2. Crear directorio destino si no existe
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('📁 Carpeta dist/audio/ creada');
} else {
  // Limpiar destino antes de copiar (opcional)
  console.log('🧹 Limpiando destino anterior...');
  fs.rmSync(targetDir, { recursive: true });
  fs.mkdirSync(targetDir, { recursive: true });
}

// 3. Función para copiar archivos recursivamente
function copiarArchivosMP3(origen, destino) {
  let archivosCopiados = 0;
  let tamañoTotal = 0;
  
  function copiarRecursivo(src, dst) {
    const items = fs.readdirSync(src, { withFileTypes: true });
    
    for (const item of items) {
      const srcPath = path.join(src, item.name);
      const dstPath = path.join(dst, item.name);
      
      if (item.isDirectory()) {
        // Crear subdirectorio y copiar su contenido
        if (!fs.existsSync(dstPath)) {
          fs.mkdirSync(dstPath, { recursive: true });
        }
        copiarRecursivo(srcPath, dstPath);
      } else if (item.name.toLowerCase().match(/\.(mp3|wav|ogg|m4a)$/)) {
        // Copiar archivo de audio
        fs.copyFileSync(srcPath, dstPath);
        archivosCopiados++;
        
        // Calcular tamaño
        const stats = fs.statSync(srcPath);
        tamañoTotal += stats.size;
        
        // Mostrar progreso cada 50 archivos
        if (archivosCopiados % 50 === 0) {
          console.log(`  📦 ${archivosCopiados} archivos copiados...`);
        }
      }
    }
  }
  
  copiarRecursivo(origen, destino);
  
  return {
    archivos: archivosCopiados,
    tamaño: (tamañoTotal / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  };
}

// 4. Ejecutar copia
console.log('📤 Copiando archivos de audio...');
const resultado = copiarArchivosMP3(sourceDir, targetDir);

// 5. Verificación final
function contarArchivosEnDirectorio(dir) {
  if (!fs.existsSync(dir)) return 0;
  
  let contador = 0;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      contador += contarArchivosEnDirectorio(fullPath);
    } else if (item.name.toLowerCase().match(/\.(mp3|wav|ogg|m4a)$/)) {
      contador++;
    }
  }
  return contador;
}

const enSource = contarArchivosEnDirectorio(sourceDir);
const enTarget = contarArchivosEnDirectorio(targetDir);

console.log('\n📊 ============ RESUMEN FINAL ============');
console.log(`   Archivos en public/audio/: ${enSource}`);
console.log(`   Archivos en dist/audio/:   ${enTarget}`);
console.log(`   Tamaño total: ${resultado.tamaño}`);

if (enSource === enTarget) {
  console.log('✅ ¡ÉXITO! Todos los audios copiados correctamente.');
  console.log('   Netlify desplegará estos audios en el hosting.');
} else if (enTarget === 0) {
  console.log('⚠️  ADVERTENCIA: No se copiaron audios.');
  console.log('   El sitio funcionará pero sin archivos de audio.');
  console.log('   Para subir audios directamente a Netlify:');
  console.log('   1. Ejecuta: npm run deploy-audio');
} else {
  console.log(`⚠️  Diferencia: ${enSource - enTarget} archivos no copiados`);
}

console.log('🎯 Script finalizado.');