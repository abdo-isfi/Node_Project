#!/usr/bin/env node
// server.js
// 💬 had fichier kaydir serveur HTTP bash tchouf les logs f navigateur

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const LOG_FILE = path.join(__dirname, 'log.txt');

// 🏠 route racine "/"
function serveRoot(res) {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('👋 Marhba bik f Node System Logger\n\nRoutes:\n - /logs -> tchouf contenu dyal log.txt\n - /stats -> tchouf stats f JSON\n');
}

// 📜 route "/logs" kataffichi contenu dyal fichier log.txt
function serveLogs(res) {
  fs.readFile(LOG_FILE, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('⛔ Ma kaynach log.txt! khdem monitor.js luwel.\n');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erreur: ' + err.message);
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(data);
  });
}

// 📊 route "/stats" katjib akher ligne mn log.txt
function serveStats(res) {
  fs.readFile(LOG_FILE, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Ma kaynach log.txt' }, null, 2));
      return;
    }

    const lines = data.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Ma kaynach data f fichier' }, null, 2));
      return;
    }

    const last = lines[lines.length - 1];
    const jsonStart = last.indexOf('{');
    if (jsonStart !== -1) {
      try {
        const jsonPart = last.slice(jsonStart);
        const obj = JSON.parse(jsonPart);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ lastLogLine: last, stats: obj }, null, 2));
        return;
      } catch (parseErr) {}
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ lastLogLine: last }, null, 2));
  });
}

// 🌍 création dyal serveur
const server = http.createServer((req, res) => {
  const url = req.url || '/';
  if (url === '/' || url === '/index') {
    serveRoot(res);
  } else if (url === '/logs') {
    serveLogs(res);
  } else if (url === '/stats') {
    serveStats(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('❌ 404 - Ma kaynach had route\n');
  }
});

// 🚀 démarrage dyal serveur
server.listen(PORT, () => {
  console.log(`🟢 Serveur khdam f: http://localhost:${PORT}`);
});
