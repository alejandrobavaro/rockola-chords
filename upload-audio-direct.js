// upload-audio-direct.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎵 ===========================================');
console.log('🎵 SUBIENDO AUDIOS DIRECTAMENTE A NETLIFY');
console.log('🎵 ===========================================');

// Configuración
const AUDIO_SOURCE = path.join(__dirname, 'public', 'audio');
const TEMP_DIR = '.netlify-audio-upload';

// 1. Verificar que existan audios locales
if (!fs.existsSync(AUDIO_SOURCE)) {
  console.log('❌ ERROR: No se encontró public/audio/');
  console.log('💡 Coloca tus archivos MP3 en public/audio/ antes de ejecutar este script.');
  process.exit(1);
}

// 2. Crear directorio temporal
console.log('📁 Preparando archivos...');
if (fs.existsSync(TEMP_DIR)) {
  fs.rmSync(TEMP_DIR, { recursive: true });
}
fs.mkdirSync(TEMP_DIR, { recursive: true });

// 3. Crear estructura básica para Netlify
fs.writeFileSync(
  path.join(TEMP_DIR, 'index.html'),
  `<!DOCTYPE html>
<html>
<head>
    <title>Audio Upload</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        h1 { color: #333; }
    </style>
</head>
<body>
    <h1>🎵 Actualización de Archivos de Audio</h1>
    <p>Este deploy contiene solo archivos de audio para ROCKOLA.</p>
    <p>Fecha: ${new Date().toLocaleString()}</p>
</body>
</html>`
);

// 4. Copiar audios manteniendo estructura
console.log('📤 Copiando archivos MP3...');
function copiarAudiosConProgreso(origen, destino) {
  let totalArchivos = 0;
  
  function contarArchivos(dir) {
    let count = 0;
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
  
  function copiarRecursivo(src, dst) {
    const items = fs.readdirSync(src, { withFileTypes: true });
    
    for (const item of items) {
      const srcPath = path.join(src, item.name);
      const dstPath = path.join(dst, item.name);
      
      if (item.isDirectory()) {
        fs.mkdirSync(dstPath, { recursive: true });
        copiarRecursivo(srcPath, dstPath);
      } else if (item.name.match(/\.mp3$/i)) {
        fs.copyFileSync(srcPath, dstPath);
        totalArchivos++;
        
        // Mostrar progreso
        if (totalArchivos % 20 === 0) {
          console.log(`  ✅ ${totalArchivos} archivos preparados...`);
        }
      }
    }
  }
  
  const totalEsperado = contarArchivos(origen);
  console.log(`📊 Total de archivos MP3 a subir: ${totalEsperado}`);
  
  copiarRecursivo(origen, destino);
  return totalArchivos;
}

// Crear carpeta audio en temp
const tempAudioDir = path.join(TEMP_DIR, 'audio');
fs.mkdirSync(tempAudioDir, { recursive: true });

const totalCopiados = copiarAudiosConProgreso(AUDIO_SOURCE, tempAudioDir);
console.log(`📦 ${totalCopiados} archivos MP3 listos para subir`);

// 5. Verificar conexión Netlify CLI
console.log('\n🔗 Verificando Netlify CLI...');
try {
  execSync('netlify --version', { stdio: 'pipe' });
} catch (error) {
  console.log('❌ Netlify CLI no está instalado.');
  console.log('💡 Instala con: npm install -g netlify-cli');
  console.log('💡 Luego autentícate: netlify login');
  process.exit(1);
}

// 6. Subir a Netlify
console.log('\n☁️  Subiendo a Netlify (esto puede tardar varios minutos)...');
console.log('⏳ Por favor, espera. No cierres la terminal.\n');

try {
  // Comando para subir SOLO los audios
  execSync(`netlify deploy --dir=${TEMP_DIR} --prod --message="Actualización de archivos de audio"`, {
    stdio: 'inherit',
    encoding: 'utf8'
  });
  
  console.log('\n🎉 ===========================================');
  console.log('🎉 ¡AUDIOS SUBIDOS EXITOSAMENTE A NETLIFY!');
  console.log('🎉 ===========================================');
  console.log(`📊 Total subido: ${totalCopiados} archivos MP3`);
  console.log('💡 Los audios están disponibles inmediatamente en tu sitio.');
  
} catch (error) {
  console.error('\n❌ Error al subir a Netlify:', error.message);
  console.log('\n🔧 Soluciones posibles:');
  console.log('   1. Ejecuta: netlify login (para autenticarte)');
  console.log('   2. Asegúrate de tener permisos en el sitio de Netlify');
  console.log('   3. Verifica tu conexión a internet');
} finally {
  // 7. Limpiar directorio temporal
  console.log('\n🧹 Limpiando archivos temporales...');
  try {
    fs.rmSync(TEMP_DIR, { recursive: true });
    console.log('✅ Limpieza completada.');
  } catch (cleanError) {
    console.log('⚠️  No se pudo limpiar temp, puedes borrar manualmente:', TEMP_DIR);
  }
}