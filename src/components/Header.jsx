import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

//icons
import { BiSearch } from 'react-icons/bi'

//css
import './header.css';

function Header () {

    const searchInput = useRef();
    const navigate = useNavigate();

    const [searchContainerClass, setSearchContainerClass] = useState('header-search-container');
    const [searchValue, setSearchValue] = useState('')

    const setFocusToSearch = () => {
        searchInput.current.focus()
    }

    const handleInputBlur = () => {
        setTimeout(() => {
            setSearchContainerClass('header-search-container')
        }, 450);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchValue.length > 0){
            navigate(`/movies?query=${searchValue}`);
            setSearchValue('');
            document.activeElement.blur()
        }
    }

    const handleValue = (e) => {
        setSearchValue(e.target.value)
    }

    return(
        <header>
            <div className='header-container'>
                <div>
                    <Link to="/" className='logo'>MiMovie</Link>
                </div>
                <nav>
                    <div className={searchContainerClass}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input className='header-search-input' ref={searchInput} type="text" name="search" id="search" value={searchValue} placeholder='Search for a movie' onChange={(e) => handleValue(e)} onBlur={() => handleInputBlur()} onFocus={() => {
                                setSearchContainerClass('header-search-container header-search-container-border');
                            }}/>
                        </form>
                        <BiSearch className='header-search-icon' onClick={document.activeElement === searchInput.current ? (e) => handleSubmit(e) : () => setFocusToSearch()}/>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;