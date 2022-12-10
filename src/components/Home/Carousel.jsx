//icons
import { useEffect, useState, useRef } from "react";
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io';

//components
import CarouselCard from "./CarouselCard";

//css
import './carousel.css'

function Carousel ({apiKey, type, clientType, page}) {

    const movieUrl = import.meta.env.VITE_MOVIE_URL;
    const imgUrl = import.meta.env.VITE_IMG_URL;

    const carousel = useRef();

    const [movies, setMovies] = useState([]);
    const [scroll, setScroll] = useState({});

    useEffect(() => {
        retrieveMovies();
        setScroll(
            {
                scrollPosition: carousel.current.scrollLeft + carousel.current.offsetWidth,
                scrollWidth: carousel.current.scrollWidth,
                containerWidth: carousel.current.offsetWidth
            }
        )
    }, [])

    const retrieveMovies = async () => {
        const data = await fetch(`${movieUrl}/${type}?api_key=${apiKey}&page=${page}`);
        const moviesData = await data.json();
        const moviesList = [];

        await Promise.all(moviesData.results.map(async (movie) => {
            if(movie.backdrop_path !== null){
                const genres = await retrieveCurrentMovieGenres(movie)
                movie.genres_names = genres
                moviesList.push(movie)
            }
        }))

        setMovies(moviesList)
    }

    const retrieveCurrentMovieGenres = async (movie) => {
        const genres = await fetch(`${movieUrl}/${movie.id}?api_key=${apiKey}`);
        const genresData = await genres.json();
        const genresNames = [];

        genresData.genres.forEach((genre) => {
            if (genresNames.length < 3) genresNames.push(genre.name)
        })

        return genresNames;
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

    const scrollProperties = () => {
        setScroll(
            {
                scrollPosition: carousel.current.scrollLeft + carousel.current.offsetWidth,
                scrollWidth: carousel.current.scrollWidth,
                containerWidth: carousel.current.offsetWidth
            }
        )
    }

    return(
        <div className="carousel-container">
            <h2><span>♦ </span>{clientType}</h2>
            <div className="carousel" ref={carousel} onScroll={() => scrollProperties()}>
            {movies.map((movie) => (
                <CarouselCard key={movie.id} movie={movie} imgUrl={imgUrl}/>
            ))}
            </div>
            {scroll.scrollPosition > scroll.containerWidth && 
            <div className="prev-card">
                <IoIosArrowBack className="icon-prev" onClick={() => moveCarousel('prev')}/>
            </div>}
            {(scroll.scrollPosition < scroll.scrollWidth || scroll.scrollPosition === scroll.containerWidth) && 
            <div className="next-card">
                <IoIosArrowForward className="icon-next" onClick={() => moveCarousel('next')}/>
            </div>}
        </div>
    )
}

export default Carousel;