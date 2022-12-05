import Carousel from '../components/Carousel'
import './home.css';

function Home () {

    const apiKey = import.meta.env.VITE_API_KEY;

    return(
        <>
            <h1>Home</h1>
            <div className='movies-carousel'>
                <Carousel apiKey={apiKey} type="now_playing" clientType="Now Playing"/>
                <Carousel apiKey={apiKey} type="popular" clientType="Popular"/>
                <Carousel apiKey={apiKey} type="top_rated" clientType="Top Rated"/>
                <Carousel apiKey={apiKey} type="upcoming" clientType="Upcoming"/>
            </div>
        </>
    )   
}

export default Home;