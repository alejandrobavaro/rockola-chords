// upload-heavy-audio.js - VERSIÓN FINAL CONFIGURADA
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎵 ===========================================');
console.log('🎵 SUBIENDO AUDIOS PESADOS A NETLIFY');
console.log('🎵 ===========================================');

// CONFIGURACIÓN - TU SITE ID
const SITE_ID = 'd402bac4-5222-4df9-a228-398c442692ad';
const SITE_NAME = 'rockola-cancioneros';

// Configuración de rutas
const AUDIO_DIR = path.join(__dirname, 'public', 'audio');
const TEMP_DIR = path.join(__dirname, '..', `temp-${SITE_NAME}-audios`);

// 1. Verificar que existan audios
if (!fs.existsSync(AUDIO_DIR)) {
  console.log('❌ No se encontró public/audio/');
  process.exit(1);
}

// 2. Crear carpeta temporal FUERA del proyecto
console.log('📁 Creando carpeta temporal...');
console.log(`📂 Ruta: ${TEMP_DIR}`);

if (fs.existsSync(TEMP_DIR)) {
  fs.rmSync(TEMP_DIR, { recursive: true });
}
fs.mkdirSync(TEMP_DIR, { recursive: true });

// 3. Crear netlify.toml CONFIGURADO para TU SITIO
console.log('🔗 Configurando para tu sitio específico...');
console.log(`🏷️  Site: ${SITE_NAME}`);
console.log(`🔑 ID: ${SITE_ID}`);

const netlifyTomlContent = `# Configuración para: ${SITE_NAME}
[build]
  publish = "."
  command = "echo 'Heavy audio upload - skipping build'"

# Tu Site ID específico
[context.production]
  site_id = "${SITE_ID}"

# Headers para caching de audios
[[headers]]
  for = "/audio/*"
  [headers.values]
    Cache-Control = "public, max-age=604800, stale-while-revalidate=86400"
    Access-Control-Allow-Origin = "*"

# Deshabilitar funciones (no necesarias para archivos estáticos)
[functions]
  directory = null`;

fs.writeFileSync(path.join(TEMP_DIR, 'netlify.toml'), netlifyTomlContent);

// 4. Crear index.html informativo
fs.writeFileSync(path.join(TEMP_DIR, 'index.html'),
`<!DOCTYPE html>
<html>
<head>
    <title>🎵 ${SITE_NAME} - Audios Pesados</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 40px; 
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        h1 { font-size: 2.5em; margin-bottom: 20px; }
        .info { 
            background: rgba(255,255,255,0.1); 
            padding: 20px; 
            border-radius: 10px;
            margin: 20px 0;
            max-width: 600px;
        }
        .stats { 
            display: flex; 
            justify-content: center; 
            gap: 30px;
            margin: 20px 0;
        }
        .stat-item { 
            background: rgba(255,255,255,0.2); 
            padding: 15px;
            border-radius: 8px;
            min-width: 150px;
        }
    </style>
</head>
<body>
    <h1>🎵 ROCKOLA - Biblioteca de Audio</h1>
    <div class="info">
        <p><strong>Contenido:</strong> Covers y archivos comerciales de audio</p>
        <p><strong>Sitio:</strong> ${SITE_NAME}</p>
        <p><strong>Subido:</strong> ${new Date().toLocaleString('es-AR')}</p>
    </div>
    <div id="stats" class="stats">
        <!-- Se llena con JavaScript -->
    </div>
    <p>Los archivos de audio están disponibles en: /audio/</p>
    
    <script>
        // Mostrar estadísticas reales
        fetch('/audio/')
            .then(() => {
                document.getElementById('stats').innerHTML = \`
                    <div class="stat-item">
                        <h3>🎯 Estado</h3>
                        <p>✅ Subido</p>
                    </div>
                    <div class="stat-item">
                        <h3>📁 Archivos</h3>
                        <p id="fileCount">Calculando...</p>
                    </div>
                    <div class="stat-item">
                        <h3>⏰ Hora</h3>
                        <p>\${new Date().toLocaleTimeString()}</p>
                    </div>
                \`;
                
                // Intentar contar archivos
                fetch('/audio/?list=true')
                    .then(r => r.text())
                    .then(text => {
                        const matches = text.match(/href="[^"]*\\.mp3"/g);
                        if (matches) {
                            document.getElementById('fileCount').textContent = \`\${matches.length} MP3\`;
                        }
                    })
                    .catch(() => {
                        document.getElementById('fileCount').textContent = 'Varios archivos';
                    });
            })
            .catch(() => {
                document.getElementById('stats').innerHTML = \`
                    <div class="stat-item">
                        <h3>🎯 Estado</h3>
                        <p>⏳ Subiendo...</p>
                    </div>
                \`;
            });
    </script>
</body>
</html>`);

