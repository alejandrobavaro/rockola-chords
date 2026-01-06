const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Ìæµ ===========================================');
console.log('Ìæµ COPIANDO ARCHIVOS DE AUDIO PARA NETLIFY');
console.log('Ìæµ ===========================================');

const sourceDir = path.join(__dirname, 'public', 'audio');
const targetDir = path.join(__dirname, 'dist', 'audio');

// Verificar si existe la carpeta de audio local
if (!fs.existsSync(sourceDir)) {
  console.log('‚ö†Ô∏è  No se encontr√≥ carpeta local de audio:', sourceDir);
  console.log('‚ÑπÔ∏è  Continuando sin archivos de audio...');
  process.exit(0);
}

console.log(`Ì≥Å Fuente: ${sourceDir}`);
console.log(`Ì≥Å Destino: ${targetDir}`);

// Crear directorio destino si no existe
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('‚úÖ Directorio destino creado');
}

// Funci√≥n para copiar archivos (compatible Windows/Linux)
function copyFiles() {
  try {
    let count = 0;
    
    // Funci√≥n recursiva para copiar
    function copyRecursive(src, dst) {
      const items = fs.readdirSync(src, { withFileTypes: true });
      
      for (const item of items) {
        const srcPath = path.join(src, item.name);
        const dstPath = path.join(dst, item.name);
        
        if (item.isDirectory()) {
          // Crear subdirectorio y copiar su contenido
          if (!fs.existsSync(dstPath)) {
            fs.mkdirSync(dstPath, { recursive: true });
          }
          copyRecursive(srcPath, dstPath);
        } else if (item.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
          // Copiar archivos de audio
          fs.copyFileSync(srcPath, dstPath);
          count++;
          if (count % 50 === 0) {
            console.log(`  Ì≥Ñ ${count} archivos copiados...`);
          }
        }
      }
    }
    
    // Copiar archivos
    copyRecursive(sourceDir, targetDir);
    
    // Contar archivos copiados
    function countFiles(dir) {
      let total = 0;
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        const itemPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          total += countFiles(itemPath);
        } else if (item.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
          total++;
        }
      }
      return total;
    }
    
    const totalFiles = countFiles(targetDir);
    console.log(`Ìæâ ¬°√âXITO! ${totalFiles} archivos de audio copiados`);
    console.log('‚úÖ Los archivos est√°n listos para Netlify');
    
  } catch (error) {
    console.error('‚ùå Error copiando archivos:', error.message);
    process.exit(1);
  }
}

// Ejecutar copia
copyFiles();
