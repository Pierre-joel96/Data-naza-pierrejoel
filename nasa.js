import {createWriteStream} from 'fs';
import {pipeline} from 'stream';
import {promisify} from 'util'
import fetch from 'node-fetch';

const streamPipeline = promisify(pipeline);

// On va récupérer l'image du jour !

// 1. on utilise node-fetch pour récupérer les infos à l'url
// https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
const data = await response.json();


// 2. enregistrer l'image dans le dossier public/images
const imageURL = data.url;
const responseImage = await fetch(imageURL);

// S'il y a une erreur j'affiche l'erreur
if (!responseImage.ok) throw new Error(`unexpected response ${responseImage.statusText}`);

// J'enregistre le fichier dans répertoire
const today = new Date();
await streamPipeline(responseImage.body, createWriteStream('./public/images/'+today.getDay()+today.getMonth()+today.getFullYear()+'.png'));
