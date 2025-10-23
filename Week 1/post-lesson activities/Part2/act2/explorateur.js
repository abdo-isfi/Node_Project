const fs = require('fs');
const path = require('path');


// 9raya dyal les fichiers li kaynin f had dossier
fs.readdir(__dirname, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // bounssif 3la les fichiers li tl3o 
    files.forEach(f => {
        console.log(path.join(__dirname, f));
    });

    // ktab wa7ed log file fih 3dad les fichiers li tl3o
    const logMessage = `${new Date().toLocaleString()} - ${files.length} fichiers trouvés\n`;
    fs.appendFile('log.txt', logMessage, (err) => {
        if (err) console.error('Error writing log:', err);
        else console.log('Log mis à jour avec succès !');
    });
});
