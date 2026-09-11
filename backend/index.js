const express = require('express');
const fileSystem = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const carpeta_songs = path.join(__dirname, 'songs');
const carpeta_frontend = path.join(__dirname, '..');

app.use(express.static(carpeta_frontend));

app.use('/songs', express.static(carpeta_songs));

app.get('/api/canciones', (req, res) => {
    fileSystem.readdir(carpeta_songs, (err, files) => {
        if (err) {
            console.error('Error al leer la carpeta de canciones:', err);

            return res.status(500).json({
                error: 'No se pudieron obtener las canciones'
            });
        }

        const canciones = files.filter(file => {
            const extension = path.extname(file).toLowerCase();

            return extension === '.mp3' ||
                   extension === '.wav' ||
                   extension === '.ogg' ||
                   extension === '.m4a' ||
                   extension === '.aac' ||
                   extension === '.flac';
        });

        res.json(canciones);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(carpeta_frontend, 'index.html'));
});

app.listen(port, () => {
    console.log(`FerroMusic funcionando en http://localhost:${port}`);
});