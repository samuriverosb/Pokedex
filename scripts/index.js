const MAIN_URL = "https://pokeapi.co/api/v2/pokemon/";
const container = document.querySelector("#pokemons");
const details = document.querySelector("#details");

const fetchData = (id) => {
  fetch(`${MAIN_URL}${id}/`)
    .then(res => res.json())
    .then(data => createCard(data));
}

const catchPokemon = (number) => {
  for (let i = 1; i <= number; i++) {
    fetchData(i);
  }
}

const catchDetailedPokemon = (id) => {
  fetch(`${MAIN_URL}${id}/`)
    .then(res => res.json())
    .then(data => createDetails(data));
}

const createCard = (pokemon) => {
  const card = document.createElement("div")
  card.classList.add("card");
  card.classList.add("pokemon");
  card.setAttribute("id", pokemon.id);

  const img = document.createElement("img");
  img.src = pokemon.sprites.other["official-artwork"]["front_default"];
  img.classList.add("card-img-top");
  img.setAttribute("alt", pokemon.name);

  const text = document.createElement("div");
  text.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = `#${pokemon.id} ${pokemon.name}`;

  const content = document.createElement("p")
  content.classList.add("card-text");
  let types = '';
  pokemon.types.map(type => {
    types = types + type.type.name + ' ';
  })
  content.textContent = `Types: ${types}`;

  const ul = document.createElement("ul");
  ul.classList.add("list-group");
  ul.classList.add("list-group-flush");

  const height = document.createElement("li");
  height.classList.add("list-group-item");
  height.textContent = `Height: ${pokemon.height}`;

  const weight = document.createElement("li");
  weight.classList.add("list-group-item");
  weight.textContent = `Weight: ${pokemon.weight}`;

  ul.appendChild(height);
  ul.appendChild(weight);

  text.appendChild(title);
  text.appendChild(content);

  card.appendChild(img);
  card.appendChild(text);
  card.appendChild(ul);

  container.appendChild(card);
}

const createDetails = (pokemon) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("flex-row");
  card.classList.add("text-align-left");

  const img = document.createElement("img");
  img.src = pokemon.sprites.other["official-artwork"]["front_default"];
  img.classList.add("card-img-left")

  const body = document.createElement("div");
  body.classList.add("card-body");

  const h1 = document.createElement("h1");
  h1.classList.add("card-title");
  h1.textContent = `#${pokemon.id} ${pokemon.name}`

  const p = document.createElement("p");
  p.classList.add("card-text");
  let types = '';
  pokemon.types.map(type => {
    types = types + type.type.name + ' ';
  })
  p.textContent = `Types: ${types}`;

  const ul = document.createElement("ul");
  ul.classList.add("list-group");
  ul.classList.add("list-group-flush");

  const height = document.createElement("li");
  height.classList.add("list-group-item");
  height.textContent = `Height: ${pokemon.height}`;

  const weight = document.createElement("li");
  weight.classList.add("list-group-item");
  weight.textContent = `Weight: ${pokemon.weight}`;

  const abilities = document.createElement("li");
  abilities.classList.add("list-group-item");
  let listAbilities = '';
  pokemon.abilities.map(item => {
    listAbilities = listAbilities + item.ability.name + ' ';
  })
  abilities.textContent = `Abilities: ${listAbilities}`;

  const experience = document.createElement("li");
  experience.classList.add("list-group-item");
  experience.textContent = `Base EXP: ${pokemon["base_experience"]}`;

  const hp = document.createElement("li");
  hp.classList.add("list-group-item");
  hp.textContent = `HP: ${pokemon.stats[0]["base_stat"]}`

  const atk = document.createElement("li");
  atk.classList.add("list-group-item");
  atk.textContent = `ATK: ${pokemon.stats[1]["base_stat"]}`

  const def = document.createElement("li");
  def.classList.add("list-group-item");
  def.textContent = `DEF: ${pokemon.stats[2]["base_stat"]}`

  ul.appendChild(height);
  ul.appendChild(weight);
  ul.appendChild(abilities);
  ul.appendChild(experience);
  ul.appendChild(hp);
  ul.appendChild(atk);
  ul.appendChild(def);

  body.appendChild(h1);
  body.appendChild(p);
  body.appendChild(ul);

  card.appendChild(img);
  card.appendChild(body);

  details.appendChild(card);
}

catchPokemon(151);

const reset = () => {
  container.replaceChildren();
  details.replaceChildren();
}

const form = document.querySelector("#form")
form.addEventListener("submit", (e) => {
  reset();
  e.preventDefault();
  const id = document.querySelector("#id").value;
  if (id == 0) {
    catchPokemon(151);
  }
  else {
    catchDetailedPokemon(id);
  }
})