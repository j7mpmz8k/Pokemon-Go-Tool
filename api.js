async function getFastMoves() {
    let response = await fetch("https://pogoapi.net/api/v1/fast_moves.json");    
    let data = await response.json();
}
async function getPvpFastMoves() {
    let response = await fetch("https://pogoapi.net/api/v1/pvp_fast_moves.json");    
    let data = await response.json();
}
async function getPvpChargedMoves() {
    let response = await fetch("https://pogoapi.net/api/v1/pvp_charged_moves.json");    
    let data = await response.json();
}
async function getChargedMoves() {
    let response = await fetch("https://pogoapi.net/api/v1/charged_moves.json");    
    let data = await response.json();
}
async function getPokemon() {
    let response = await fetch("https://pogoapi.net/api/v1/pokemon_types.json");    
    let data = await response.json();
}