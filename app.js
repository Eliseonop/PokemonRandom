getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

document.addEventListener("DOMContentLoaded", () => {
  const ramdom = getRandomInt(1, 152);
  fetchData(ramdom);
});
const button = document.getElementById("button");

const fetchData = async (id) => {
  try {
    console.log(id);

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    console.log(data);

    const pokemon = {
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      imgJuego: data.sprites.front_default,
      imgCvg: data.sprites.other.dream_world.front_default,
      nombre: data.name,
      experiencia: data.base_experience,
      hp: data.stats[0].base_stat,
      ataque: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      especial: data.stats[3].base_stat,
    };

    pintarCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};
// button.addEventListener("click", async () => {
//   const ramdom = getRandomInt(1, 152);
//   fetchData(ramdom);
// });

const pintarCard = (pokemon) => {
  const flex = document.getElementById("contenedor-principal");
  const template = document.getElementById("card").content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  clone.querySelector(".card-img-top").setAttribute("src", pokemon.imgCvg);
  // clone.querySelector('.card-body-img').setAttribute('src', pokemon.imgJuego)
  clone.querySelector(
    ".card-body-title"
  ).innerHTML = `${pokemon.nombre} <span class="text-secondary" >${pokemon.hp}hp</span>`;
  clone.querySelector(".card-body-text").textContent =
    pokemon.experiencia + " exp";
  clone.querySelectorAll(".elh3")[0].textContent = pokemon.ataque + "k";
  clone.querySelectorAll(".card-footer-social h3")[1].textContent =
    pokemon.especial + "k";
  clone.querySelectorAll(".card-footer-social h3")[2].textContent =
    pokemon.defensa + "k";

  fragment.appendChild(clone);
  flex.appendChild(fragment);
};
