/**
 * Impor HTTP Standar Library dari Node.js
 * Hal inilah yang nantinya akan kita gunakan untuk membuat
 * HTTP Server
 * */
const http = require('http');
const { PORT = 8000 } = process.env; // Ambil port dari environment variable

const fs = require('fs');
const path = require('path');
const { url } = require('inspector');
const PUBLIC_DIRECTORY = path.join(__dirname, '../public'); 

/* function getHTML(htmlFileName) {
  const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName);
  return fs.readFileSync(htmlFilePath, 'utf-8');
} */

// Request handler
// Fungsi yang berjalan ketika ada request yang masuk.
function onRequest(req, res) {
  if (req.url === "/") {
    fs.readFile("./public/index.html", 'utf-8', function (err, html) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    })
  } else if (req.url === "/getcar") {
    fs.readFile("./public/getcar.html", 'utf-8', function (err, html) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html)
    })
  } else if (req.url === "/getcars") {
    const dataPath = path.join(__dirname, '../data', './cars.json');
    const fileStream = fs.createReadStream(dataPath, 'utf-8');
    res.writeHead(200, { "Content-Type": "application/json" });
    fileStream.pipe(res);
  } else if (req.url.match("\.css$")) {
    const cssPath = path.join(__dirname, '../public', req.url);
    const fileStream = fs.createReadStream(cssPath, 'utf-8');
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
  } else if(req.url.match("\.png$")){
    const imagePath = path.join(__dirname, '../public', req.url);
    const fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
  } else if (req.url.match('.\jpg')) {
    const imagePath = path.join(__dirname, '../public', req.url);
    const fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    fileStream.pipe(res);
  } else if (req.url.match("\.js$")) {
    const jsPath = path.join(__dirname, '../public', req.url);
    const fileStream = fs.createReadStream(jsPath, 'utf-8');
    res.writeHead(200, { "Content-Type": "application/javascript" });
    fileStream.pipe(res);
  } else {
    res.writeHead(404);
    res.end("Page Not Found");
  }
}

const server = http.createServer(onRequest);

// Jalankan server
server.listen(PORT, '127.0.0.1', () => {
  console.log("Server sudah berjalan, silahkan buka http://127.0.0.1:%d", PORT);
})