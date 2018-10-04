const http = require('http');
const fs = require('fs');
const path = require('path');
const beers = require('./api/models/beer')
const PORT = require("./api/configurations/config").PORT;
const router = require("./api/configurations/router")


const httpServer = http.createServer(requestResponseHandler);

const thermoService = require('./api/services/thermoService')


httpServer.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})

function requestResponseHandler(request, response) {
  if (request.url === '/') {
    sendResponse('./index.html', 'text/html', response)
  }
  else if (/^(\/api)/.test(request.url)) {
    if (request.url == '/api/' && request.method == "GET") {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      let beerList = beers.findAll()
      let teste = JSON.stringify(beerList)
      response.write(teste);
      response.end();
    }
    else if (request.url == '/api/' && request.method == "PUT") {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
      });

      request.on('end', () => {
        response.end(thermoService.getTempAndStatus(body))
      });
    }
    else {
      response.end()
    }
  }
  else {
    sendResponse(request.url, getContentType(request.url), response);
  }
}

function sendResponse(url, contentType, res) {
  let file = path.join(__dirname + '/public', url);
  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.write(`File '${file}' Not Found!`);
      res.end();
      console.log("Response: 404 ${file}, err");
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(content);
      res.end();
      console.log(`Response: 200 ${file}`);
    }
  })
}

function getContentType(url) {
  switch (path.extname(url)) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    default:
      return 'application/octate-stream';
  }
}
