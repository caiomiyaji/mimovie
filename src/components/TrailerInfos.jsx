import { useEffect, useState } from 'react';

import './trailerInfos.css'

function TrailerInfos ({trailer, imgUrl, retrieveMovie}) {

    const [infos, setInfos] = useState(null);

    useEffect(() => {
        retrieveMovie(trailer.id, setInfos)
    },[])

    return(
        <div key={trailer.id} className="trailer-container">
            <img src={`${imgUrl}/original/${trailer.poster}`} alt={trailer.title} />
            <div className="trailer-infos">
                {infos}
            </div>
        </div>
    )
}

export default TrailerInfos;