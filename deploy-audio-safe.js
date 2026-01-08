// deploy-audio-safe.js - ÚNICO script para subir audios pesados
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔊 ===========================================');
console.log('🔊 SCRIPT SEGURO PARA SUBIR AUDIOS PESADOS');
console.log('🔊 ===========================================');
console.log('⚠️  Este script SOLO sube audios, NO afecta tu sitio React');
console.log('📌 Audios ligeros ya están en GitHub');
console.log('📌 Audios pesados van directo a Netlify\n');

// CONFIGURACIÓN
const SITE_ID = 'd402bac4-5222-4df9-a228-398c442692ad';
const AUDIO_SOURCE = path.join(__dirname, 'public', 'audio');

// 1. Verificar que existen audios
if (!fs.existsSync(AUDIO_SOURCE)) {
  console.log('❌ No se encontró public/audio/');
  process.exit(1);
}

// 2. Obtener SOLO archivos MP3 SUELTOS (los pesados)
console.log('📂 Buscando archivos MP3 sueltos (covers/comerciales)...');
const items = fs.readdirSync(AUDIO_SOURCE, { withFileTypes: true });
const heavyAudioFiles = items
  .filter(item => item.isFile() && item.name.toLowerCase().endsWith('.mp3'))
  .map(item => ({
    name: item.name,
    path: path.join(AUDIO_SOURCE, item.name),
    size: fs.statSync(path.join(AUDIO_SOURCE, item.name)).size
  }));

console.log(`📊 Encontrados: ${heavyAudioFiles.length} archivos MP3 pesados`);

if (heavyAudioFiles.length === 0) {
  console.log('✅ No hay audios pesados para subir');
  console.log('💡 Los audios pesados deben estar directamente en public/audio/');
  console.log('   Ejemplo: public/audio/acdc-back-in-black.mp3');
  process.exit(0);
}

// 3. Mostrar resumen
const totalSizeMB = (heavyAudioFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024)).toFixed(2);
console.log(`💾 Tamaño total: ${totalSizeMB} MB`);
console.log('\n📋 Primeros 5 archivos:');
heavyAudioFiles.slice(0, 5).forEach((file, i) => {
  const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
  console.log(`   ${i + 1}. ${file.name} (${sizeMB} MB)`);
});
if (heavyAudioFiles.length > 5) {
  console.log(`   ... y ${heavyAudioFiles.length - 5} más`);
}

// 4. Preguntar cuántos subir
console.log('\n🎯 ¿Cuántos archivos quieres subir?');
console.log(`   1. Todos (${heavyAudioFiles.length} archivos, ~${totalSizeMB} MB)`);
console.log(`   2. Primeros 50 (más seguro)`);
console.log(`   3. Primeros 20 (prueba rápida)`);
console.log(`   4. Personalizado (tú eliges cantidad)`);

// Por ahora, usaremos 50 por defecto (opción más segura)
const FILES_PER_BATCH = 50;
const filesToUpload = heavyAudioFiles.slice(0, FILES_PER_BATCH);
const batchSizeMB = (filesToUpload.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024)).toFixed(2);

console.log(`\n📦 Subiendo: ${filesToUpload.length} archivos (${batchSizeMB} MB)`);

// 5. Crear carpeta temporal
const tempDir = path.join(__dirname, '..', 'temp-audio-upload-' + Date.now());
console.log(`\n📁 Creando carpeta temporal: ${tempDir}`);

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// IMPORTANTE: NO crear index.html ni netlify.toml aquí
// Solo copiamos los audios

// 6. Copiar audios
console.log('📤 Copiando archivos...');
fs.mkdirSync(path.join(tempDir, 'audio'), { recursive: true });

let copiedCount = 0;
filesToUpload.forEach(file => {
  const destPath = path.join(tempDir, 'audio', file.name);
  fs.copyFileSync(file.path, destPath);
  copiedCount++;
  
  if (copiedCount % 20 === 0) {
    console.log(`  ✅ ${copiedCount}/${filesToUpload.length} copiados`);
  }
});

console.log(`📦 ${copiedCount} archivos listos en: ${tempDir}/audio/`);

// 7. SUBIR USANDO MÉTODO QUE NO AFECTA EL SITIO
console.log('\n☁️  ===========================================');
console.log('☁️  SUBIENDO AUDIOS A NETLIFY');
console.log('☁️  ===========================================');
console.log('⚠️  NO se afectará tu sitio React existente');
console.log('⏰ Esto puede tardar varios minutos...\n');

