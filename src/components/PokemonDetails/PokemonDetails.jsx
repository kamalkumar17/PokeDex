import './PokemonDetails.css';
import { Link, useParams } from 'react-router-dom';
import usePokemonDetails from '../../Hooks/usePokemonDetails';
import Pokemon from '../Pokemon/Pokemon';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, PokemonListState] = usePokemonDetails(id);

    return (
        <>
            <h1 className='page-redirect'>
                <Link className='home-page' to="/">Pokedex</Link>
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
            <div className='similar-pokemons'>
                <h2>Similar Pokemons</h2>
                <div className='pokemon-simlar-boxes'>
                    {PokemonListState.pokemonList.length > 0 &&
                        PokemonListState.pokemonList.map(pokemon => <Pokemon key={pokemon.id} name={pokemon.name} url={pokemon.image} id={pokemon.id} />)
                    }
                </div>
            </div>
        </>
    )
}
export default PokemonDetails;