// 5. Copiar SOLO los archivos MP3 SUELTOS (los pesados)
console.log('\n📤 Copiando archivos MP3 sueltos (covers/comerciales)...');
console.log('📍 Directorio fuente:', AUDIO_DIR);

fs.mkdirSync(path.join(TEMP_DIR, 'audio'), { recursive: true });

const items = fs.readdirSync(AUDIO_DIR, { withFileTypes: true });
let archivosPesados = 0;
let tamañoTotal = 0;
const archivosCopiados = [];

for (const item of items) {
  // Solo archivos MP3 SUELTOS (no en carpetas)
  if (item.isFile() && item.name.toLowerCase().endsWith('.mp3')) {
    const srcPath = path.join(AUDIO_DIR, item.name);
    const dstPath = path.join(TEMP_DIR, 'audio', item.name);
    
    fs.copyFileSync(srcPath, dstPath);
    archivosPesados++;
    archivosCopiados.push(item.name);
    
    // Calcular tamaño
    const stats = fs.statSync(srcPath);
    tamañoTotal += stats.size;
    
    if (archivosPesados % 50 === 0) {
      console.log(`  ✅ ${archivosPesados} archivos copiados...`);
    }
  }
}

const tamañoGB = (tamañoTotal / (1024 * 1024 * 1024)).toFixed(2);

console.log(`\n📊 RESUMEN DE ARCHIVOS:`);
console.log(`   Total: ${archivosPesados} archivos MP3`);
console.log(`   Tamaño: ${tamañoGB} GB`);
console.log(`   Destino: ${path.join(TEMP_DIR, 'audio')}`);

if (archivosPesados === 0) {
  console.log('\n⚠️  No se encontraron archivos MP3 sueltos en public/audio/');
  console.log('💡 Recuerda: Los audios pesados deben estar directamente en public/audio/');
  console.log('   Ej: public/audio/acdc-back-in-black.mp3');
  
  fs.rmSync(TEMP_DIR, { recursive: true });
  process.exit(0);
}

// 6. Mostrar primeros 5 archivos como ejemplo
console.log('\n📋 Ejemplos de archivos copiados:');
archivosCopiados.slice(0, 5).forEach((archivo, i) => {
  console.log(`   ${i + 1}. ${archivo}`);
});
if (archivosCopiados.length > 5) {
  console.log(`   ... y ${archivosCopiados.length - 5} más`);
}

// 7. Subir a Netlify
console.log('\n☁️  ===========================================');
console.log('☁️  INICIANDO SUBIDA A NETLIFY');
console.log('☁️  ===========================================');
console.log(`⏰ Tiempo estimado: ${tamañoGB > 0.5 ? '30-60 minutos' : '10-20 minutos'}`);
console.log('📞 Sitio destino: https://rockola-cancioneros.netlify.app');
console.log('⚠️  No cierres la terminal durante el proceso\n');

const originalDir = process.cwd();

