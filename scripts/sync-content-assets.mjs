import fs from "node:fs";
import path from "node:path";

const sourceRoot = path.resolve("content/work");
const outputRoot = path.resolve("public/projects");
const allowed = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

if (!fs.existsSync(sourceRoot)) process.exit(0);

function copyTree(source, destination) {
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const input = path.join(source, entry.name);
    const output = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyTree(input, output);
    } else if (entry.isFile() && allowed.has(path.extname(entry.name).toLowerCase())) {
      fs.mkdirSync(path.dirname(output), { recursive: true });
      fs.copyFileSync(input, output);
    }
  }
}

for (const entry of fs.readdirSync(sourceRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || !/^[a-z0-9-]+$/.test(entry.name)) continue;
  const images = path.join(sourceRoot, entry.name, "images");
  if (!fs.existsSync(images)) continue;
  const destination = path.join(outputRoot, entry.name, "images");
  copyTree(images, destination);
}
