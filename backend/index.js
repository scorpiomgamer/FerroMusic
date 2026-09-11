const express = require('express');
const fileSystem = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const carpeta_songs = path.join(__dirname, 'songs');

app.use("/songs", express.static(carpeta_songs));
getSongs();

function getSongs() {
    fileSystem.readdir(carpeta_songs, (err, files) => {
        if (err) {
            console.error('Error al leer la carpeta de canciones:', err);
            return;
        }
        console.log('Canciones disponibles:', files);
    });
}

app.listen(port, () => {
  console.log(`API de musica escuchando en http://localhost:${port}`);
});


