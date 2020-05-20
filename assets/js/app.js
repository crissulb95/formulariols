//VARIABLES

const listaTweets = document.querySelector('#lista-tweets');





//EVENT LISTENERS

eventListeners();

function eventListeners() {
    //para cuando se envíe el formulario
    document.getElementById('formulario').addEventListener('submit', agregarTweet);

    //para borrar tweets

    document.getElementById('lista-tweets').addEventListener('click', borrarTweet);

    //contenido cargado en página

    document.addEventListener('DOMContentLoaded', localStorageListo);
};






//FUNCIONES 

function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.getElementById('tweet').value;

    const borrar = document.createElement('a');
    borrar.classList = 'borrar-tweet';
    borrar.innerText = "X";

    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(borrar);
    listaTweets.appendChild(li);

    agregarTweetAlStorage(tweet);
}

function borrarTweet(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-tweet')) {
        console.log('Borraste tweet'); // se confirma si se selecciona el boton borrar 
        //para luego agregarle funcionalidad
        e.target.parentElement.parentElement.remove();//al hacer click se elimina el elemento padre que
        //al mismo tiempo es contenedor tanto del boton borrar como del tweet.
        console.log(e.target.parentElement.parentElement.innerText);
        borrarTweetLocalStorage(e.target.parentElement.parentElement.innerText);
    } else {
        console.log('click en la lista');
    }
}

//mostrar datos de local storage en la lista

function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(tweet => {
        
        const borrar = document.createElement('a'),
            borrarIcon = document.createElement('i');

        borrarIcon.classList = "fas fa-times-circle borrar-tweet";
        borrar.appendChild(borrarIcon);

        const li = document.createElement('li');
        li.innerText = tweet;
        li.appendChild(borrar);
        listaTweets.appendChild(li);
    });
}



function agregarTweetAlStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //añade el nuevo tweet
    tweets.push(tweet);
    //convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
    
}

//comprobar que haya elementos en local storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    //revisamos los valores del local storage
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}


//eliminar tweet de local storage
function borrarTweetLocalStorage(tweet) {
    let tweetsMutados = obtenerTweetsLocalStorage().map( tweetM => tieneNewLine(tweetM));
    let tweets = obtenerTweetsLocalStorage();
    for ( let i = 0; i < tweetsMutados.length; i++) {
        if(tweetsMutados[i] === tweet) {
            tweets.splice((i), 1);
            break;
        }
    }
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


function tieneNewLine(tweet) {
    let regExN = /\n/gi, newTweet;
    if(regExN.test(tweet)) {
        newTweet = tweet.replace(regExN,'');
        return newTweet;
    } else {
        return tweet;
    }
}


/*function borrarTweetLocalStorage(tweet) {
    console.log(tweet);
    let tweets, tweetBorrar;
    tweets = obtenerTweetsLocalStorage();
    tweetsMutados.forEach( function(tweet,index) {
        if(tweetBorrar === tweet) {
            tweets.splice(index, 1); 
        } 
    });   
    console.log(JSON.parse(localStorage.getItem('tweets'))[8]);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}*/

/* function2 borrarTweetLocalStorage(tweet) {
    //elimina la x del tweet
    let tweetsMutados = obtenerTweetsLocalStorage().map( tweetM => tieneNewLine(tweetM));
    console.log(tweetsMutados);
    let tweets = obtenerTweetsLocalStorage();
    console.log(tweetsMutados,tweets);
    tweetsMutados.forEach( (tweetMutado,index) => tweetMutado === tweet ?  tweets.splice(index, 1) : console.log('?'));   
    localStorage.setItem('tweets', JSON.stringify(tweets));
    console.log(JSON.parse(localStorage.getItem('tweets')));
}
 */