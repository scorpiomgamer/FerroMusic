const express = require('express');
const fileSystem = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const carpeta_songs = path.join(__dirname, 'songs');

app.use("/songs", express.static(carpeta_songs));

app.listen(port, () => {
  console.log(`API de musica `);
});


