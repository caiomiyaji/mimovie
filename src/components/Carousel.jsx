import { useEffect, useState, useRef } from "react";
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io';
import CarouselCard from "./CarouselCard";

import './carousel.css'

function Carousel ({apiKey, type, clientType}) {

    const movieUrl = import.meta.env.VITE_MOVIE_URL;
    const imgUrl = import.meta.env.VITE_IMG_URL;

    const [movies, setMovies] = useState([]);
    const carousel = useRef();

    useEffect(() => {
        retrieveMovies();
    }, [])

    const retrieveMovies = async () => {
        const data = await fetch(`${movieUrl}/${type}?api_key=${apiKey}`);
        const moviesData = await data.json();

        setMovies(moviesData.results);
    }

    const moveCarousel = (direction) => {

        if(direction === 'next'){
            carousel.current.scrollTo({
                top: 0,
                left: carousel.current.scrollLeft + carousel.current.offsetWidth,
                behavior: 'smooth'
            })
        } else {
            carousel.current.scrollTo({
                top: 0,
                left: carousel.current.scrollLeft - carousel.current.offsetWidth,
                behavior: 'smooth'
            })
        }
    }

    return(
        <div className="carousel-container">
            <h2>{clientType}</h2>
            <div className="carousel" ref={carousel}>
            {movies.map((movie) => (
                <CarouselCard key={movie.id} movie={movie} imgUrl={imgUrl}/>
            ))}
            </div>
            <div className="prev-card">
                <IoIosArrowBack className="icon-prev" onClick={() => moveCarousel('prev')}/>
            </div>
            <div className="next-card">
                <IoIosArrowForward className="icon-next" onClick={() => moveCarousel('next')}/>
            </div>
        </div>
    )
}

export default Carousel;