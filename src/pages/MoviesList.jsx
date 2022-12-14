//css
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './moviesList.css';

function MoviesList () {

    const searchUrl = import.meta.env.VITE_SEARCH;
    const apiKey = import.meta.env.VITE_API_KEY;

    const  = useParams();

    useEffect(() => {
        const searchData = fetch(`${searchUrl}/movie??api_key=${apiKey}&query=${}&page=1&include_adult=false`)
    }, [])

    return(
        <div className="movies-list-page">
            <h1></h1>
        </div>
    )
}

export default MoviesList;