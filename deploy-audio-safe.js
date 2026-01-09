// deploy-audio-safe.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔊 SUBIENDO AUDIOS PESADOS SEGURO');
console.log('=================================\n');

const SITE_ID = 'd402bac4-5222-4df9-a228-398c442692ad';
const AUDIO_DIR = path.join(__dirname, 'public', 'audio');

// Verificar audios
if (!fs.existsSync(AUDIO_DIR)) {
  console.log('❌ No hay audios');
  process.exit(1);
}

// Obtener archivos MP3
const items = fs.readdirSync(AUDIO_DIR, { withFileTypes: true });
const mp3Files = items
  .filter(item => item.isFile() && item.name.endsWith('.mp3'))
  .map(item => item.name);

console.log(`📊 MP3 encontrados: ${mp3Files.length}`);

if (mp3Files.length === 0) {
  console.log('✅ No hay audios para subir');
  process.exit(0);
}

// Tomar solo 5 para prueba
const filesToUpload = mp3Files.slice(0, 5);
console.log(`📦 Subiendo 5 archivos (prueba):`);

// Crear carpeta temporal
const tempDir = path.join(__dirname, '..', 'temp-audio-' + Date.now());
if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });
fs.mkdirSync(path.join(tempDir, 'audio'), { recursive: true });

// Copiar archivos
filesToUpload.forEach(file => {
  fs.copyFileSync(
    path.join(AUDIO_DIR, file),
    path.join(tempDir, 'audio', file)
  );
  console.log(`  ✅ ${file}`);
});

// Subir
console.log('\n☁️  Subiendo...');
try {
  const originalDir = process.cwd();
  process.chdir(tempDir);
  
  const message = `AUDIOS: ${filesToUpload.length} archivos - Sitio React NO afectado`;
  execSync(`netlify deploy --site=${SITE_ID} --prod --message="${message}"`, {
    stdio: 'inherit',
    timeout: 300000,
    shell: true
  });
  
  console.log('\n✅ Audios subidos!');
  console.log('🔗 Disponibles en: https://rockola-cancioneros.netlify.app/audio/');
  
  process.chdir(originalDir);
  fs.rmSync(tempDir, { recursive: true });
  
} catch (error) {
  console.error('❌ Error:', error.message);
}

console.log('\n✨ Listo');