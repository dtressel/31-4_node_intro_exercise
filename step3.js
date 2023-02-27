const fs = require('fs');
const axios = require('axios');
let output;
let path;
let data;

for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--out') {
    i++;
    output = process.argv[i];
  } else {
    path = process.argv[i];
  }
}

function cat(path) {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function webCat(path) {
  try {
    const resp = await axios.get(path);
    return resp.data;
  } catch (err) {
    console.log(`Error fetching ${path}: ${err}`);
  }
}

function printData(data) {
  console.log(data);
}

function writeDataToFile(data) {
  fs.writeFile(output, data, 'utf8', (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`successfully wrote to ${output}`);
  });
}

async function onStart() {
  if (path.slice(0, 4) === 'http') {
    data = await webCat(path);
  } else {
    data = cat(path);
  }
  if (output && data) {
    writeDataToFile(data);
  } else if (data) {
    printData(data);
  }
}

// on start:
onStart();