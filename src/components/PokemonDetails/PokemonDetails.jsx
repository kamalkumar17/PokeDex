import React, { useEffect, useState } from 'react'
import './PokemonDetails.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function PokemonDetails() {

    const { id } = useParams();
    const POKEMON_DETAILS_URL = 'https://pokeapi.co/api/v2/pokemon/';
    const [pokemon, setPokemon] = useState(null);
    async function DownloadPokemon() {
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
        DownloadPokemon();
    }, []);

    return (
        <>
            <h1 className='page-redirect'>
                <Link  className='home-page' to="/">Go To Home</Link>
            </h1>
            {pokemon && <div className='pokemon-details-wrapper'>
                <div className='name'> {pokemon.name}</div>
                <div className='pokemon-image'>
                    <img src={pokemon.image} />
                </div>
                <div className='pokemon-attr'>
                    <div>
                        Height : {pokemon.height}
                    </div>
                    <div>
                        Weight : {pokemon.weight}
                    </div>
                </div>
                <div className='pokemon-types'>
                    <h1>Type:</h1> {pokemon.type.map(t => <span key={t.type.name} className='type'>{t.type.name}</span>)}
                </div>
            </div>}
        </>
    )
}
export default PokemonDetails;