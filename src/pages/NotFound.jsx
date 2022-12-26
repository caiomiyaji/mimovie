import { useNavigate } from 'react-router-dom'

//css
import './notFound.css'

//svg
import notFound from '../assets/notfound.svg'

function NotFound () {

    const navigate = useNavigate();

    return(
        <div className="notfound-page">
            <img className='notfound-img' src={notFound} alt="Not found image" />
            <h1>Oops... Something went wrong</h1>
            <button onClick={() => navigate("/")}>Back to Homepage</button>
        </div>
    )
}

export default NotFound;