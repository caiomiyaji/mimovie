import ReactPlayer from 'react-player';

//icons
import { BiTime } from 'react-icons/bi'
import { AiOutlineStar } from 'react-icons/ai'

//css
import './movieContent.css'

function MovieContent ({movie, imgUrl, trailerKey, crew}){

    const runtime = movie.runtime;
    const hours = runtime/60;
    const minutes = (hours - Math.floor(hours)) * 60;

    return(
        <section id='movieContent' className='section1-movie-content'>
            <div className='movie-poster-infos'>
                <div className='movie-poster-left'>
                    <img className='movie-poster-image' src={movie.poster_path && `${imgUrl}/w500/${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className='movie-infos-right'>
                    <h2>{movie.title}</h2>
                    <p className='movie-info-overview'>{movie.overview}</p>
                    <div className='movie-main-infos'>
                        <div className='movie-runtime'>
                            <BiTime className="movie-runtime-icon"/>
                            <span>{`${Math.floor(hours)} h ${Math.floor(minutes)} min`}</span>
                        </div>
                        <div className='movie-rating'>
                            <AiOutlineStar className='movie-rating-icon' />
                            <span>{Number(movie.vote_average).toFixed(1)}</span>
                        </div>
                        <span className='movie-date'>{`${new Date(movie.release_date).getFullYear()}`}</span>
                    </div>
                    <div className='movie-genres'>
                        {movie.genres?.map((genre) => (
                            <p key={genre.id}><span>♦ </span>{genre.name}</p>
                        ))}
                    </div>
                    <div className='movie-languages'>
                        {movie.spoken_languages?.map((language, index) => (
                            <p key={index}><span>♦ </span>{language.english_name}</p>
                        ))}
                    </div>
                    <div className='movie-crew-container'>
                        <div className='movie-crew'>
                            {crew && crew.slice(0, 2)?.map((crew, index) => (
                                <div key={index}>
                                    <p>{crew.name}</p>
                                    <p className='current-crew-job'>{crew.job}</p>
                                </div>
                            ))}
                        </div>
                        <div className='movie-crew'>
                            {crew && crew.slice(2, 4)?.map((crew, index) => (
                                <div key={index}>
                                    <p>{crew.name}</p>
                                    <p className='current-crew-job'>{crew.job}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='movie-trailer-section'>
                <ReactPlayer className="movie-trailer-player" url={`https://www.youtube.com/watch?v=${trailerKey}`} controls/>
            </div>
        </section>
    )
}

export default MovieContent;