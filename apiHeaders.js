const base64 = require('base-64');

const username = 'lucifer';
const applicationPassword = 'BB9W QOYA VHZJ 21uW bKEM Mu02';

const headers = new Headers();

headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + applicationPassword));

export default headers;