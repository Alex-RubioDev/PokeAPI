let pokeguess = document.querySelector(".pokeguess");
let score = 0;
let scoreElement = document.getElementById("score"); // Obtener el elemento de la puntuación

function getRandomPokemon() {
  const randomPokemonNumber = Math.floor(Math.random() * 151) + 1;

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonNumber}/`)
    .then((response) => response.json())
    .then((poke) => {
      let image = poke.sprites.front_default;
      let name = poke.name;

      let img = document.createElement("img");
      img.src = image;
      img.classList.add("sprite");

      pokeguess.innerHTML = '';
      pokeguess.appendChild(img);

      // Crear un cuadro de texto para que el usuario escriba el nombre del Pokémon
      let input = document.createElement("input");
      input.placeholder = "Escribe el nombre del Pokémon";
      pokeguess.appendChild(input);
      input.classList.add("input");

      // Agregar un evento para verificar la respuesta del usuario
      input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          let userGuess = input.value.toLowerCase();

          // Comparar la respuesta del usuario con el nombre del Pokémon
          if (userGuess === name) {
            score++;
            scoreElement.textContent = score;
            alert(`¡Correcto! Tu puntuación es ${score}`);
            getRandomPokemon(); // Obtener otro Pokémon para adivinar
          } else {
            alert("Respuesta incorrecta. Inténtalo de nuevo.");
          }

          // Limpiar el cuadro de texto después de cada intento
          input.value = "";
        }
      });
    })
    .catch((error) => {
      console.error("Error en la solicitud fetch:", error);
    });
}

// Iniciar el juego obteniendo el primer Pokémon
getRandomPokemon();
