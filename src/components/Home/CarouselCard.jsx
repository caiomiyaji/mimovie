import { useNavigate } from 'react-router-dom'

//icons
import { HiStar } from 'react-icons/hi'
import { BsPlayCircleFill } from 'react-icons/bs'

//css
import './carouselCard.css'

function CarouselCard ({movie, imgUrl}) {

    const navigate = useNavigate();

    const goToPageMovie = () => {
        navigate(`./movie/${movie.id}`);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    return(
            <div className="card" onClick={() => goToPageMovie()}>
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