#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.resolve(__dirname, '../templates');

const args = process.argv.slice(2);
const isGlobal = args.includes('--global') || args.includes('-g');
const help = args.includes('--help') || args.includes('-h');

if (help) {
  console.log('\n--- Brutal Nouveau Skill Installer ---\n');
  console.log('Instala las skills de diseno Brutal Nouveau con la paleta Mercado al Atardecer.\n');
  console.log('Uso:');
  console.log('  npx brutal-nouveau-skill           Instala en el proyecto (.agents/skills/)');
  console.log('  npx brutal-nouveau-skill --global  Instala globalmente en ~/.gemini/config/skills/\n');
  process.exit(0);
}

const targetBaseDir = isGlobal
  ? path.join(os.homedir(), '.gemini', 'config', 'skills')
  : path.join(process.cwd(), '.agents', 'skills');

console.log('\n[+] Instalando Brutal Nouveau Skills...');
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
  copyDirRecursive(TEMPLATES_DIR, targetBaseDir);
  console.log('OK Skills instaladas con exito:');
  console.log('  - brutal-nouveau-core');
  console.log('  - brutal-nouveau-web');
  console.log('\nValidacion:');
  console.log('  python ' + path.join(targetBaseDir, 'brutal-nouveau-web', 'scripts', 'validate.py') + ' src/styles.css src/routes/index.tsx\n');
} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}
