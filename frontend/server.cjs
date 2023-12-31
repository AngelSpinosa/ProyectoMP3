const express = require('express');
const jsonServer = require('json-server'); // Agrega la importación de json-server
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const app = express();

app.use('/frontend/mp3', express.static('frontend/mp3'));

server.use(middlewares);
server.use('/frontend/images', express.static(__dirname + '/frontend/images')); // Ruta más específica para archivos MP3

server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
  console.log(`Static MP3 files are served from http://localhost:${port}/frontend/images`);
});
