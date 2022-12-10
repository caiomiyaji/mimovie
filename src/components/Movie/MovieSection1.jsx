//icons
import { VscArrowSmallDown } from 'react-icons/vsc'

//css
import './movieSection1.css'

function MovieSection1 ({ movie, imgUrl }) {

    return(
        <section className='movie-section1'>
            <img className='movie-section1-background' src={`${imgUrl}/original/${movie.backdrop_path}`} alt={movie.title} />
            <div className='movie-section1-overlay'>
                <h1>{movie.title}</h1>
                <VscArrowSmallDown className='movie-section1-next-icon'/>
            </div>
        </section>
    )
}

export default MovieSection1;