import Carousel from '../components/Home/Carousel'
import HomeSection1 from '../components/Home/HomeSection1';

//css
import './home.css';

function Home () {

    const apiKey = import.meta.env.VITE_API_KEY;

    return(
        <>  
            <HomeSection1 apiKey={apiKey}/>
            <div className='movies-carousel'>
                <Carousel apiKey={apiKey} type="now_playing" clientType="Now Playing" page="1"/>
                <Carousel apiKey={apiKey} type="popular" clientType="Popular" page="2"/>
                <Carousel apiKey={apiKey} type="top_rated" clientType="Top Rated" page="1"/>
                <Carousel apiKey={apiKey} type="upcoming" clientType="Upcoming" page="1"/>
            </div>
        </>
    )   
}

export default Home;