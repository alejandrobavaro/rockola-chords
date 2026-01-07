// copy-audio.js (VERSIÓN QUE SÍ COPIA)
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 ===========================================');
console.log('🚀 COPIANDO AUDIOS DE public/ A dist/');
console.log('🚀 ===========================================');

const sourceDir = path.join(__dirname, 'public', 'audio');
const targetDir = path.join(__dirname, 'dist', 'audio');

// 1. Verificar si existen audios locales
if (!fs.existsSync(sourceDir)) {
  console.log('⚠️  No hay audios en public/audio/');
  console.log('💡 Ejecuta en tu PC: npm run deploy-audio para subir audios');
  process.exit(0);
}

// 2. Crear directorio destino si no existe
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('📁 Carpeta dist/audio/ creada');
}

// 3. Copiar archivos
function copiarArchivos(origen, destino) {
  let contador = 0;
  
  function copiarRecursivo(src, dst) {
    const items = fs.readdirSync(src, { withFileTypes: true });
    
    for (const item of items) {
      const srcPath = path.join(src, item.name);
      const dstPath = path.join(dst, item.name);
      
      if (item.isDirectory()) {
        if (!fs.existsSync(dstPath)) {
          fs.mkdirSync(dstPath, { recursive: true });
        }
        contador += copiarRecursivo(srcPath, dstPath);
      } else if (item.name.match(/\.mp3$/i)) {
        fs.copyFileSync(srcPath, dstPath);
        contador++;
      }
    }
    return contador;
  }
  
  return copiarRecursivo(origen, destino);
}

const totalCopiados = copiarArchivos(sourceDir, targetDir);
console.log(`✅ ${totalCopiados} archivos MP3 copiados a dist/audio/`);

// 4. Contar para verificación
function contarArchivos(dir) {
  let count = 0;
  if (!fs.existsSync(dir)) return 0;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      count += contarArchivos(fullPath);
    } else if (item.name.match(/\.mp3$/i)) {
      count++;
    }
  }
  return count;
}

const enSource = contarArchivos(sourceDir);
const enTarget = contarArchivos(targetDir);

console.log('\n📊 RESUMEN:');
console.log(`   En public/audio/: ${enSource} archivos`);
console.log(`   En dist/audio/:   ${enTarget} archivos`);

if (enSource === enTarget) {
  console.log('🎉 ¡ÉXITO! Todos los audios están listos para Netlify.');
} else {
  console.log(`⚠️  Diferencia: ${enSource - enTarget} archivos`);
}