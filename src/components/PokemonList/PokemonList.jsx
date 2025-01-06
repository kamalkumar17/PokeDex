import axios from 'axios';
import './PokemonList.css';
import React, { useEffect, useState } from 'react'
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../Hooks/usePokemonList';

function PokemonList() {

    const [PokemonListState,setPokemonListState] = usePokemonList();
    
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