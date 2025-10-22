//comment on darija arabic

//hadcode kayst3ml EventEmitter mn module 'events' bash ymonitori les evenements dial connexion dial utilisateur
//
const EventEmitter = require('events');
//khalina ncreatew wa7ed instance mn EventEmitter
const emitter = new EventEmitter();

//n3rfou wa7ed evenement smitou "utilisateurConnecte" w n3tiwh wa7ed callback function li katprinti message f console mlli kayt9ddam wa7ed utilisateur
emitter.on("utilisateurConnecte", (data) => {
    console.log(`Nouvelle connexion : ${data.nom} (${data.id })`);
});
//daba n9dro ntriggero had evenement b wa7ed data dyal utilisateur
emitter.emit("utilisateurConnecte", { nom: "Ahmed", id: 1 });