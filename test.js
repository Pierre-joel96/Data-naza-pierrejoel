import {createWriteStream} from 'fs';
import {pipeline} from 'stream';
import {promisify} from 'util'
import fetch from 'node-fetch';

const response = await fetch('https://google.com');
const data = await response.text();

const regex = /<a[^>]*>[^<]*<\/a>/g;
const found = data.match(regex);

console.table(found);

//console.log(data);