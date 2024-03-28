const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

const inputFile = 'input.txt'; 
let outputFile = 'pass.csv'; 
let outputStream = fs.createWriteStream(outputFile);
let fileSize = 0;
let passNumber = 1;

const inputStream = fs.createReadStream(inputFile);
const rl = readline.createInterface({
  input: inputStream,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const word = line.trim();
  const md5Hash = crypto.createHash('md5').update(word).digest('hex');
  const csvLine = `"${md5Hash}","${word}"\n`;

 
  if (fileSize + Buffer.byteLength(csvLine, 'utf8') > 8 * 1024 * 1024) {
    outputStream.end(); 
    passNumber++; 
    outputFile = `pass${passNumber}.csv`; 
    outputStream = fs.createWriteStream(outputFile); 
    fileSize = 0;
  }

  outputStream.write(csvLine); 
  fileSize += Buffer.byteLength(csvLine, 'utf8'); 
});

rl.on('close', () => {
  console.log('CSV files generated successfully.');
  outputStream.end(); 
});
