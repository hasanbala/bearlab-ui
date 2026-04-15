const fs = require("fs");
const path = require("path");

const packagesDir = path.join(__dirname, "../packages");

function updateVersions() {
  const packages = fs.readdirSync(packagesDir);
  console.log("--- Starting version update process ---");

  packages.forEach((pkg) => {
    const pkgPath = path.join(packagesDir, pkg, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      const oldVersion = pkgJson.version;
      let newVersion = oldVersion;

      if (oldVersion === "1.0.0") {
        console.log(`[KEEP] ${pkgJson.name}: stays at ${oldVersion}`);
      } else {
        newVersion = "1.1.0";
        pkgJson.version = newVersion;
        fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2) + "\n");
        console.log(`[UPDATE] ${pkgJson.name}: ${oldVersion} -> ${newVersion}`);
      }
    }
  });

  console.log("--- Version update complete ---");
}

updateVersions();
