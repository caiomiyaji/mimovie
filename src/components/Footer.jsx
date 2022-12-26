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
                    <a href="https://www.linkedin.com/in/caio-hideki-miyaji-86a76515b/" target="_blank">
                        <BsLinkedin className='footer-icons'/>
                    </a>
                    <a href="https://github.com/caiomiyaji" target="_blank">
                        <FaGithubSquare className='footer-icons github-icon'/>
                    </a>
                </div>
                <a href="https://www.themoviedb.org/?language=pt-BR" target="_blank">
                    <img className='tmdb-logo' src={Tmdb} alt="Tmdb logo" />
                </a>
            </div>
        </footer>
    )
} 

export default Footer;