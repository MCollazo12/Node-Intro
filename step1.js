const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err.message}`);
      process.exit(1);
    }
    console.log(data);
  });
}

const filePath = process.argv[2];

if (!filePath) {
  console.error('No such file or directory found');
}

cat(filePath);
