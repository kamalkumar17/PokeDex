import React from 'react'
import Pokedex from './components/Pokedex/Pokedex';
import { Route, Routes } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Pokedex/>}/>
          <Route path='/pokemon/:id' element={<PokemonDetails/>}/>
          <Route path='*' element={<h1>Not Found</h1>}/>
       </Routes>
    </>
  )
}

export default App;