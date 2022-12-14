import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarouselCard from '../components/Home/CarouselCard';
import Loader from '../components/Loader';

//svg
import emptySearch from '../assets/empty.svg'

//icons
import { RiLoader2Fill } from 'react-icons/ri'

//css
import './moviesList.css';

function MoviesList () {

    const searchUrl = import.meta.env.VITE_SEARCH;
    const movieUrl = import.meta.env.VITE_MOVIE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    const imgUrl = import.meta.env.VITE_IMG_URL;

    const [params] = useSearchParams();

    const [loader, setLoader] = useState(true);
    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const loadDetector = useRef();

    let effect = true;
    let effect2 = true;
    let effect3 = true;

    useEffect(() => {
        if(effect){
            effect = false;
            const observer = new IntersectionObserver((entries) => {
                entries.map((entry) => {
                    if(entry.isIntersecting){
                        setPage(prev => prev + 1)
                    }
                })
            }, {threshold: 0.5})

            observer.observe(loadDetector.current)
        }
    }, [])

    useEffect(() => {
        if(effect2){
            effect2 = false;
            if(page > 0 && params.has('query') && params.get('query').length > 0){
                retrieveMovies();
            }else{
                setLoader(false);
            }
        }
    }, [page])

    useEffect(() => {
        if(effect3){
            effect3 = false;
            setMovies([]);
            setPage(1);
        }
    }, [params])

    const retrieveMovies = async () => {
        const moviesData = await fetch(`${searchUrl}/movie?api_key=${apiKey}&query=${params.get('query')}&page=${page}&include_adult=false`);
        const moviesList = await moviesData.json();
        const moviesResults = []; 

        await Promise.all(moviesList.results.map(async (movie) => {
            if(movie.poster_path !== null){
                const genres = await retrieveCurrentMovieGenres(movie)
                movie.genres_names = genres
                moviesResults.push(movie);
            } 
        })) 
 
        movies ? setMovies((prevMovies) => [...prevMovies, ...moviesResults]) : setMovies(moviesResults);
        setTotalResults(moviesList.total_results);
        setTotalPages(moviesList.total_pages);
        setLoader(false);
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

    const queryExists = () => {
        if(params.has('query') === true){
            if(params.get('query').length > 0){
                return <h1>{totalResults} results for: {params.get('query')}</h1>
            }else{
                return(
                <div className='movies-list-empty'>
                    <img src={emptySearch} alt="Empty search" />
                    <h3>Your query must haver a value...</h3>
                </div> 
                )
            }
        }
    }

    return(
        <div className="movies-list-page">
            {queryExists()}
            <div className='movies-list-container'>
                {movies?.map((movie, index) => (
                    <CarouselCard key={index} movie={movie} imgUrl={imgUrl} poster={movie.poster_path}/>
                ))}
            </div> 
            <div className='load-detector' ref={loadDetector}>
                {page < totalPages && <RiLoader2Fill className='movies-loader-icon'/> }
            </div>
            {loader && <Loader />}
        </div>
    )
}

export default MoviesList;