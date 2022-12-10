import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

    useEffect(() => {
        if(effect){
            effect = false;
            retrieveMovie(id);
        }
    },[])

    const retrieveMovie = async () => {
        const movieData = await fetch(`${movieUrl}/${id}?api_key=${apiKey}`);
        const movieContent = await movieData.json();
    
        setMovie(movieContent)
    }

    return(
        <>
            <MovieSection1 movie={movie} imgUrl={imgUrl}/>
            
        </>
    )
}

export default Movie;