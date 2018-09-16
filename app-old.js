//el http es un paquete nos permite crear un webserver  y con ello un servidor listo para desplgear contenido en la web

const http = require('http');


http.createServer((req, res) => { //para poder crear peticiones http, primero tenemos que crear un servidor
        //a diferencia de lo que veniamos haciendo antes, de trabajar todo en la terminal, ahora nosotros podemos
        //despligar contenido en la web, en nuestro navegador   
        // res.write('Hola Mundo');

        //con esto  res.write('Hola Mundo'); estamos creando una pagina web, pero tambien podiamos regresar un json, para tener asi un servicio
        res.writeHead(200, { 'Content-Type': 'application/json' }); //status 200, es que se hace correctamente

        let salida = {
            nombre: 'Gabriel',
            edad: 32,
            url: req.url
        }

        res.write(JSON.stringify(salida));
        res.end(); //con esto terminamos de crear la respuesta
    })
    .listen(8080); //cuando creamos un servidor tenemos que especificar que puerto esta escuchando

console.log("Escuchando el puerto 8080");

//investigar acerca de peticiones http y webserver