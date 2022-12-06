import { HiStar } from 'react-icons/hi'
import { BsPlayCircleFill } from 'react-icons/bs'
import './carouselCard.css'

function CarouselCard ({movie, imgUrl}) {

    return(
            <div className="card">
                <figure>
                    <img src={`${imgUrl}/w500/${movie.backdrop_path}`} alt={movie.title} />
                    <BsPlayCircleFill className='card-play-icon'/>
                </figure>
                <h3>{movie.title}</h3>
                <div className='card-infos'>
                    <div className='card-genres'>
                        {movie.genres_names.map((genre, index) => (
                            <p key={index}><span>♦ </span>{genre}</p>
                        ))}
                    </div>
                    <div className='rating-container'>
                        <HiStar className='rating-icon'/>
                        <p>{movie.vote_average}</p>
                    </div>
                </div>
            </div>
    )
}

export default CarouselCard;