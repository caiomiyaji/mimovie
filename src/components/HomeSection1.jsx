import { useEffect, useState } from 'react';
import Youtube from 'react-youtube'

import './homeSection.css'

function HomeSection1 ({apiKey}) {

    const movieUrl = import.meta.env.VITE_MOVIE_URL;

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        retrieveMovies();
    }, [])

    const retrieveMovies = async () => {
        const data = await fetch(`${movieUrl}/now_playing?api_key=${apiKey}`);
        const dataList = await data.json();
        const movieList = [];

        await Promise.all(dataList.results.map( async (movie) => {
           if (movieList.length < 4) {
                movieList.push(movie)
                const videoData = await fetch(`${movieUrl}/${movie.id}/videos?&api_key=${apiKey}`);
                const videos = await videoData.json();
                movie.video_keys = videos.results;
           }
        }))
        setMovies(movieList)
    } 

    return(
        <section>
            <Youtube videoId="I9B6rwW35GQ"/>
        </section>
    )
}

export default HomeSection1;