import {Link} from 'react-router-dom';

//css
import './header.css';

function Header () {
    return(
        <header>
            <div className='header-container'>
                <div>
                    <Link to="/" className='logo'>MiMovie</Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/" className='nav-link'>Home</Link></li>
                        <li><Link to="/movie" className='nav-link'>Movies</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;