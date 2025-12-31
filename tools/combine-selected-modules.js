/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * combine-selected-modules.js (ANIRIX MODULE FOCUS)
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const INCLUDE_EXTENSIONS = [".tsx", ".ts"];

// Modified to focus on the 3D Engine modules
const selectedModules = [
  "src/core-engine",      // The entire 3D Core
  "src/presentation/viewer-ui" // The UI controls
];

function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else if (INCLUDE_EXTENSIONS.includes(path.extname(item))) {
      results.push(fullPath);
    }
  }
  return results;
}

function findImports(content) {
  const matches = content.matchAll(/from\s+["'](@\/[^"']+)["']/g);
  return new Set(Array.from(matches, m => m[1]));
}

function combineModules() {
  console.log("🔎 Extracting 3D Engine Module...");
  let initialFiles = [];
  selectedModules.forEach(mod => {
    const fullPath = path.join(ROOT_DIR, mod);
    if (fs.statSync(fullPath).isDirectory()) {
      initialFiles = initialFiles.concat(getFilesRecursively(fullPath));
    }
  });

  let output = `# 🧊 ANIRIX MODULE EXPORT\n`;
  initialFiles.forEach(file => {
    const relative = path.relative(ROOT_DIR, file);
    const content = fs.readFileSync(file, "utf-8");
    output += `\n/* --- ${relative} --- */\n${content}\n`;
  });

  const outputFile = path.join(__dirname, "anirix-3d-module.txt");
  fs.writeFileSync(outputFile, output.trim(), "utf-8");
  console.log(`✅ Combined ${initialFiles.length} files into ${outputFile}`);
}

combineModules();