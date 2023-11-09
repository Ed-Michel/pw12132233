// variables globales se declaran con var para que cambie el valor
var numero = 0;
var nombre = "";
var datos = [];

async function apimarvel(){
    // es otra variable (local)
    let numero = 0;
    nombre = document.getElementById("nombre").value;
    const respuesta = await fetch("https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith="+nombre);
    datos = await respuesta.json();
    muestra();
}

function anterior(){
    // validar el -1
    numero--;
    if (numero < 0){
        numero = datos.data.results.length-1;
    }
    muestra();
}
function siguiente(){
    // validar que no se pase
    numero++;
    if (numero == datos.data.results.length){
        numero = 0;
    }
    muestra();
}

function muestra(){
    console.log("Arreglo posicion: "+numero);
    let foto = document.getElementById("foto");
    let heroe = document.getElementById("heroe");
    let descripcion = document.getElementById("descripcion");
    let comics = document.getElementById("comics");

    foto.setAttribute("src", datos.data.results[numero].thumbnail.path+"."+datos.data.results[numero].thumbnail.extension);
    heroe.innerHTML = datos.data.results[numero].name;
    descripcion.innerHTML = datos.data.results[numero].description;
    comics.innerHTML = datos.data.results[numero].comics.available;
}