// check-missing-audios.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 VERIFICANDO AUDIOS FALTANTES');
console.log('===============================\n');

const AUDIO_DIR = path.join(__dirname, 'public', 'audio');

// 1. Obtener TODOS los MP3 locales
const items = fs.readdirSync(AUDIO_DIR, { withFileTypes: true });
const localMp3Files = items
  .filter(item => item.isFile() && item.name.toLowerCase().endsWith('.mp3'))
  .map(item => item.name);

console.log(`📊 MP3 locales: ${localMp3Files.length} archivos`);

// 2. Verificar cuáles están en Netlify
async function checkFileOnNetlify(filename) {
  return new Promise((resolve) => {
    const url = `https://rockola-cancioneros.netlify.app/audio/${filename}`;
    const req = https.get(url, (res) => {
      resolve(res.statusCode === 200);
    });
    
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  console.log('🔗 Verificando en Netlify...\n');
  
  const results = [];
  const batchSize = 10;
  
  for (let i = 0; i < localMp3Files.length; i += batchSize) {
    const batch = localMp3Files.slice(i, i + batchSize);
    
    console.log(`📦 Lote ${Math.floor(i/batchSize) + 1}: ${batch.length} archivos`);
    
    const batchResults = await Promise.all(
      batch.map(async (file) => {
        const exists = await checkFileOnNetlify(file);
        return { file, exists };
      })
    );
    
    results.push(...batchResults);
    
    // Pausa para no sobrecargar
    if (i + batchSize < localMp3Files.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // 3. Mostrar resultados
  const existingFiles = results.filter(r => r.exists).map(r => r.file);
  const missingFiles = results.filter(r => !r.exists).map(r => r.file);
  
  console.log('\n📊 RESULTADOS:');
  console.log(`✅ En Netlify: ${existingFiles.length} archivos`);
  console.log(`❌ Faltantes: ${missingFiles.length} archivos`);
  
  if (missingFiles.length > 0) {
    console.log('\n📋 ARCHIVOS FALTANTES:');
    missingFiles.slice(0, 20).forEach((file, i) => {
      console.log(`   ${i + 1}. ${file}`);
    });
    
    if (missingFiles.length > 20) {
      console.log(`   ... y ${missingFiles.length - 20} más`);
    }
    
    // Crear script para subir los faltantes
    const scriptContent = `// subir-faltantes.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ID = 'd402bac4-5222-4df9-a228-398c442692ad';
const AUDIO_DIR = path.join(__dirname, 'public', 'audio');

const filesToUpload = ${JSON.stringify(missingFiles, null, 2)};

console.log('🚀 Subiendo ${missingFiles.length} archivos faltantes...');

// Dividir en lotes de 20
const batchSize = 20;
for (let i = 0; i < filesToUpload.length; i += batchSize) {
  const batch = filesToUpload.slice(i, i + batchSize);
  console.log(\`\\n📦 Lote \${Math.floor(i/batchSize) + 1}: \${batch.length} archivos\`);
  
  // Crear carpeta temporal
  const tempDir = path.join(__dirname, '..', 'batch-\${i/batchSize + 1}');
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
  fs.mkdirSync(tempDir, { recursive: true });
  fs.mkdirSync(path.join(tempDir, 'audio'), { recursive: true });
  
  // Copiar archivos
  batch.forEach(file => {
    fs.copyFileSync(
      path.join(AUDIO_DIR, file),
      path.join(tempDir, 'audio', file)
    );
  });
  
  // Subir
  const originalDir = process.cwd();
  process.chdir(tempDir);
  
  try {
    const message = \`Audios faltantes: Lote \${i/batchSize + 1} (\${batch.length} archivos)\`;
    execSync(\`netlify deploy --site=\${SITE_ID} --prod --message="\${message}"\`, {
      stdio: 'inherit',
      timeout: 300000
    });
    console.log(\`✅ Lote \${i/batchSize + 1} subido\`);
  } catch (error) {
    console.error(\`❌ Error en lote \${i/batchSize + 1}:\`, error.message);
  }
  
  process.chdir(originalDir);
  fs.rmSync(tempDir, { recursive: true });
  
  // Pausa entre lotes
  if (i + batchSize < filesToUpload.length) {
    console.log('⏰ Esperando 15 segundos...');
    await new Promise(resolve => setTimeout(resolve, 15000));
  }
}

console.log('\\n🎉 ¡Todos los audios faltantes subidos!');
`;
    
    fs.writeFileSync('subir-faltantes.js', scriptContent);
    console.log('\n📝 Script creado: subir-faltantes.js');
    console.log('💡 Ejecuta: node subir-faltantes.js');
  } else {
    console.log('\n🎉 ¡Todos los audios están en Netlify!');
  }
}

main().catch(console.error);