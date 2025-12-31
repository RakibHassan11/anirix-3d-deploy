/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * combine-files.js (ANIRIX ENGINE VERSION)
 * Output: anirix-engine-full.txt
 */

const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "../");
const outputFile = path.join(__dirname, "anirix-3d-viewer.txt");

const allowedExtensions = [".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".css"];

const excludedFolders = [
  "node_modules", ".next", "dist", "build", ".turbo", ".git", 
  "public/draco", "public/basis" // Exclude 3D binaries (too large)
];

const alwaysIncludeFiles = [
  "next.config.ts", "tsconfig.json", "package.json", "init-engine.js"
];

function isBinary(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    return buffer.includes(0);
  } catch { return true; }
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const filename of files) {
    const fullPath = path.join(dir, filename);
    const relative = path.relative(projectRoot, fullPath);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (excludedFolders.some(f => relative.startsWith(f))) continue;
      getAllFiles(fullPath, fileList);
      continue;
    }

    const ext = path.extname(filename).toLowerCase();
    const isAlwaysIncluded = alwaysIncludeFiles.includes(filename);

    if (allowedExtensions.includes(ext) || isAlwaysIncluded) {
      if (!isBinary(fullPath)) {
        fileList.push({ path: fullPath, relative: relative });
      }
    }
  }
  return fileList;
}

function generateTree(dir, prefix = "") {
  let tree = "";
  const files = fs.readdirSync(dir);
  files.forEach((file, index) => {
    const fullPath = path.join(dir, file);
    const relative = path.relative(projectRoot, fullPath);
    if (excludedFolders.some(f => relative.startsWith(f))) return;
    const isLast = index === files.length - 1;
    const connector = isLast ? "└── " : "├── ";
    tree += `${prefix}${connector}${file}\n`;
    if (fs.statSync(fullPath).isDirectory()) {
      tree += generateTree(fullPath, prefix + (isLast ? "    " : "│   "));
    }
  });
  return tree;
}

function detectType(filepath) {
  if (filepath.includes("core-engine/core")) return "3D Math/Core";
  if (filepath.includes("core-engine/components")) return "R3F Scene Component";
  if (filepath.includes("core-engine/store")) return "Zustand State";
  if (filepath.includes("presentation/viewer-ui")) return "3D UI Overlay";
  if (filepath.includes("app/[locale]")) return "Next.js Route";
  return "Infrastructure/Setup";
}

function run() {
  console.log("🚀 Exporting Anirix Engine Codebase...");
  let content = `# 📁 ANIRIX ENGINE SOURCE\nGenerated: ${new Date().toISOString()}\n\n`;
  content += `📂 STRUCTURE\n${generateTree(projectRoot)}\n\n📦 FILES\n`;

  const files = getAllFiles(projectRoot);
  for (const file of files) {
    const fileContent = fs.readFileSync(file.path, "utf-8");
    content += `\n== FILE: ${file.relative} [${detectType(file.relative)}] ==\n\n${fileContent}\n\n`;
  }

  fs.writeFileSync(outputFile, content);
  console.log(`✨ Export complete: ${outputFile}`);
}

run();