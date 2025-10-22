// Hadi script bash n3rfou bih ma3loumat 3la system dyalna f Node.js
const os = require('os');

// N3rfo chi ma3loumat 3la system
console.log("Plateforme :", os.platform());
// N3rfo architecture dyal CPU
console.log("Architecture :", os.arch());
// N3rfo 3adad dyal cores dyal CPU
console.log("CPU :", os.cpus().length, "cœurs");
// N3rfo ma3loumat 3la mémoire
console.log("Mémoire totale :", os.totalmem());
// N3rfo mémoire libre
console.log("Mémoire libre  :", os.freemem());
// N3rfo uptime dyal system
console.log("Uptime (en heures):", (os.uptime() / 3600).toFixed(2));
