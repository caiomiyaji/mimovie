import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieContent from '../components/Movie/MovieContent';

//components
import MovieSection1 from '../components/Movie/MovieSection1';

//css
import './movie.css';

function Movie () {

    const apiKey = import.meta.env.VITE_API_KEY;

    const movieUrl = import.meta.env.VITE_MOVIE_URL;
    const imgUrl = import.meta.env.VITE_IMG_URL;

    let effect = true;

    const {id} = useParams();
    const [movie, setMovie] = useState({});
    const [trailerKey, setTrailerKey] = useState('');
    const [crew, setCrew] = useState([]);

    useEffect(() => {
        if(effect){
            effect = false;
            retrieveMovie(id);
            retrieveTrailer(id);
            retrieveCrew(id);
        }
    }, [])

    const retrieveMovie = async (id) => {
        const movieData = await fetch(`${movieUrl}/${id}?api_key=${apiKey}`);
        const movieContent = await movieData.json();
    
        setMovie(movieContent)
    }

    const retrieveTrailer = async (id) => {
        const trailerData = await fetch(`${movieUrl}/${id}/videos?api_key=${apiKey}`);
        const trailer = await trailerData.json();
        let trailerFounded = false;

        trailer.results.forEach((trailer) => {
            if(trailer.official === true && trailerFounded === false){
                trailerFounded = true
                setTrailerKey(trailer.key)
            }
        })
    }

    const retrieveCrew = async (id) => {
        const crewData = await fetch(`${movieUrl}/${id}/credits?api_key=${apiKey}`);
        const crewJson = await crewData.json();
        const crewList = await crewJson.crew;

        setCrew(crewList)
    }

    return(
        <div className='movie-page'>
            <MovieSection1 movie={movie} imgUrl={imgUrl}/>
            <MovieContent movie={movie} imgUrl={imgUrl} trailerKey={trailerKey} crew={crew}/>
        </div>
    )
}

export default Movie;