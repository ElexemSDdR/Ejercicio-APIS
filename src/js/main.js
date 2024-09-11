/*
API REST - Interfaz que se utiliza para intercambiar información de manera segura y por internet entre 2 o más apps
*/
const $character_simpson = document.getElementById('character_simpson');
const $quote = document.getElementById('quote');
const $simpson_character_photo = document.getElementById('simpson_character_photo');

async function obtain_quotes () {
    try{
        const quotes = await fetch('http://thesimpsonsquoteapi.glitch.me/quotes');

        if (!quotes.ok){
            throw new Error("No se puedo obtener la cita");
            
        } else {
            const rta = await quotes.json();
            $quote.innerHTML = `${rta[0].quote}`;
            $character_simpson.innerHTML = `${rta[0].character}`;
            $simpson_character_photo.src = `${rta[0].image}`;
            console.log(rta);
        }
    } catch (error) {
        console.log(error);
    }
};

//fetch es una función asincrónica q obtiene datos desde un archivo json.
//el await es un elemento que espera a q pase algo, y se pone dentro de una función asincrónica
//Las funciones asincronicas esperan a que pase algo dentro de ellas para luego devolver un resultado
// los comandos try intentan obteer algo, y en caso de que no se PublicKeyCredential, da un error

obtain_quotes()