#!/usr/bin/env node
// monitor.js
// 💬 had script houwa lmoniteur: kayjma3 linfo system w kayktebha f log.txt kol 5 seconds

const os = require('os');
const Logger = require('./logger');

const logger = new Logger();
const INTERVAL_MS = 5000; // ⏱️ 5 secondes
let lastStats = null;

// ⚙️ had fonction katdir format dyal bytes (bash twli readable)
function formatBytes(bytes) {
  const kb = 1024;
  if (bytes < kb) return `${bytes} B`;

  const units = ['KB', 'MB', 'GB', 'TB'];
  let i = -1;
  // kat9ssm bytes 3la 1024 (kb) bach twli f format dyal KB, MB, GB...
  do {
    bytes = bytes / kb;
    i++;
  } while (bytes >= kb && i < units.length - 1);
  return `${bytes.toFixed(2)} ${units[i]}`;
}

// 💾 had fonction hiya li katjma3 les infos système
function collectAndLog() {
  const free = os.freemem();
  const total = os.totalmem();
  const uptimeSec = os.uptime();
  const freePct = (free / total) * 100;

  const stats = {
    timestamp: new Date().toISOString(),
    freeBytes: free,
    totalBytes: total,
    freePct: Number(freePct.toFixed(2)),
    uptimeSec: Math.floor(uptimeSec),
  };

  lastStats = stats;

  // ✍️ katkteb stats f log.txt
  logger.log(stats);

  // ⚠️ ila mémoire libre < 20%, kaydir event "lowMemory"
  if (stats.freePct < 20) {
    logger.emit('lowMemory', stats);
  }
}

// 🧏‍♂️ had listener kayt3raf mnin katkteb ligne jdida
logger.on('messageLogged', (info) => {
  console.log(`✅ Tktebat ligne jdida f ${info.timestamp}`);
});

// ⚠️ event dyal lowMemory
logger.on('lowMemory', (stats) => {
  console.warn(`⚠️  RAM 9lila bzaf! b9at ${stats.freePct}% (${formatBytes(stats.freeBytes)} libres)`);
  logger.log({ alert: 'lowMemory', freePct: stats.freePct, free: stats.freeBytes });
});

// ⛔ event dyal error
logger.on('error', (err) => {
  console.error('Logger error:', err);
});

// 🚀 lancement
console.log('🟢 Monitor khdam, kaycollecta kol 5 seconds...');
collectAndLog();
setInterval(collectAndLog, INTERVAL_MS);
