import trailers from '../trailers/trailers'
import { useEffect, useState, useRef } from 'react';
import TrailerInfos from './TrailerInfos';
import { BiTime } from 'react-icons/bi'
import { AiOutlineStar } from 'react-icons/ai'
import ReactPlayer from 'react-player';

import './homeSection.css';

function HomeSection1 ({apiKey}) {

    const movieUrl = import.meta.env.VITE_MOVIE_URL;
    const imgUrl = import.meta.env.VITE_IMG_URL;

    const container = useRef();

    let right = true;
    let trailerIndex = 1;

    useEffect(() => {
        setInterval(() => {
            handleTrailers();
        }, 5000);
    }, [])

    const retrieveMovie = async (id, setInfos) => {
        const movieData = await fetch(`${movieUrl}/${id}?api_key=${apiKey}`);
        const movie = await movieData.json();

        const runtime = movie.runtime;
        const hours = runtime/60;
        const minutes = (hours - Math.floor(hours)) * 60;

        setInfos(
            <div className="trailer-movie-infos">
                <div className='trailer-left'>
                    <h1>{movie.title}</h1>
                    <h3>{movie.overview}</h3>
                    <div className="trailer-movie-details">
                        <div className='trailer-runtime'>
                            <BiTime className="trailer-runtime-icon"/>
                            <span>{`${Math.floor(hours)} h ${Math.floor(minutes)} min`}</span>
                        </div>
                        <div className='trailer-rating'>
                            <AiOutlineStar className='trailer-rating-icon' />
                            <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                        <span className='trailer-date'>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                    <div className='trailer-genres'>
                            {movie.genres.map((genre) => (
                                <span key={genre.id}>{genre.name}</span>
                            ))}
                    </div>
                    <button>Watch trailer</button>
                </div>
            </div>
        );
    }

    const handleScroll = () => {
        if (container.current.scrollLeft + container.current.offsetWidth >= container.current.scrollWidth) right = false;
        if (container.current.scrollLeft <= 0) right = true;
    }

    const handleTrailers = () => {
        const currentTrailer = container.current.querySelector(`#id${trailerIndex}`);
        console.log(currentTrailer)
        if(right){
            container.current.scrollTo(
                {
                    top: 0,
                    left: currentTrailer.offsetLeft,
                    beahvior: "smooth"
                }
            )
            trailerIndex < 3 ? trailerIndex++ : trailerIndex--;
        }else{
            trailerIndex > 0 ? trailerIndex-- : trailerIndex++;
            container.current.scrollTo(
                {
                    top: 0,
                    left: currentTrailer.offsetLeft,
                    beahvior: "smooth"
                }
            )
        }
    }

    return(
        <section>
            <div className='section1-container' ref={container} onScroll={() => handleScroll()}>
                {trailers.map((trailer, index) => (
                    <TrailerInfos key={trailer.id} index={index} trailer={trailers[index]} imgUrl={imgUrl} retrieveMovie={retrieveMovie}/>
                ))}
            </div>
        </section>
    )
}

export default HomeSection1;