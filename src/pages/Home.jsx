import { useState } from 'react';
import Carousel from '../components/Home/Carousel'
import HomeSection1 from '../components/Home/HomeSection1';
import Loader from '../components/Loader';

//css
import './home.css';

function Home () {

    const apiKey = import.meta.env.VITE_API_KEY;

    const [loader, setLoader] = useState(true);

    const handleLoader = () => {
        setLoader(false)
    }

    return(
        <>  
            <HomeSection1 apiKey={apiKey}/>
            <div className='movies-carousel'>
                <Carousel apiKey={apiKey} type="now_playing" clientType="Now Playing" page="1" handleLoader={handleLoader}/>
                <Carousel apiKey={apiKey} type="popular" clientType="Popular" page="2" handleLoader={handleLoader}/>
                <Carousel apiKey={apiKey} type="top_rated" clientType="Top Rated" page="1" handleLoader={handleLoader}/>
                <Carousel apiKey={apiKey} type="upcoming" clientType="Upcoming" page="1" handleLoader={handleLoader}/>
            </div>
            {loader && <Loader />}
        </>
    )   
}

export default Home;