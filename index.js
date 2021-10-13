import express from "express";
import pug from 'pug';
import http from 'http';
const app = express();
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);



import router from "./app/router.js";


app.set('views', './app/view')
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(router);


/*********** SOCKET IO ***********/

// stockage des utilisateurs connectés
const users = [];

const firstNames=["Gilbert","Chuck","Patrick","Martine"];

// J'ajoute une logique à la connexion d'un utilisateur
io.on('connection', (socket) => {
    console.log('a user connected');
    const user = {socket};
    user.name = firstNames[users.length % firstNames.length];
    users.push(user);

    socket.on('chat message', (msg) => {

        // je sauvegarde le message en BDD (user_id, msg)
        console.log(user.name + " : " + msg);
        io.emit('chat message', user.name + " : " + msg);
    });

    // J'ajoute une logique à la déconnexion d'un utilisateur
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

/*********** CRON ***********/
import {CronJob} from 'cron';
var job = new CronJob('00 16 14 13 10 *', function() {
  //console.log('You will see this message every second');
  console.log("Merci Patrick");
}, null, true, 'America/Los_Angeles');
job.start(); 


/*********** SERVER ***********/
server.listen(4000, () =>
  console.log('Example app listening on port 4000!'),
);
