// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Dies ist nur ein stark vereinfachtes Beispiel!
// In der Realität würdest du eine sichere Datenbank verwenden.
const users = [
    { username: 'AvastMods', password: 'AvastOnTop', pin: '0873', role: 'owner' },
    { username: 'Nutzer1', password: 'passwort1', pin: '1234', role: 'user' },
    { username: 'Nutzer2', password: 'passwort2', pin: '5678', role: 'user' }
];

app.post('/api/login', (req, res) => {
    const { username, password, pin } = req.body;
    
    // Finde den Benutzer in der "Datenbank"
    const user = users.find(u => u.username === username);

    if (user && user.password === password && user.pin === pin) {
        if (user.role === 'owner') {
            res.status(200).json({ success: true, message: 'Owner-Login erfolgreich!', role: 'owner' });
        } else {
            res.status(200).json({ success: true, message: 'Login erfolgreich!', role: 'user' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Login fehlgeschlagen. Überprüfe die Daten.' });
    }
});

// Starte den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});