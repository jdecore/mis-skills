#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILLS_BASE_DIR = path.resolve(__dirname, '../skills');

const args = process.argv.slice(2);
const isGlobal = args.includes('--global') || args.includes('-g');
const isAll = args.includes('--all') || args.includes('all');
const help = args.includes('--help') || args.includes('-h');

const availableCategories = fs.readdirSync(SKILLS_BASE_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

if (help) {
  console.log('\n--- Mis Skills Installer (CLI Multi-Skill) ---\n');
  console.log('Instala skills personalizadas (Design, Testing, QA, Security) para Antigravity / Gemini CLI.\n');
  console.log('Uso:');
  console.log('  npx github:jdecore/mis-skills [categoria|--all] [--global]\n');
  console.log('Categorias disponibles:');
  availableCategories.forEach(c => console.log('  - ' + c));
  console.log('\nEjemplos:');
  console.log('  npx github:jdecore/mis-skills testing         (instala solo testing)');
  console.log('  npx github:jdecore/mis-skills design          (instala diseno Brutal Nouveau)');
  console.log('  npx github:jdecore/mis-skills --all           (instala todas)');
  console.log('  npx github:jdecore/mis-skills testing -g      (instala testing globalmente)\n');
  process.exit(0);
}

const targetBaseDir = isGlobal
  ? path.join(os.homedir(), '.gemini', 'config', 'skills')
  : path.join(process.cwd(), '.agents', 'skills');

// Determinar que categorias copiar
let categoriesToInstall = [];
const cleanArgs = args.filter(a => !a.startsWith('-'));

if (isAll || cleanArgs.length === 0 || cleanArgs.includes('all')) {
  categoriesToInstall = availableCategories;
} else {
  const chosen = cleanArgs[0].toLowerCase();
  if (!availableCategories.includes(chosen)) {
    console.error('\n[X] Categoria no encontrada: ' + chosen);
    console.log('Categorias validas: ' + availableCategories.join(', '));
    process.exit(1);
  }
  categoriesToInstall = [chosen];
}

console.log('\n[+] Instalando skills: ' + categoriesToInstall.join(', '));
console.log('[-] Destino: ' + targetBaseDir + '\n');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirRecursive(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

try {
  let count = 0;
  for (const cat of categoriesToInstall) {
    const catDir = path.join(SKILLS_BASE_DIR, cat);
    const skillDirs = fs.readdirSync(catDir, { withFileTypes: true }).filter(d => d.isDirectory());
    for (const skill of skillDirs) {
      const srcSkillPath = path.join(catDir, skill.name);
      const destSkillPath = path.join(targetBaseDir, skill.name);
      copyDirRecursive(srcSkillPath, destSkillPath);
      console.log('  OK Instalada: ' + skill.name + ' (' + cat + ')');
      count++;
    }
  }
  console.log('\n[V] Exito: ' + count + ' skill(s) instaladas correctamente.\n');
} catch (err) {
  console.error('[X] Error durante la instalacion:', err);
  process.exit(1);
}