try {
  // Cambiar a la carpeta temporal
  process.chdir(TEMP_DIR);
  
  // Verificar que estamos en la carpeta correcta
  console.log(`📂 Directorio actual: ${process.cwd()}`);
  console.log('🔍 Verificando archivos...');
  
  const archivosEnTemp = fs.readdirSync(path.join(TEMP_DIR, 'audio'))
    .filter(f => f.endsWith('.mp3')).length;
  console.log(`✅ ${archivosEnTemp} archivos MP3 verificados en temp`);
  
  // COMANDO DE DEPLOY CON SITE ID ESPECÍFICO
  const deployCommand = `netlify deploy --site=${SITE_ID} --prod --message="ROCKOLA: ${archivosPesados} audios pesados (${tamañoGB}GB)" --timeout 3600`;
  
  console.log('\n🚀 EJECUTANDO COMANDO:');
  console.log(`   ${deployCommand}`);
  console.log('\n⏳ Iniciando upload... (esto puede tardar)\n');
  
  // Ejecutar deploy
  execSync(deployCommand, {
    stdio: 'inherit',
    encoding: 'utf8',
    timeout: 7200000, // 120 minutos (2 horas) para 1GB
    shell: true
  });
  
  // ========== ÉXITO ==========
  console.log('\n🎉 ===========================================');
  console.log('🎉 ¡SUBIDA COMPLETADA EXITOSAMENTE!');
  console.log('🎉 ===========================================');
  console.log(`📊 Estadísticas:`);
  console.log(`   • Archivos subidos: ${archivosPesados} MP3`);
  console.log(`   • Tamaño total: ${tamañoGB} GB`);
  console.log(`   • Sitio: ${SITE_NAME}`);
  console.log(`   • URL: https://${SITE_NAME}.netlify.app`);
  console.log('\n🔗 Tus audios están disponibles en:');
  console.log('   https://rockola-cancioneros.netlify.app/audio/');
  console.log('\n💡 Ejemplos directos:');
  console.log('   • https://rockola-cancioneros.netlify.app/audio/acdc-back-in-black.mp3');
  console.log('   • https://rockola-cancioneros.netlify.app/audio/queen-bohemian-rapsody.mp3');
  console.log('   • https://rockola-cancioneros.netlify.app/audio/guns-n-roses-sweet-child-of-mine.mp3');
  
} catch (error) {
  console.error('\n❌ ===========================================');
  console.error('❌ ERROR DURANTE LA SUBIDA');
  console.error('❌ ===========================================');
  console.error(`Mensaje: ${error.message}`);
  
  if (error.message.includes('timeout')) {
    console.error('\n⏰ Timeout excedido. El upload de ${tamañoGB}GB es muy grande.');
    console.error('💡 Soluciones:');
    console.error('   1. Subir en partes más pequeñas');
    console.error('   2. Usar el método manual con ZIP');
  } else if (error.message.includes('Not logged in')) {
    console.error('\n🔑 No estás autenticado en Netlify CLI');
    console.error('💡 Ejecuta: netlify login');
  } else if (error.message.includes('site not found')) {
    console.error('\n🔍 No se encontró el sitio con ID:', SITE_ID);
    console.error('💡 Verifica tu Site ID en: https://app.netlify.com');
  }
  
  console.error('\n🔄 MÉTODO ALTERNATIVO (RECOMENDADO):');
  console.error('   1. Comprime la carpeta de audios manualmente:');
  console.error(`      Ruta: ${TEMP_DIR}\\audio`);
  console.error('   2. Ve a: https://app.netlify.com/sites/rockola-cancioneros/deploys');
  console.error('   3. Haz clic en "Deploy manually"');
  console.error('   4. Arrastra el ZIP de la carpeta audio');
  console.error('   5. Netlify lo procesará automáticamente');
  
} finally {
  // 8. Regresar al directorio original y limpiar
  process.chdir(originalDir);
  
  console.log('\n🧹 ===========================================');
  console.log('🧹 LIMPIANDO ARCHIVOS TEMPORALES');
  console.log('🧹 ===========================================');
  
  try {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    console.log('✅ Archivos temporales eliminados');
  } catch (cleanError) {
    console.log(`⚠️  No se pudo limpiar completamente: ${TEMP_DIR}`);
    console.log('💡 Puedes eliminarlo manualmente');
  }
  
  console.log('\n✨ Proceso finalizado');
  console.log('💡 Recuerda: Los audios ligeros (tus originales) se suben via git push');
  console.log('   Los audios pesados (covers) se suben con este script');
}