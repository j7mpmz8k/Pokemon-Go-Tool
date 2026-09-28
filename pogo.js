class Pokemon {
    constructor(name, types = [], er, dps) {
        this.name = name;
        this.er = er;
        this.dps = dps;
        this.types = types;
        this.hidden = false;
        this.html = elementFromHTML(`
            <div class="pokemon-card">
                <div class=type-wrapper>
                    ${this._getTypesHtmlString()}
                </div>
                <div class="name">
                    ${name}
                </div>
                <div class="stat-wrapper">
                    <span class="stat-card">er: <span class="stat">${er}</span></span>
                    <span class="stat-card">dps: <span class="stat">${dps}</span></span>
                </div>
            </div>
        `);
    }
    
    _getTypesHtmlString = () => {
        return this.types.map(type => `<div class="type ${type}">${type}</div>`).join('');
    }
}

const pokemonAll = document.getElementById("pokemon");
const erButton = document.getElementById("er-button");
const dpsButton = document.getElementById("dps-button"); 
const typesButton = document.getElementById("types-button");
const typesDropdownForm = document.getElementById("types-dropdown-form");

const pokemonTypes = [
    "normal", "fire", "water", "grass", "electric", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "steel", "dark", "fairy"
]

let dpsDesc = true;
let erDesc = true;

let pokemonList = [
    new Pokemon("Pikachu", ["electric"], 34, 68),
    new Pokemon("Charizard", ["fire", "flying"], 22, 999),
    new Pokemon("Mew", ["psychic"], 22, 1111),
    new Pokemon("Blastoise", ["water"], 55, 99)
]

function main() {
    renderPokemon();
    typesDropdownForm.innerHTML = pokemonTypes.map(type => `<label><input type="checkbox" value="${type}" />${type}</label>`).join("");
    typesButton.addEventListener("click", () => typesDropdownForm.classList.toggle("open"));
    typesDropdownForm.addEventListener("change", (e) => {
        let checkedTypes = [];
        for (i of e.target.form) {
            if (i.checked) {
                checkedTypes.push(i.value);
            }
        }
        if (checkedTypes.length == 0) {
            pokemonList.forEach(pokemon => pokemon.hidden = false);
        } else {
            pokemonList.forEach(pokemon => {pokemon.hidden = !pokemon.types.some(type => checkedTypes.includes(type))});
        }

        renderPokemon();
    });

    erButton.addEventListener("click", () => {
        if (erDesc) {
            pokemonList.sort((a, b) => b.er - a.er);
        } else {
            pokemonList.sort((a, b) => a.er - b.er);
        }
        erDesc = !erDesc;
        renderPokemon();
    });

    dpsButton.addEventListener("click", () => {
        if (dpsDesc) {
            pokemonList.sort((a, b) => b.dps - a.dps);
        } else {
            pokemonList.sort((a, b) => a.dps - b.dps);
        }
        dpsDesc = !dpsDesc;
        renderPokemon();
    });
}

function elementFromHTML(htmlString) {
    const tempWrapper = document.createElement("div");
    tempWrapper.innerHTML = htmlString;
    return tempWrapper.firstElementChild;
}

function renderPokemon() {
    document.querySelectorAll(".pokemon-card").forEach(card => card.remove());
    pokemonList.filter(pokemon => !pokemon.hidden)
        .forEach(pokemon => pokemonAll.appendChild(pokemon.html));
}

main();
