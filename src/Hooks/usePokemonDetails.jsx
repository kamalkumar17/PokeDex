import { useEffect, useState } from "react";
import axios from "axios";
import DownloadPokemons from "../utils/DownloadPokemons";

function usePokemonDetails(id, DefaultUrl) {

    const POKEMON_DETAILS_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const [pokemon, setPokemon] = useState(null);


    const [PokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        PokedexURL: '',
        NextURL: '',
        PreviousURL: ''
    });


    async function DownloadGivenPokemon(id) {
        const response = await axios.get(POKEMON_DETAILS_URL + id);
        const pokemon = response.data;
        console.log(id);
        setPokemon({
            
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemon.sprites.other.dream_world.front_default,
            type: pokemon.types
        })

        const types = response.data.types.map(t => t.type.name);
        return types[0];
    }

    async function downloadPokemonAndRelated(id) {
        const type = await DownloadGivenPokemon(id);
        await DownloadPokemons(PokemonListState, setPokemonListState, `https://pokeapi.co/api/v2/type/${type}`);
    }



    useEffect(() => {
        downloadPokemonAndRelated(id);
        window.scrollTo({top:0,left:0,behavior:"smooth"})
    }, [id]);

    return [pokemon,PokemonListState];
}
export default usePokemonDetails;