import { useEffect, useState } from 'react';

//css
import './trailerInfos.css'

function TrailerInfos ({index, trailer, imgUrl, retrieveMovie}) {

    const [infos, setInfos] = useState(null);

    useEffect(() => {
        retrieveMovie(trailer.id, setInfos)
    },[])

    return(
        <div id={`id${index}`} key={trailer.id} className="trailer-container">
            <img src={`${imgUrl}/original/${trailer.poster}`} alt={trailer.title} />
            <div className="trailer-infos">
                {infos}
            </div>
        </div>
    )
}

export default TrailerInfos;