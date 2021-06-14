
const http = require('http');
const { parse } = require('querystring');
const fs = require('fs').promises;

let messanges = "";

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    collectRequestData(req, result => {
      console.log(result);
      messanges += result.mes;
      fs.readFile(__dirname + "/index.html")
        .then(contents => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(contents);
        })
        .catch(err => {
          res.writeHead(500);
          res.end(err);
          return;
        });
    });
  }
  else {
    fs.readFile(__dirname + "/index.html")
      .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
      })
      .catch(err => {
        res.writeHead(500);
        res.end(err);
        return;
      });
  }
});
server.listen(8000);

function collectRequestData(request, callback) {
  const FORM_URLENCODED = 'application/x-www-form-urlencoded';
  if (request.headers['content-type'] === FORM_URLENCODED) {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      callback(parse(body));
    });
  }
  else {
    callback(null);
  }
}