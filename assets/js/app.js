const ListaTweets = document.querySelector("#lista-tweets");

EventListeners();

function EventListeners() {
  //cargamos los tweets el el LocalStorage con un EventListener
  document.addEventListener("DOMContentLoaded", () => {
    let tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function (tweet) {
      const borrar = document.createElement("a");
      borrar.classList.add("borrar-tweet");
      borrar.innerText = "X";
      const li = document.createElement("li");
      li.innerText = tweet;
      li.appendChild(borrar);
      ListaTweets.append(li);
    });
  });

  //eventlistener para agregar tweets
  document.querySelector("#formulario").addEventListener("submit", (e) => {
    e.preventDefault();
    const tweet = document.querySelector("textarea").value;
    const borrar = document.createElement("a");
    borrar.classList.add("borrar-tweet");
    borrar.innerText = "X";
    const li = document.createElement("li");
    li.innerText = tweet;
    li.appendChild(borrar);
    ListaTweets.append(li);
    AgregarLocalStorage(tweet);
  });
  //eventListener de eliminar tweet
  ListaTweets.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(e.target.classList.value)
    if (e.target.classList.value === "borrar-tweet") {
      e.target.parentElement.remove();
      borrarLocalStorage(e.target.parentElement.innerText)
    }
  });
}

//guardar en el local Storage
function AgregarLocalStorage(tweet) {
  let tweets = obtenerTweetsLocalStorage();
  //push es agregar al final de un arreglo
  tweets.push(tweet);
  //convertimos el string en arreglo
  localStorage.setItem("tweets", JSON.stringify(tweets));
  //JSON.stringify convierte de array a strin
}
//comporbar de que exitan elementos el en LocalStorage
function obtenerTweetsLocalStorage() {
  let tweets;
  //revidamos el valor del localStorage

  if (localStorage.getItem("tweets") === null) {
    //em caso del que el LocalStorage este vacio creame un Array con la variable tweets
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }

  return tweets;
}


function borrarLocalStorage(tweet){
    let tweets, tweetsBorrar;

    tweetsBorrar = tweet.substring(0,tweet.length - 1 );//eliminamos el X del tweets
    tweets = obtenerTweetsLocalStorage()
    tweets.forEach(function(tweet, index){
        // console.log(tweet)

        if (tweetsBorrar === tweet) {
          tweets.splice(index, 1);
        }
    })

localStorage.setItem('tweets',JSON.stringify(tweets) )

}