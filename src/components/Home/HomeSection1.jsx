import trailers from '../../trailers/trailers'
import { useEffect, useState, useRef } from 'react';
import TrailerInfos from './TrailerInfos';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

//icons
import { BiTime } from 'react-icons/bi'
import { AiOutlineStar } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'

//css
import './homeSection.css';
import './modal.css'

//react-modal
Modal.setAppElement('#root');

function HomeSection1 ({apiKey}) {

    const movieUrl = import.meta.env.VITE_MOVIE_URL;
    const imgUrl = import.meta.env.VITE_IMG_URL;

    const containerTrailers = useRef();

    const [modalVisibility, setModalVisibility] = useState(false);
    const [trailerVideo, setTrailerVideo] = useState('');

    let right = true;
    let trailerIndex = 1;
    let effect = true;
    let trailersInterval;

    useEffect(() => {
        if(effect){
            effect = false;
            trailersInterval = setInterval(() => {
                handleTrailers();
            }, 5000);
        }
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
                    <button onClick={() => handleModal(id)}>Watch Trailer</button>
                </div>
            </div>
        );
    }

    const handleTrailers = () => {

        if(containerTrailers.current !== null){
            const currentTrailer = containerTrailers.current.querySelector(`#id${trailerIndex}`);
 
            if(right){
                trailerIndex++
                containerTrailers.current.scrollTo(
                    {
                        top: 0,
                        left: currentTrailer.offsetLeft,
                        beahvior: "smooth"
                    }
                )
            }else{
                trailerIndex--
                containerTrailers.current.scrollTo(
                    {
                        top: 0,
                        left: currentTrailer.offsetLeft,
                        beahvior: "smooth"
                    }
                )
            }

            if(trailerIndex >= 3){
                right = false;
            }else if (trailerIndex <= 0){
                right = true
            }
        }else{
            clearInterval(trailersInterval)
        }
    }

    const handleModal = (id) => {
        if(id){
            const video = trailers.find((trailer) => {
                return trailer.id === id;
            }) 
            setTrailerVideo(video.video_link)
        }

        setModalVisibility(!modalVisibility)
    }

    return(
        <section className='home-section1'>
            <div className='section1-container' ref={containerTrailers}>
                {trailers.map((trailer, index) => (
                    <TrailerInfos key={trailer.id} index={index} trailer={trailers[index]} imgUrl={imgUrl} retrieveMovie={retrieveMovie}/>
                ))}
            </div>
            <Modal isOpen={modalVisibility} className="my-modal" overlayClassName="my-overlay" onRequestClose={() => handleModal()}>
                <ReactPlayer url={trailerVideo} controls className="section1-player"/>
                <IoClose className='section1-close-trailer' onClick={() => handleModal()}/>
            </Modal>
        </section>
    )
}

export default HomeSection1;