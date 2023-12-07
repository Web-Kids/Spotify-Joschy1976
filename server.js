// Importiere das Express-Framework
const express = require('express');

// Importiere die 'node-fetch'-Bibliothek für HTTP-Anfragen
const fetch = require('node-fetch');

// Erstelle eine Express-Anwendung
const app = express();

// Definiere den Port, auf dem der Server lauschen wird
const port = 3001;

// Stelle sicher, dass statische Dateien direkt von diesem Verzeichnis serviert werden können
app.use(express.static(__dirname));

// Route für die Suchanfragen
app.get('/search', async (req, res) => {
    // Extrahiere den Suchbegriff aus der Anfrage
    const searchInput = req.query.q;
    
    // Baue die API-URL für Deezer-Suchanfragen zusammen
    const apiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(searchInput)}`;

    try {
        // Führe die Deezer-Suchanfrage durch
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Sende die erhaltenen Daten als JSON zurück
        res.json(data);
    } catch (error) {
        // Behandele Fehler und sende eine 500 Internal Server Error-Antwort zurück
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Routen für die Top-Podcasts
app.get('/top-podcasts', async (req, res) => {
    try {
        // Führe eine Deezer-Anfrage für die Top-Podcasts durch
        const response = await fetch('https://api.deezer.com/chart/0/podcasts');
        const data = await response.json();
        
        // Sende die erhaltenen Daten als JSON zurück
        res.json(data);
    } catch (error) {
        // Behandele Fehler und sende eine 500 Internal Server Error-Antwort zurück
        console.error('Error fetching top podcasts:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Routen für die Top-Alben
app.get('/top-albums', async (req, res) => {
    try {
        // Führe eine Deezer-Anfrage für die Top-Alben durch
        const response = await fetch('https://api.deezer.com/chart/0/albums');
        const data = await response.json();
        
        // Sende die erhaltenen Daten als JSON zurück
        res.json(data);
    } catch (error) {
        // Behandele Fehler und sende eine 500 Internal Server Error-Antwort zurück
        console.error('Error fetching top albums:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Routen für die Top-Charts
app.get('/top-charts', async (req, res) => {
    try {
        // Führe eine Deezer-Anfrage für die Top-Charts durch
        const response = await fetch('https://api.deezer.com/chart');
        const data = await response.json();
        
        // Sende die erhaltenen Daten als JSON zurück
        res.json(data);
    } catch (error) {
        // Behandele Fehler und sende eine 500 Internal Server Error-Antwort zurück
        console.error('Error fetching top charts:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Starte den Server und lausche auf dem angegebenen Port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});