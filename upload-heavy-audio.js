// upload-heavy-audio.js (ES Modules)
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎵 ===========================================');
console.log('🎵 SUBIENDO AUDIOS PESADOS A NETLIFY');
console.log('🎵 ===========================================');

// Configuración
const AUDIO_DIR = path.join(__dirname, 'public', 'audio');
const TEMP_DIR = path.join(__dirname, '..', 'temp-heavy-audio-' + Date.now());

// 1. Verificar que existan audios
if (!fs.existsSync(AUDIO_DIR)) {
  console.log('❌ No se encontró public/audio/');
  process.exit(1);
}

// 2. Crear carpeta temporal FUERA del proyecto
console.log('📁 Creando carpeta temporal...');
if (fs.existsSync(TEMP_DIR)) {
  fs.rmSync(TEMP_DIR, { recursive: true });
}
fs.mkdirSync(TEMP_DIR, { recursive: true });

// 3. Crear netlify.toml simple que NO haga build
fs.writeFileSync(path.join(TEMP_DIR, 'netlify.toml'), 
`[build]
  publish = "."
  command = "echo 'Heavy audio upload - no build'"

[[headers]]
  for = "/audio/*"
  [headers.values]
    Cache-Control = "public, max-age=604800"
    Access-Control-Allow-Origin = "*"`);

// 4. Crear index.html simple
fs.writeFileSync(path.join(TEMP_DIR, 'index.html'),
`<!DOCTYPE html>
<html>
<body>
  <h1>🎵 Audios Pesados - ROCKOLA</h1>
  <p>Covers y archivos comerciales (~1GB)</p>
  <p>Subido: ${new Date().toLocaleString()}</p>
</body>
</html>`);

// 5. Copiar SOLO los archivos MP3 SUELTOS (los pesados)
console.log('📤 Copiando archivos MP3 sueltos (covers/comerciales)...');
fs.mkdirSync(path.join(TEMP_DIR, 'audio'), { recursive: true });

const items = fs.readdirSync(AUDIO_DIR, { withFileTypes: true });
let archivosPesados = 0;

for (const item of items) {
  // Solo archivos MP3 SUELTOS (no en carpetas)
  if (item.isFile() && item.name.toLowerCase().endsWith('.mp3')) {
    const srcPath = path.join(AUDIO_DIR, item.name);
    const dstPath = path.join(TEMP_DIR, 'audio', item.name);
    
    fs.copyFileSync(srcPath, dstPath);
    archivosPesados++;
    
    if (archivosPesados % 20 === 0) {
      console.log(`  ✅ ${archivosPesados} archivos pesados copiados...`);
    }
  }
}

console.log(`📦 ${archivosPesados} archivos pesados listos para subir`);

if (archivosPesados === 0) {
  console.log('⚠️  No se encontraron archivos MP3 sueltos en public/audio/');
  console.log('💡 Los archivos pesados deben estar directamente en public/audio/ (no en subcarpetas)');
  process.exit(0);
}

// 6. Cambiar a tempDir y subir
const originalDir = process.cwd();
process.chdir(TEMP_DIR);

try {
  console.log('\n☁️  Subiendo audios pesados a Netlify...');
  console.log('⏳ Esto puede tardar 30+ minutos (~1GB)...\n');
  
  execSync('netlify deploy --prod --message="ROCKOLA - Audios pesados (covers)"', {
    stdio: 'inherit',
    timeout: 2400000 // 40 minutos
  });
  
  console.log('\n🎉 ===========================================');
  console.log('🎉 ¡AUDIOS PESADOS SUBIDOS EXITOSAMENTE!');
  console.log('🎉 ===========================================');
  console.log(`📊 ${archivosPesados} archivos subidos`);
  console.log('🔗 Disponibles en: https://rockola-cancioneros.netlify.app/audio/');
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.log('\n💡 Alternativa: Sube manualmente desde https://app.netlify.com');
} finally {
  // 7. Regresar y limpiar
  process.chdir(originalDir);
  
  console.log('\n🧹 Limpiando carpeta temporal...');
  try {
    fs.rmSync(TEMP_DIR, { recursive: true });
    console.log('✅ Limpieza completada');
  } catch (e) {
    console.log(`⚠️  No se pudo limpiar: ${TEMP_DIR}`);
  }
}

console.log('\n✨ Proceso finalizado');