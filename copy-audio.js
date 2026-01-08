// copy-audio.js (VERSIÓN ES MODULES)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 ===========================================');
console.log('🚀 COPIANDO AUDIOS PARA NETLIFY');
console.log('🚀 ===========================================');

const sourceDir = path.join(__dirname, 'public', 'audio');
const targetDir = path.join(__dirname, 'dist', 'audio');

// 1. Verificar si existen audios locales
if (!fs.existsSync(sourceDir)) {
  console.log('⚠️  ADVERTENCIA: No se encontró public/audio/');
  console.log('💡 Ejecuta en tu PC: npm run deploy-heavy-audio para subir audios pesados');
  
  // Crear carpeta vacía para evitar errores
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log('📁 Carpeta dist/audio/ creada (vacía)');
  }
  
  process.exit(0);
}

console.log(`📂 Fuente: ${sourceDir}`);
console.log(`📂 Destino: ${targetDir}`);

// 2. Crear directorio destino si no existe
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('📁 Carpeta dist/audio/ creada');
}

// 3. Función para copiar TODOS los audios
function copiarTodosLosAudios(origen, destino) {
  let archivosCopiados = 0;
  let tamañoTotal = 0;
  
  function copiarRecursivo(src, dst) {
    if (!fs.existsSync(src)) return;
    
    const items = fs.readdirSync(src, { withFileTypes: true });
    
    for (const item of items) {
      const srcPath = path.join(src, item.name);
      const dstPath = path.join(dst, item.name);
      
      if (item.isDirectory()) {
        // Crear subdirectorio y copiar su contenido
        if (!fs.existsSync(dstPath)) {
          fs.mkdirSync(dstPath, { recursive: true });
        }
        archivosCopiados += copiarRecursivo(srcPath, dstPath);
      } else if (item.name.toLowerCase().match(/\.(mp3|wav|ogg|m4a)$/)) {
        // Copiar archivo de audio
        fs.copyFileSync(srcPath, dstPath);
        archivosCopiados++;
        
        // Calcular tamaño
        const stats = fs.statSync(srcPath);
        tamañoTotal += stats.size;
        
        // Mostrar progreso
        if (archivosCopiados % 50 === 0) {
          console.log(`  📦 ${archivosCopiados} archivos copiados...`);
        }
      }
    }
    
    return archivosCopiados;
  }
  
  copiarRecursivo(origen, destino);
  
  return {
    archivos: archivosCopiados,
    tamaño: (tamañoTotal / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  };
}

// 4. Ejecutar copia
console.log('📤 Copiando archivos de audio...');
const resultado = copiarTodosLosAudios(sourceDir, targetDir);

// 5. Contar archivos para verificación
function contarArchivosDeAudio(dir) {
  if (!fs.existsSync(dir)) return 0;
  
  let contador = 0;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      contador += contarArchivosDeAudio(fullPath);
    } else if (item.name.toLowerCase().match(/\.(mp3|wav|ogg|m4a)$/)) {
      contador++;
    }
  }
  return contador;
}

const totalEnSource = contarArchivosDeAudio(sourceDir);
const totalEnTarget = contarArchivosDeAudio(targetDir);

console.log('\n📊 ============ RESUMEN FINAL ============');
console.log(`   Archivos en public/audio/: ${totalEnSource}`);
console.log(`   Archivos en dist/audio/:   ${totalEnTarget}`);
console.log(`   Tamaño total: ${resultado.tamaño}`);

if (totalEnSource === totalEnTarget) {
  console.log('✅ ¡ÉXITO! Todos los audios copiados correctamente.');
  console.log('   Netlify desplegará estos audios en el hosting.');
} else if (totalEnTarget === 0) {
  console.log('⚠️  ADVERTENCIA: No se copiaron audios.');
  console.log('   El sitio funcionará pero solo con los audios livianos de GitHub.');
} else {
  console.log(`⚠️  Diferencia: ${totalEnSource - totalEnTarget} archivos no copiados`);
}

console.log('🎯 Script finalizado.');