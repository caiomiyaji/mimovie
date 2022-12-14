
//css
import './movieSection1.css'

function MovieSection1 ({ movie, imgUrl }) {

    return(
        <section className='movie-section1'>
            <img className='movie-section1-background' src={movie.backdrop_path && `${imgUrl}/original/${movie.backdrop_path}`} alt={movie.title} />
            <div className='movie-section1-overlay'>
            </div>
        </section>
    )
}

export default MovieSection1;