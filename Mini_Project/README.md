# Node System Logger - Mini Project

## Objectif
Un petit projet Node.js pour :
- surveiller l'activité système (mémoire, CPU, uptime),
- enregistrer périodiquement les données dans `log.txt`,
- utiliser le système d'événements Node (`EventEmitter`) pour signaler des conditions (mémoire faible),
- servir les logs via un serveur HTTP local.

## Contenu du dépôt
- `logger.js` → classe `Logger` (hérite de `EventEmitter`) qui écrit dans `log.txt`.
- `monitor.js` → collecte les metrics toutes les 5 secondes et les enregistre.
- `server.js` → serveur HTTP qui sert `/`, `/logs` et `/stats`.
- `log.txt` → généré automatiquement par `monitor.js`.
- `README.md` → ce fichier.

## Fonctionnement & utilisation
1. Ouvre un terminal dans le dossier du projet.
2. Lance le moniteur :
   ```bash
   node monitor.js
