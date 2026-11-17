import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

class Pokemon {
    name: string;
    er: number;
    dps: number;
    types: string[];
    hidden: boolean;
    html: HTMLElement;

    constructor(name: string, types: string[] = [], er: number, dps: number) {
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

    _getTypesHtmlString = (): string => {
        return this.types.map(type => `<div class="type ${type}">${type}</div>`).join('');
    };
}

const pokemonAll = document.getElementById("pokemon");
const erButton = document.getElementById("er-button");
const dpsButton = document.getElementById("dps-button");
const typesButton = document.getElementById("types-button");
const typesDropdownForm = document.getElementById("types-dropdown-form") as HTMLFormElement | null;

const pokemonTypes: string[] = [
    "normal", "fire", "water", "grass", "electric", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "steel", "dark", "fairy"
];

let dpsDesc = true;
let erDesc = true;

const pokemonList: Pokemon[] = [
    new Pokemon("Pikachu", ["electric"], 34, 68),
    new Pokemon("Charizard", ["fire", "flying"], 22, 999),
    new Pokemon("Mew", ["psychic"], 22, 1111),
    new Pokemon("Blastoise", ["water"], 55, 99)
];

function main(): void {
    renderPokemon();

    if (typesDropdownForm) {
        typesDropdownForm.innerHTML = pokemonTypes.map(type => `<label><input type="checkbox" value="${type}" />${type}</label>`).join("");
        
        typesDropdownForm.addEventListener("change", (e: Event) => {
            const target = e.target as HTMLInputElement;
            const form = target?.form;
            const checkedTypes: string[] = [];

            if (form) {
                for (const element of Array.from(form.elements)) {
                    const input = element as HTMLInputElement;
                    if (input.checked && input.value) {
                        checkedTypes.push(input.value);
                    }
                }
            }

            if (checkedTypes.length === 0) {
                pokemonList.forEach(pokemon => pokemon.hidden = false);
            } else {
                pokemonList.forEach(pokemon => {
                    pokemon.hidden = !pokemon.types.some(type => checkedTypes.includes(type));
                });
            }

            renderPokemon();
        });
    }

    typesButton?.addEventListener("click", () => {
        typesDropdownForm?.classList.toggle("open");
    });

    erButton?.addEventListener("click", () => {
        if (erDesc) {
            pokemonList.sort((a, b) => b.er - a.er);
        } else {
            pokemonList.sort((a, b) => a.er - b.er);
        }
        erDesc = !erDesc;
        renderPokemon();
    });

    dpsButton?.addEventListener("click", () => {
        if (dpsDesc) {
            pokemonList.sort((a, b) => b.dps - a.dps);
        } else {
            pokemonList.sort((a, b) => a.dps - b.dps);
        }
        dpsDesc = !dpsDesc;
        renderPokemon();
    });
}

function elementFromHTML(htmlString: string): HTMLElement {
    const tempWrapper = document.createElement("div");
    tempWrapper.innerHTML = htmlString.trim();
    return (tempWrapper.firstElementChild as HTMLElement) || document.createElement("div");
}

function renderPokemon(): void {
    document.querySelectorAll(".pokemon-card").forEach(card => card.remove());
    pokemonList
        .filter(pokemon => !pokemon.hidden)
        .forEach(pokemon => pokemonAll?.appendChild(pokemon.html));
}

main();
