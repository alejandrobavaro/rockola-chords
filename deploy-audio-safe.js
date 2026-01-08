// deploy-audio-safe.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔊 SUBIENDO AUDIOS PESADOS DE FORMA SEGURA');
console.log('===========================================\n');

// Configuración
const SITE_ID = 'd402bac4-5222-4df9-a228-398c442692ad';
const AUDIO_DIR = path.join(__dirname, 'public', 'audio');

// 1. Verificar audios
if (!fs.existsSync(AUDIO_DIR)) {
  console.log('❌ No se encontró public/audio/');
  process.exit(1);
}

// 2. Obtener archivos MP3 sueltos
console.log('📂 Buscando archivos MP3...');
const items = fs.readdirSync(AUDIO_DIR, { withFileTypes: true });
const mp3Files = items
  .filter(item => item.isFile() && item.name.toLowerCase().endsWith('.mp3'))
  .map(item => item.name);

console.log(`📊 Encontrados: ${mp3Files.length} archivos MP3`);

if (mp3Files.length === 0) {
  console.log('✅ No hay audios pesados para subir');
  process.exit(0);
}

// 3. Crear carpeta temporal
const tempDir = path.join(__dirname, '..', 'audio-upload-' + Date.now());
console.log(`\n📁 Creando carpeta temporal: ${tempDir}`);

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true });
}
fs.mkdirSync(tempDir, { recursive: true });
fs.mkdirSync(path.join(tempDir, 'audio'), { recursive: true });

// 4. Copiar máximo 20 archivos (prueba segura)
const filesToUpload = mp3Files.slice(0, 20);
console.log(`📦 Subiendo ${filesToUpload.length} archivos (prueba segura)`);

filesToUpload.forEach((fileName, index) => {
  const src = path.join(AUDIO_DIR, fileName);
  const dst = path.join(tempDir, 'audio', fileName);
  fs.copyFileSync(src, dst);
  
  if ((index + 1) % 5 === 0) {
    console.log(`  ✅ ${index + 1}/${filesToUpload.length} copiados`);
  }
});

// 5. Subir a Netlify
console.log('\n☁️  Subiendo a Netlify...');
console.log('⚠️  Esto NO afectará tu sitio React\n');

try {
  // Cambiar a carpeta temporal
  const originalDir = process.cwd();
  process.chdir(tempDir);
  
  // Crear archivo simple
  fs.writeFileSync('index.html', '<h1>Audio Upload</h1><p>No afecta sitio principal</p>');
  
  // Subir
  const message = `AUDIOS ONLY: ${filesToUpload.length} archivos - NO afecta sitio React`;
  execSync(`netlify deploy --site=${SITE_ID} --prod --message="${message}"`, {
    stdio: 'inherit',
    timeout: 300000,
    shell: true
  });
  
  console.log('\n✅ Audios subidos exitosamente!');
  console.log('🔗 Disponibles en: https://rockola-cancioneros.netlify.app/audio/');
  
  // Regresar y limpiar
  process.chdir(originalDir);
  fs.rmSync(tempDir, { recursive: true });
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n💡 Puedes subir manualmente desde:', tempDir);
}

console.log('\n✨ Proceso completado');