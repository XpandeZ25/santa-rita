import fs from 'fs';
import path from 'path';

const searchDir = 'c:/Users/Globalnet/OneDrive/Escritorio/PAGINAS/pagina de santa rita/frontend/src';

const searchRegexes = [
  { pattern: /\banos\b/gi, label: 'anos -> años' },
  { pattern: /\bano\b/gi, label: 'ano -> año' },
  { pattern: /enfermeria/gi, label: 'enfermeria -> enfermería' },
  { pattern: /practica/gi, label: 'practica -> práctica' },
  { pattern: /practicas/gi, label: 'practicas -> prácticas' },
  { pattern: /teoria/gi, label: 'teoria -> teoría' },
  { pattern: /ayudo\b/gi, label: 'ayudo -> ayudó' },
  { pattern: /tenia\b/gi, label: 'tenia -> tenía' },
  { pattern: /tambien/gi, label: 'tambien -> también' },
  { pattern: /atencion/gi, label: 'atencion -> atención' },
  { pattern: /clinica/gi, label: 'clinica -> clínica' },
  { pattern: /educacion/gi, label: 'educacion -> educación' },
  { pattern: /resolucion/gi, label: 'resolucion -> resolución' },
  { pattern: /garantia/gi, label: 'garantia -> garantía' },
  { pattern: /evaluacion/gi, label: 'evaluacion -> evaluación' }
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(searchDir);
console.log(`Encontrados ${files.length} archivos para analizar.`);

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let found = false;
  searchRegexes.forEach(item => {
    const matches = content.match(item.pattern);
    if (matches) {
      console.log(`Encontrado match [${item.label}] (${matches.length} veces) en: ${file}`);
      found = true;
    }
  });
});
