import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = ["app", "components", "contexts", "hooks", "lib", "styles"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip common heavy dirs if accidentally included
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.has(ext)) {
        processFile(full);
      }
    }
  }
}

function applyReplacements(input) {
  let out = input;

  // Prefer contrast-safe replacements first (combined patterns).
  out = out.replaceAll("bg-[#1a59a9] text-black", "bg-black text-white");
  out = out.replaceAll("bg-[#1a59a9]  text-black", "bg-black text-white");
  out = out.replaceAll("bg-[#1a59a9] text-white", "bg-black text-white");

  // Core brand blue -> black
  out = out.replaceAll("bg-[#1a59a9]", "bg-black");
  out = out.replaceAll("text-[#1a59a9]", "text-black");
  out = out.replaceAll("border-[#1a59a9]", "border-black");
  out = out.replaceAll("focus:ring-[#1a59a9]", "focus:ring-black");
  out = out.replaceAll("focus:border-[#1a59a9]", "focus:border-black");
  out = out.replaceAll("ring-[#1a59a9]", "ring-black");

  // Known companion shade
  out = out.replaceAll("hover:bg-[#144a8f]", "hover:bg-black/90");

  // Common gradients using the brand blue
  out = out.replaceAll("from-[#1a59a9]", "from-black");
  out = out.replaceAll("to-[#1a59a9]", "to-black");

  // Yellow/orange paired with brand blue in a few pages
  out = out.replaceAll("to-yellow-500", "to-neutral-700");
  out = out.replaceAll("hover:bg-yellow-500", "hover:bg-black/90");
  out = out.replaceAll("text-yellow-600", "text-black");
  out = out.replaceAll("bg-yellow-100", "bg-black/5");

  // Orange focus ring used in auth UI
  out = out.replaceAll("focus:ring-orange-500", "focus:ring-black");

  return out;
}

function processFile(filePath) {
  const before = fs.readFileSync(filePath, "utf8");
  const after = applyReplacements(before);
  if (after !== before) {
    fs.writeFileSync(filePath, after, "utf8");
    // console.log("updated", path.relative(ROOT, filePath));
  }
}

for (const d of TARGET_DIRS) {
  const full = path.join(ROOT, d);
  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) {
    walk(full);
  }
}


