const fs = require("fs");
const path = require("path");

const packagesDir = path.join(__dirname, "../packages");

function fixTsConfigs() {
  const packages = fs.readdirSync(packagesDir);
  console.log(`Checking ${packages.length} packages...`);

  packages.forEach((pkg) => {
    const file = path.join(packagesDir, pkg, "tsconfig.json");
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, "utf8");
      let changed = false;

      // Fix paths
      if (content.includes("fileInput")) {
        content = content.replace(/fileInput/g, "file-input");
        changed = true;
      }
      if (content.includes("goBack")) {
        content = content.replace(/goBack/g, "go-back");
        changed = true;
      }

      // Fix rootDir
      if (content.includes('"rootDir": "../../"')) {
        content = content.replace(
          /"rootDir": "\.\.\/\.\.\/"/g,
          '"rootDir": "./src"'
        );
        changed = true;
      }

      // Disable composite to avoid nested output issues during rollup
      if (content.includes('"composite": true')) {
        content = content.replace(/"composite": true/g, '"composite": false');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(file, content);
        console.log(`[FIXED] ${file}`);
      }
    }
  });
}

fixTsConfigs();
