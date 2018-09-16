const hbs = require('hbs'); //para ocupar partials
//helpers


//vamos a usar los helpers, no es mas que una funcion que se dispara cuando el template lo requiera
//en este caso, lo vamos a ocupar para no repetir esta linea anio: new Date().getFullYear() cuando se renderean las  vistas home y about
hbs.registerHelper('getAnio', () => {
    //si al renderear una página, mediante el get (app.get('/about', (req, res) => {), no existen valores para la vistas que incluyen variables
    //las busca en estos helpers
    return new Date().getFullYear();
})

//otro helper para capitalizar una cadena de texto o enclusive con variables
hbs.registerHelper('capitalizar', (texto) => {
    let palabras = texto.split(' '); //un arreglo de todas las palabras

    palabras.forEach((palabra, idx) => { //barremos cada una de las palabras
        palabras[idx] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
            //charAt(0) es la posicion de la primera letra 
            //ya despues le vamos a concatenar todo lo demas que venga de la palabra  (todas las demas letras) y de paso pasarlas a minusculas
    });
    return palabras.join(' '); //otra vez unimos todas las palabras con un espacio, sacandolas del arreglo
})