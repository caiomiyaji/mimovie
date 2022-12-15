import { Link } from 'react-router-dom';
import Tmdb from '../assets/tmdb.svg'

//icons
import { BsLinkedin } from 'react-icons/bs'
import { FaGithubSquare } from 'react-icons/fa'

//css
import './footer.css'

function Footer () {
    return(
        <footer>
            <div className='footer-content'>
                <div className='footer-logo-container'>
                    <Link to="/" className='footer-logo'>MiMovie</Link>
                </div>
                <p className='follow-us'>Follow us</p>
                <div className='footer-icons-container'>
                    <BsLinkedin className='footer-icons'/>
                    <FaGithubSquare className='footer-icons github-icon'/>
                </div>
                <img className='tmdb-logo' src={Tmdb} alt="Tmdb logo" />
            </div>
        </footer>
    )
} 

export default Footer;