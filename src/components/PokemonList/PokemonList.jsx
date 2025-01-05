import axios from 'axios';
import './PokemonList.css';
import React, { useEffect, useState } from 'react'
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {

    const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon';

    const [PokemonListState,setPokemonListState] = useState({
        pokemonList : [],
        PokedexURL : DEFAULT_URL,
        NextURL : DEFAULT_URL,
        PreviousURL : DEFAULT_URL
})

    async function DownloadPokemonList() {
        const response = await axios.get(PokemonListState.PokedexURL ? PokemonListState.PokedexURL : DEFAULT_URL);
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
    setPokemonListState({...PokemonListState,pokemonList:PokemonFinalList,NextURL:response.data.next,});
    }

    useEffect(() => {
        DownloadPokemonList();
    }, [PokemonListState.PokedexURL])



    return (
        <div className="pokemon-list-wrapper">
            <div>
                <h1 className='pokemon-list-header'>Pokemon List</h1>
            </div>
            <div className='page-controls'>
                <button onClick={()=> setPokemonListState({...PokemonListState,PokedexURL:PokemonListState.PreviousURL})}>Previous</button>
                <button onClick={()=> setPokemonListState({...PokemonListState,PokedexURL:PokemonListState.NextURL})}>Next</button>
            </div>
            <div className='pokemon-list'>
                {PokemonListState.pokemonList.map(pokemon => <Pokemon key={pokemon.id} name={pokemon.name} url={pokemon.image} id={pokemon.id}/>)}
            </div>
        </div>
    )
}
export default PokemonList;