const fs = require("fs");
const path = require("path");

// The .gitignore file shouldn't exist in the published module, due to the
// package.json "files" list. If it does exist, then this is NOT running in
// the published package.
if (fs.existsSync(path.resolve(__dirname, ".gitignore"))) {
  process.exit(1);
}
