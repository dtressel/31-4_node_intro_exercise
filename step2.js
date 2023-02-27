const fs = require('fs');
const axios = require('axios');
const path = process.argv[2];

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if(err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  })
}

async function webCat(path) {
  try {
    const resp = await axios.get(path);
    return resp.data;
  } catch (err) {
    console.log(`Error fetching ${path}: ${err}`);
  }
}

// on start:
if (path.slice(0, 4) === 'http') {
  webCat(path);
} else {
  cat(path);
}