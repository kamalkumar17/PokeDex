import { useEffect, useState } from "react";
import axios from "axios";
import DownloadPokemons from "../utils/DownloadPokemons";
import { useParams } from "react-router-dom";

function usePokemonDetails(pokemonName) {

    const { id } = useParams();

    const POKEMON_DETAILS_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const [pokemon, setPokemon] = useState(null);


    const [PokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        PokedexURL: '',
        NextURL: '',
        PreviousURL: ''
    });


    async function DownloadGivenPokemon(id) {
        const response = await axios.get(POKEMON_DETAILS_URL + ((pokemonName) ? pokemonName : id));
        const pokemon = response.data;
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
       try{
        const type = await DownloadGivenPokemon(id);
        await DownloadPokemons(PokemonListState, setPokemonListState, `https://pokeapi.co/api/v2/type/${type}`);
       }catch{
        console.log('No Pokemon Found')
       }
    }



    useEffect(() => {
        downloadPokemonAndRelated(id);
        window.scrollTo({top:0,left:0,behavior:"smooth"})
    }, [id,pokemonName]);

    return [pokemon,PokemonListState];
}
export default usePokemonDetails;