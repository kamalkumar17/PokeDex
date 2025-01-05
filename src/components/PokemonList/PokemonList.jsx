import axios from 'axios';
import './PokemonList.css';
import React, { useEffect, useState } from 'react'
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const [pokemonList, setPokemon] = useState([]);
    const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon';
    const [PokedexURL,setPokedexURL] = useState(DEFAULT_URL);
    const [NextURL,setNextURL] = useState(DEFAULT_URL);
    const [PreviousURL,setPreviousURL] = useState(DEFAULT_URL);

    async function DownloadPokemonList() {
        const response = await axios.get(PokedexURL ? PokedexURL : DEFAULT_URL);
        setNextURL(response.data.next);
        setPreviousURL(response.data.previous);
        const PokemonListResults = response.data.results;
        const PokemonPromises = PokemonListResults.map((Pokemon) => axios.get(Pokemon.url));
        const PokemonListData = await axios.all(PokemonPromises);
        const PokemonFinalList = PokemonListData.map((pokemonData) => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                type: pokemon.types
            }
        })
        setPokemon(PokemonFinalList);
    }

    useEffect(() => {
        DownloadPokemonList();
    }, [PokedexURL])



    return (
        <div className="pokemon-list-wrapper">
            <div>
                <h1 className='pokemon-list-header'>Pokemon List</h1>
            </div>
            <div className='page-controls'>
                <button onClick={()=> setPokedexURL(PreviousURL)}>Previous</button>
                <button onClick={()=> setPokedexURL(NextURL)}>Next</button>
            </div>
            <div className='pokemon-list'>
                {pokemonList.map(pokemon => <Pokemon key={pokemon.id} name={pokemon.name} url={pokemon.image} id={pokemon.id}/>)}
            </div>
        </div>
    )
}
export default PokemonList;