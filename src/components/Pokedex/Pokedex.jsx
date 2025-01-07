import React, { useState } from 'react'
import './Pokedex.css';
import Search from '../Search/Search';
import PokemonList from '../PokemonList/PokemonList';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
function Pokedex() {

  const [searchTerm,setSearchTearm] = useState('');

  return (
    <div className="pokedex-wrapper">
       <h1>POKEDEX</h1>
        <Search  updateSearchTerm={setSearchTearm}/>
        {searchTerm ? <PokemonDetails pokemonName={searchTerm} /> :<PokemonList/>}
    </div>
    
  )
}

export default Pokedex;