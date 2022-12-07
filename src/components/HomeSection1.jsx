import trailers from '../trailers/trailers'
import { useEffect, useState, useRef } from 'react';
import TrailerInfos from './TrailerInfos';
import ReactPlayer from 'react-player';

import './homeSection.css';

function HomeSection1 ({apiKey}) {

    const movieUrl = import.meta.env.VITE_MOVIE_URL;
    const imgUrl = import.meta.env.VITE_IMG_URL;

    const container = useRef();
    let right = true;

    useEffect(() => {
        setInterval(() => {
            handleTrailers();
        }, 4000);
    }, [])

    const retrieveMovie = async (id, setInfos) => {
        const movieData = await fetch(`${movieUrl}/${id}?api_key=${apiKey}`);
        const movie = await movieData.json();

        setInfos(
            <div className="trailer-movie-infos">
                <div className='trailer-left'>
                    <h1>{movie.title}</h1>
                    <h3>{movie.overview}</h3>
                </div>
                <div className='trailer-right'>

                </div>
            </div>
        );
    }

    const handleTrailers = () => {

        if(right){
            container.current.scrollTo(
                {
                    top: 0,
                    left: container.current.scrollLeft + container.current.offsetWidth,
                    beahvior: "smooth"
                }
            )
            if (container.current.scrollLeft + container.current.offsetWidth === container.current.scrollWidth) right = false;
        }else{
            container.current.scrollTo(
                {
                    top: 0,
                    left: container.current.scrollLeft - container.current.offsetWidth,
                    beahvior: "smooth"
                }
            )
            if (container.current.scrollLeft === 0) right = true;
        }
    }

    return(
        <section>
            <div className='section1-container' ref={container}>
                {trailers.map((trailer, index) => (
                    <TrailerInfos key={trailer.id} trailer={trailers[index]} imgUrl={imgUrl} retrieveMovie={retrieveMovie}/>
                ))}
            </div>
        </section>
    )
}

export default HomeSection1;