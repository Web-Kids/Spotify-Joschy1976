// app.js

// Funktion für die Benutzerregistrierung
function registerUser() {
    const username = prompt('Benutzername:');
    const password = prompt('Passwort:');
    
    // Hier könntest du die Benutzerdaten in einer Datenbank speichern (nicht empfohlen für Produktion)
    const user = { username, password };
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    alert('Registrierung erfolgreich.');
}

// Funktion für die Benutzeranmeldung
function loginUser() {
    const storedUser = localStorage.getItem('currentUser');
    
    if (!storedUser) {
        alert('Benutzer nicht gefunden. Bitte zuerst registrieren.');
        return;
    }
    
    const user = JSON.parse(storedUser);
    const enteredUsername = prompt('Benutzername:');
    const enteredPassword = prompt('Passwort:');
    
    if (enteredUsername === user.username && enteredPassword === user.password) {
        alert('Anmeldung erfolgreich.');
        // Hier kannst du den angemeldeten Benutzer weiter verarbeiten, z.B. in einer globalen Variable speichern
    } else {
        alert('Falscher Benutzername oder Passwort.');
    }
}

// Funktion zum Anzeigen der Top-Podcasts
function displayTopPodcasts(data) {
    const topPodcastsContainer = document.getElementById('top-podcasts-container');
    topPodcastsContainer.innerHTML = ''; // Leere das Container-Feld
    
    if (data.data && data.data.length > 0) {
        data.data.forEach(item => {
            const podcastTitle = item.title;
            const podcastImage = item.picture_medium;
            const podcastDescription = item.description;
    
            // Erstelle ein DOM-Element für jeden Podcast
            const podcastElement = document.createElement('div');
            podcastElement.classList.add('podcast');
            podcastElement.innerHTML = `
                <img src="${podcastImage}" alt="${podcastTitle}">
                <p>${podcastTitle}</p>
                <p>${podcastDescription}</p>
            `;
    
            // Füge das Podcast-Element dem Container hinzu
            topPodcastsContainer.appendChild(podcastElement);
        });
    } else {
        topPodcastsContainer.innerHTML = 'Keine Top-Podcasts gefunden.';
    }
}

// Funktion zum Anzeigen der Top-Alben
function displayTopAlbums(data) {
    const topAlbumsContainer = document.getElementById('top-albums-container');
    topAlbumsContainer.innerHTML = ''; // Leere das Container-Feld
    
    if (data.data && data.data.length > 0) {
        data.data.forEach(item => {
            const albumTitle = item.title;
            const albumImage = item.cover_medium;
    
            // Erstelle ein DOM-Element für jedes Album
            const albumElement = document.createElement('div');
            albumElement.classList.add('album');
            albumElement.innerHTML = `
                <img src="${albumImage}" alt="${albumTitle}">
                <p>${albumTitle}</p>
            `;
    
            // Füge das Album-Element dem Container hinzu
            topAlbumsContainer.appendChild(albumElement);
        });
    } else {
        topAlbumsContainer.innerHTML = 'Keine Top-Alben gefunden.';
    }
}

// Funktion zum Anzeigen der Top-Charts
function displayTopCharts(data) {
    const topChartsContainer = document.getElementById('top-charts-container');
    topChartsContainer.innerHTML = ''; // Leere das Container-Feld
    
    if (data.data && data.data.length > 0) {
        data.data.forEach(item => {
            const trackTitle = item.title;
            const artistName = item.artist.name;
            const trackImage = item.album.cover_medium;
    
            // Erstelle ein DOM-Element für jeden Track
            const trackElement = document.createElement('div');
            trackElement.classList.add('track');
            trackElement.innerHTML = `
                <img src="${trackImage}" alt="${trackTitle}">
                <p>${trackTitle}</p>
                <p>${artistName}</p>
            `;
    
            // Füge das Track-Element dem Container hinzu
            topChartsContainer.appendChild(trackElement);
        });
    } else {
        topChartsContainer.innerHTML = 'Keine Top-Charts gefunden.';
    }
}

// Event Listener für den Registrierungs-Button
document.getElementById('register').addEventListener('click', registerUser);

// Event Listener für den Anmelde-Button
document.getElementById('login').addEventListener('click', loginUser);

// Event Listener für die Suche
document.getElementById('search-btn').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value;
    const apiUrl = `/search?q=${encodeURIComponent(searchInput)}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => console.error('Error:', error));
});

// Funktion zum Anzeigen der Suchergebnisse
function displayResults(data) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Leere das Ergebnisfeld
    
    if (data.data && data.data.length > 0) {
        data.data.forEach(item => {
            const artistName = item.artist.name;
            const artistImage = item.artist.picture_medium;
            const trackTitle = item.title;
            const trackPreviewUrl = item.preview;
    
            // Erstelle ein DOM-Element für jeden Künstler
            const artistElement = document.createElement('div');
            artistElement.classList.add('artist');
            artistElement.innerHTML = `
                <img src="${artistImage}" alt="${artistName}">
                <p>${artistName}</p>
                <p>${trackTitle}</p>
                <button class="play-btn" data-preview-url="${trackPreviewUrl}">Play</button>
            `;
    
            // Füge das Künstler-Element dem Ergebniscontainer hinzu
            resultsContainer.appendChild(artistElement);
    
            // Füge einen Event Listener für den Play-Button hinzu
            const playButton = artistElement.querySelector('.play-btn');
            playButton.addEventListener('click', function() {
                playTrack(trackPreviewUrl);
            });
        });
    } else {
        resultsContainer.innerHTML = 'Keine Ergebnisse gefunden.';
    }
}

// Funktion zum Abspielen eines Titels
function playTrack(previewUrl) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = previewUrl;
    audioPlayer.play();
}

// window.onload Funktion für den automatischen Aufruf beim Öffnen der Seite
window.onload = function() {
    // Lade Top-Podcasts beim Öffnen der Seite
    fetch('/top-podcasts')
        .then(response => response.json())
        .then(data => {
            displayTopPodcasts(data);
        })
        .catch(error => console.error('Error fetching top podcasts:', error));
    
    // Lade Top-Alben beim Öffnen der Seite
    fetch('/top-albums')
        .then(response => response.json())
        .then(data => {
            displayTopAlbums(data);
        })
        .catch(error => console.error('Error fetching top albums:', error));
    
    // Lade Top-Charts beim Öffnen der Seite
    fetch('/top-charts')
        .then(response => response.json())
        .then(data => {
            displayTopCharts(data);
        })
        .catch(error => console.error('Error fetching top charts:', error));
};