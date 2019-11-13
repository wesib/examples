const fs = require('fs-extra');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const jsDir = path.resolve(rootDir, 'dist', 'js');

(async () => {
  try {

    await fs.ensureDir(jsDir);
    await fs.copy(require.resolve('systemjs/dist/s.min.js'), path.resolve(jsDir, 's.js'));
  } catch (e) {
    console.error('Failed to copy assets');
    process.exit(1);
  }
})();
