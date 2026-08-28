const fs = require("fs");
const path = require("path");

const root = process.cwd();
const www = path.join(root, "www");

if (!fs.existsSync(www)) {
  fs.mkdirSync(www, { recursive: true });
}

const files = [
  "index.html",
  "manifest.webmanifest",
  "sw.js"
];

const optionalFiles = [
  "main.js",
  "preload.js"
];

for (const file of files) {
  const source = path.join(root, file);
  const destination = path.join(www, file);

  if (!fs.existsSync(source)) {
    throw new Error(`No se encontró ${file}`);
  }

  fs.copyFileSync(source, destination);
}

for (const file of optionalFiles) {
  const source = path.join(root, file);
  const destination = path.join(www, file);

  if (fs.existsSync(source)) {
    fs.copyFileSync(source, destination);
  }
}

const iconsSource = path.join(root, "icons");
const iconsDestination = path.join(www, "icons");

if (fs.existsSync(iconsSource)) {
  fs.cpSync(iconsSource, iconsDestination, {
    recursive: true
  });
}

console.log("Web assets preparados correctamente en ./www");
