import { useEffect, useState } from "react";
// import axios from "axios";
import DownloadPokemons from "../utils/DownloadPokemons";
function usePokemonList(DEFAULT_URL) {
    

    const [PokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        PokedexURL: DEFAULT_URL,
        NextURL: DEFAULT_URL, 
        PreviousURL: DEFAULT_URL
    });

    // async function DownloadPokemonList() {
    //     const response = await axios.get(PokemonListState.PokedexURL ? PokemonListState.PokedexURL : DEFAULT_URL);
    //     const PokemonListResults = response.data.results;
    //     const PokemonPromises = PokemonListResults.map((Pokemon) => axios.get(Pokemon.url));
    //     const PokemonListData = await axios.all(PokemonPromises);
    //     const PokemonFinalList = PokemonListData.map((pokemonData) => {
    //         const pokemon = pokemonData.data;
    //         return {
    //             id: pokemon.id,
    //             name: pokemon.name,
    //             image: pokemon.sprites.other.dream_world.front_default,
    //             type: pokemon.types
    //         }
    //     })
    //     setPokemonListState({ ...PokemonListState, pokemonList: PokemonFinalList, NextURL: response.data.next, PreviousURL: response.data.previous });
    // }

    useEffect(() => {
        DownloadPokemons(PokemonListState,setPokemonListState,DEFAULT_URL);
    }, [PokemonListState.PokedexURL])

    return [PokemonListState, setPokemonListState] ;

}
export default usePokemonList;