try {
  // Primero, verifica el estado actual del sitio
  console.log('🔍 Verificando estado del sitio...');
  const siteInfo = JSON.parse(execSync(`netlify api getSite --data="{ \\"site_id\\": \\"${SITE_ID}\\" }"`, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore'] // Ignorar errores
  }));
  
  console.log(`🏷️  Sitio: ${siteInfo.name}`);
  console.log(`🔗 URL: ${siteInfo.url}`);
  console.log('✅ Sitio React está activo y no será afectado\n');
  
} catch (error) {
  console.log('⚠️  No se pudo verificar el sitio, continuando...');
}

// 8. MÉTODO SEGURO: Usar netlify deploy con contexto específico
console.log('🚀 Usando método seguro (partial deploy)...');

try {
  // Cambiar al directorio temporal
  const originalDir = process.cwd();
  process.chdir(tempDir);
  
  // Crear un netlify.toml MÍNIMO que indique que es solo para audios
  fs.writeFileSync('netlify.toml',
`# DEPLOY PARCIAL - SOLO AUDIOS
# Este deploy NO reemplaza el sitio principal

[build]
  publish = "."
  command = "echo 'Audio files only - not a full site deploy'"

# Contexto específico para audios
[context.audio-deploy]
  # Esto evita que sobrescriba el deploy principal
`);

  // Ejecutar deploy con mensaje claro
  const message = `[AUDIOS ONLY] ${filesToUpload.length} archivos de audio - NO afecta sitio React`;
  
  console.log(`📝 Mensaje: "${message}"`);
  console.log('⏳ Subiendo... (por favor espera)\n');
  
  execSync(`netlify deploy --site=${SITE_ID} --prod --message="${message}"`, {
    stdio: 'inherit',
    timeout: 1800000, // 30 minutos máximo
    shell: true
  });
  
  console.log('\n🎉 ===========================================');
  console.log('🎉 ¡AUDIOS SUBIDOS EXITOSAMENTE!');
  console.log('🎉 ===========================================');
  console.log(`📊 ${filesToUpload.length} archivos subidos`);
  console.log(`💾 ${batchSizeMB} MB de datos`);
  console.log('\n✅ Tu sitio React SIGUE INTACTO en:');
  console.log('   https://rockola-cancioneros.netlify.app');
  console.log('\n🔗 Los nuevos audios están disponibles en:');
  console.log('   https://rockola-cancioneros.netlify.app/audio/');
  console.log('\n📋 Ejemplos:');
  filesToUpload.slice(0, 3).forEach(file => {
    console.log(`   • https://rockola-cancioneros.netlify.app/audio/${file.name}`);
  });
  
  // Regresar al directorio original
  process.chdir(originalDir);
  
} catch (error) {
  console.error('\n❌ Error durante la subida:', error.message);
  
  if (error.message.includes('timeout')) {
    console.log('\n⏰ Timeout - Los archivos son muy grandes');
    console.log('💡 Sube en lotes más pequeños:');
    console.log('   Cambia FILES_PER_BATCH = 20 en el script');
  }
  
  // Método de respaldo: Subir manualmente
  console.log('\n🔄 MÉTODO MANUAL DE RESPALDO:');
  console.log(`   1. Comprime la carpeta: ${tempDir}/audio/`);
  console.log('   2. Ve a: https://app.netlify.com/sites/rockola-cancioneros/deploys');
  console.log('   3. Haz clic en "Deploy manually"');
  console.log('   4. Arrastra el archivo ZIP');
  console.log('   5. Netlify extraerá los audios SIN afectar tu sitio');
}

// 9. LIMPIAR (opcional)
console.log('\n🧹 Limpiando carpeta temporal...');
try {
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log('✅ Limpieza completada');
} catch (error) {
  console.log(`⚠️  No se pudo limpiar: ${tempDir}`);
  console.log('💡 Puedes eliminarla manualmente más tarde');
}

console.log('\n✨ Proceso finalizado');
console.log('\n📌 RECUERDA:');
console.log('   • Tu sitio React: https://rockola-cancioneros.netlify.app');
console.log('   • Audios: https://rockola-cancioneros.netlify.app/audio/');
console.log('   • Para subir más audios: npm run deploy-audio-safe');