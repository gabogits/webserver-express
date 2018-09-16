const express = require('express');
const app = express(); //app es producto de la funcionalidad de express

const hbs = require('hbs'); //para ocupar partials

//Duda por que si el  const hbs = require('hbs'); ya lo estamos cargando aqui en require('./hbs/helpers');, por que nuevamente lo tengo que cargar  en server.js 
require('./hbs/helpers');

//tenemos que hacer una configuracion en el puerto que nos va dar heroku, ya que desconocemos el puerto que heroku nos va dar
//heroku nos da dar acceso a unas variables de entorno global

const port = process.env.PORT || 3000; //recordar es que process es un objeto global
// corriendo en local esto  process.env.PORT no existe, salvo en heroku, por lo que tomará el 3000, como numero de puerto.

hbs.registerPartials(__dirname + '/views/partials'); //en donde estes concatenale esta rura en donde estarán los parciales

app.use(express.static(__dirname + "/public")); //aqui configguramos el contenido publico, esto es lo que se va a ver en el navegador
//Si ocuparamos react, vue o angular, podriamos colocarlos en la carpeta public y con ellos trabajia la app
app.set('view engine', 'hbs');

// al especificar esto, se va ejecutar esta linea y si encuentra un archivo index.html lo va desplegar

// si creamos mas paginas como home.html es necesario especificar el nombre y el  extension, para que se reconozca home.html y no este buscando un servicio home o una camrpeta home


//Un middleware es una instruccion o un callback que se va ejecutar  siempre no importando que url se pida

//ojo que con este middleware se va desplegar /public/index en lugar de la peticion get de abajo que apuntaba a raiz
//app.get('/', (req, res) => {
//es importante considerar si tenemos servicios apuntando a esta url

/*
//con el createServer escuchabamos todas las peticiones no importa de que url fuera
app.get('/', (req, res) => {
    //una solicitud get cuando estemos en raiz, con express podemos crear middleware para  filtrar todo tipo de peticion
    // res.send('Hello World')
    let salida = {
        nombre: 'Gabriel',
        edad: 32,
        url: req.url
    }
    res.send(salida); //internamente la funcion send va detectar que es un objeto y lo va serializar en formato json, sin necesidad de ocupar el JSON.string...
})
*/


/*ya con handlebars*/
app.get('/', (req, res) => {
    res.render('home', {
        nombre: "gabriel", //esta variable solo aparece en el home

    }); //internamente la funcion send va detectar que es un objeto y lo va serializar en formato json, sin necesidad de ocupar el JSON.string...
})

app.get('/about', (req, res) => {
    res.render('about', {
        nombrePagina: "about", //esta variable solo aparece en el about

        //vamos a usar los helpers, no es mas que una funcion que se dispara cuando el template lo requiera
        //en este caso, lo vamos a ocupar para no repetir esta linea anio: new Date().getFullYear() cuando se renderean las  vistas home y about

    });
})

app.get('/data', (req, res) => {
    res.send('Hola data');
})


/* Ya vamos a subir esta aplicacion a heroku, ya no vamos a ocupar solo el puerto 3000
    app.listen(3000, () => {
        console.log("Escuchando peticiones en el puerto 3000")
    })
*/


app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`)
})


//ademas tenemos que especificar a heroku el comando que se tiene que ejecutar para arrancar la app
// esto lo hacemos en el package.json ajustando el arreglo de scripts

//aqui se debe especificar en estar el comando  "start": "node server.js",

//apartir de este momento podemos en la consola ejecutar npm start para arrancar la aplicación
/*
"scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
*/

/*también podemos arrancar la app con nodemos haciendo el ajuste en este objeto de la sig manera   "nodemon": "nodemon server.js",
/* apartir de este momento podemos en la consola ejecutar npm start para arrancar la aplicación en modo nodemon 
"scripts": {
   
    "nodemon": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
*/
//aqui estan los pasos para subir la app a heroku https://dashboard.heroku.com/apps/gabriel-webpage/deploy/heroku-git


//handlebars es una libreria que permite la renderizacion dinamica de los sitios web©