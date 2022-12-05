import './carouselCard.css'


function CarouselCard ({movie, imgUrl}) {

    return(
        <div className='card-container'>
            <div className="card">
                <img src={`${imgUrl}/w400/${movie.poster_path}`} alt="" />
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
            </div>
        </div>
    )
}

export default CarouselCard;