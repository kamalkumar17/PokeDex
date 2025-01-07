import axios from "axios";

async function DownloadPokemons(PokemonListState, setPokemonListState, DefaultUrl,limit=20) {
    const response = await axios.get(PokemonListState.PokedexURL ? PokemonListState.PokedexURL : DefaultUrl);
    let PokemonResults = response.data.results ? response.data.results : response.data.pokemon;
    PokemonResults = PokemonResults.slice(0,limit);
    const PokemonPromise = PokemonResults.map((p) => {
        if (p.url) {
            return axios.get(p.url);
        } else if (p.pokemon.url) {
            return axios.get(p.pokemon.url);
        }
    });


    const PokemonListData = await axios.all(PokemonPromise);
    console.log(PokemonListData);
    const PokemonFinalList = PokemonListData.map((pokemonData) => {
        const pokemon = pokemonData.data;
        return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default,
            type: pokemon.types
        }
    })
    setPokemonListState({ ...PokemonListState, pokemonList: PokemonFinalList, NextURL: response.data.next, PreviousURL: response.data.previous });
}

export default DownloadPokemons;