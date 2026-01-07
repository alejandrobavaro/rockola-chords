// const fs = require('fs');
// const path = require('path');
// const { execSync } = require('child_process');

// console.log('��� ===========================================');
// console.log('��� COPIANDO ARCHIVOS DE AUDIO PARA NETLIFY');
// console.log('��� ===========================================');

// const sourceDir = path.join(__dirname, 'public', 'audio');
// const targetDir = path.join(__dirname, 'dist', 'audio');

// // Verificar si existe la carpeta de audio local
// if (!fs.existsSync(sourceDir)) {
//   console.log('⚠️  No se encontró carpeta local de audio:', sourceDir);
//   console.log('ℹ️  Continuando sin archivos de audio...');
//   process.exit(0);
// }

// console.log(`��� Fuente: ${sourceDir}`);
// console.log(`��� Destino: ${targetDir}`);

// // Crear directorio destino si no existe
// if (!fs.existsSync(targetDir)) {
//   fs.mkdirSync(targetDir, { recursive: true });
//   console.log('✅ Directorio destino creado');
// }

// // Función para copiar archivos (compatible Windows/Linux)
// function copyFiles() {
//   try {
//     let count = 0;
    
//     // Función recursiva para copiar
//     function copyRecursive(src, dst) {
//       const items = fs.readdirSync(src, { withFileTypes: true });
      
//       for (const item of items) {
//         const srcPath = path.join(src, item.name);
//         const dstPath = path.join(dst, item.name);
        
//         if (item.isDirectory()) {
//           // Crear subdirectorio y copiar su contenido
//           if (!fs.existsSync(dstPath)) {
//             fs.mkdirSync(dstPath, { recursive: true });
//           }
//           copyRecursive(srcPath, dstPath);
//         } else if (item.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
//           // Copiar archivos de audio
//           fs.copyFileSync(srcPath, dstPath);
//           count++;
//           if (count % 50 === 0) {
//             console.log(`  ��� ${count} archivos copiados...`);
//           }
//         }
//       }
//     }
    
//     // Copiar archivos
//     copyRecursive(sourceDir, targetDir);
    
//     // Contar archivos copiados
//     function countFiles(dir) {
//       let total = 0;
//       const items = fs.readdirSync(dir, { withFileTypes: true });
      
//       for (const item of items) {
//         const itemPath = path.join(dir, item.name);
//         if (item.isDirectory()) {
//           total += countFiles(itemPath);
//         } else if (item.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
//           total++;
//         }
//       }
//       return total;
//     }
    
//     const totalFiles = countFiles(targetDir);
//     console.log(`��� ¡ÉXITO! ${totalFiles} archivos de audio copiados`);
//     console.log('✅ Los archivos están listos para Netlify');
    
//   } catch (error) {
//     console.error('❌ Error copiando archivos:', error.message);
//     process.exit(1);
//   }
// }

// // Ejecutar copia
// copyFiles();



const fs = require('fs');
const path = require('path');

console.log('🔍 ===========================================');
console.log('🔍 VERIFICANDO COPIA DE AUDIOS PARA NETLIFY');
console.log('🔍 ===========================================');

const sourceDir = path.join(__dirname, 'public', 'audio');
const targetDir = path.join(__dirname, 'dist', 'audio');

// 1. Verificar si existen audios en public/audio/
if (!fs.existsSync(sourceDir)) {
  console.log('⚠️  No se encontró carpeta de audio en:', sourceDir);
  console.log('ℹ️  Si no necesitas audios, está bien. Si los necesitas, colócalos en public/audio/');
  process.exit(0);
}

// 2. Verificar si Vite copió los audios a dist/
if (!fs.existsSync(targetDir)) {
  console.log('❌ ERROR: No se encontró carpeta de audio en dist/');
  console.log('📋 Posibles soluciones:');
  console.log('   1. Verifica que vite.config.js tenga: publicDir: "public"');
  console.log('   2. Asegúrate que los MP3 estén en public/audio/');
  console.log('   3. Ejecuta: npm run build');
  process.exit(1);
}

// 3. Contar y comparar archivos
function contarMP3(directorio) {
  let contador = 0;
  let tamañoTotal = 0;
  
  function explorar(carpeta) {
    if (!fs.existsSync(carpeta)) return;
    
    const items = fs.readdirSync(carpeta, { withFileTypes: true });
    
    for (const item of items) {
      const rutaCompleta = path.join(carpeta, item.name);
      
      if (item.isDirectory()) {
        explorar(rutaCompleta);
      } else if (item.name.toLowerCase().endsWith('.mp3')) {
        contador++;
        const stats = fs.statSync(rutaCompleta);
        tamañoTotal += stats.size;
      }
    }
  }
  
  explorar(directorio);
  return { contador, tamañoTotal: (tamañoTotal / (1024 * 1024)).toFixed(2) + ' MB' };
}

const sourceInfo = contarMP3(sourceDir);
const targetInfo = contarMP3(targetDir);

console.log('\n📊 ESTADÍSTICAS:');
console.log(`   Origen (public/audio/): ${sourceInfo.contador} archivos, ${sourceInfo.tamañoTotal}`);
console.log(`   Destino (dist/audio/):  ${targetInfo.contador} archivos, ${targetInfo.tamañoTotal}`);

if (sourceInfo.contador === targetInfo.contador) {
  console.log('\n✅ ¡ÉXITO! Todos los audios fueron copiados correctamente.');
  console.log('   Netlify desplegará la carpeta dist/ con los audios incluidos.');
} else {
  console.log(`\n⚠️  ADVERTENCIA: Faltan ${sourceInfo.contador - targetInfo.contador} archivos en dist/`);
  console.log('   Revisa la configuración de Vite en vite.config.js');
}

console.log('\n🔍 Verificación completada.');