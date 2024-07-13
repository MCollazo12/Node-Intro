const fs = require('fs');
const axios = require('axios');


function handleOutput(data, out) {
  if (out) {
    fs.writeFile(out, data, 'utf8', (err) => {
      if (err) {
        console.error(`Coundn't write to ${out} : ${err.message}`);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

function cat(path, out) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err.message}`);
      process.exit(1);
    }
    handleOutput(data, out)
  });
}

async function webCat(url, out) {
  try {
    const response = await axios.get(url);
    handleOutput(response.data, out)
  } catch (err) {
    console.error(`Error fetching ${url}: ${err.message}`);
    process.exit(1);
  }
}

// Handle user's command line arguments
let path, data;

if (process.argv[2] === '--out') {
  path = process.argv[3];
  data = process.argv[4];
  console.log(`Path: ${path} | Data: ${data}`)
} else {
  data = process.argv[2]
}

if (data.startsWith('http://') || data.startsWith('https://')) {
  webCat(data, path)
} else {
  cat(data, path)
}
