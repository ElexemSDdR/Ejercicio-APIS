/*
API REST - Interfaz que se utiliza para intercambiar información de manera segura y por internet entre 2 o más apps
*/
const $quantity_of_quotes = document.getElementById('quantity_of_quotes')
const $give_quotes = document.getElementById('give_quotes')
const $quote = document.createElement('div')
$quote.classList.add('quotes')
const $container_quote = document.querySelector('.quotes_container')
const $restart = document.getElementById('restart')

async function obtain_quotes (quantity) {
    try{
        const quotes = await fetch(`http://thesimpsonsquoteapi.glitch.me/quotes?count=${quantity}`)

        if (!quotes.ok){
            throw new Error("No se puedo obtener la cita")
            
        } else { 
            if (window.innerWidth >= 900){
                quantity <= 2 ?
                [$quote.style.columns = quantity, $quote.style.width = `${quantity === 1 ?
                    '50%' :
                    quantity === 2 ? 
                    '75%' :
                    '100%'}`] :
                [$quote.style.columns = 3,$quote.style.width = '100%']
            }
            const rta = await quotes.json()
            $quote.innerHTML = ''
            return rta.forEach( simpson_quote => { 
                $quote.innerHTML += `
                <div>
                    <h2>${simpson_quote.character}</h2>
                    <img src="${simpson_quote.image}" alt="Simpson character">
                    <p>${simpson_quote.quote}</p>                    
                </div>
                `
                $container_quote.appendChild($quote)
            })              
            
        }
    } catch (error) {
        console.log(error)
        // $quote.innerHTML = `
        // <h3>${error}</h3>
        // `
        // $container_quote.appendChild($quote)
    }
}

$give_quotes.addEventListener('click', () => {
    obtain_quotes(parseInt($quantity_of_quotes.value))
    $quantity_of_quotes.value = ''
    $quantity_of_quotes.focus()
})
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        obtain_quotes(parseInt($quantity_of_quotes.value))
        $quantity_of_quotes.value = ''
        $quantity_of_quotes.focus()
    }
})
$restart.addEventListener('click', () => {
    $container_quote.innerHTML = ''
})