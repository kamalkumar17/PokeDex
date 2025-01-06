import './PokemonDetails.css';
import { Link, useParams } from 'react-router-dom';
import usePokemonDetails from '../../Hooks/usePokemonDetails';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon] = usePokemonDetails(id);
 
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