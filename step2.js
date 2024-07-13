const fs = require('fs');
const axios = require('axios');
const url = require('url');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err.message}`);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err.message}`);
    process.exit(1);
  }
}

// Check if the argument is a valid URL
function checkUrl(string) {
  try {
    new url.URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

// Get the argument from command line
const arg = process.argv[2];

if (!arg) {
  console.error('Please provide a file path or URL as an argument.');
  process.exit(1);
}

if (checkUrl(arg)) {
  webCat(arg);
} else {
  cat(arg);
}