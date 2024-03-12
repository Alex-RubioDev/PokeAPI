let container = document.querySelector('.container');

async function fetchData() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
        const poke = await response.json();
        const pokemonList = poke.results;

        for (const pokemon of pokemonList) {
            const response = await fetch(pokemon.url);
            const pokeData = await response.json();

            let name = pokeData.name;
            let image = pokeData.sprites.front_default;
            let stats = pokeData.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }));

            let card = document.createElement('div');
            card.classList.add('card');

            let img = document.createElement('img');
            img.src = image;
            card.appendChild(img);

            let nameElement = document.createElement('p');
            nameElement.innerText = name;
            card.appendChild(nameElement);

            stats.forEach(stat => {
                const statElement = document.createElement('p');
                statElement.innerText = `${stat.name}: ${stat.value}`;
                card.appendChild(statElement);
            });

            card.addEventListener('mouseover', () => {
                card.classList.add('scale-up-center');
            });

            card.addEventListener('mouseout', () => {
                card.classList.remove('scale-up-center');
            });

            container.appendChild(card);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
