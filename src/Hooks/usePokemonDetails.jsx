import { useEffect, useState } from "react";
import axios from "axios";

function usePokemonDetails(id) {
    
    const POKEMON_DETAILS_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const [pokemon, setPokemon] = useState(null);
    async function DownloadPokemon(id) {
        const response = await axios.get(POKEMON_DETAILS_URL + id);
        const pokemon = response.data;
        setPokemon({
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemon.sprites.other.dream_world.front_default,
            type: pokemon.types
        })
        console.log(response);

    }

    useEffect(() => {
        DownloadPokemon(id);
    }, []);

    return [pokemon, setPokemon] ;
}
export default usePokemonDetails;