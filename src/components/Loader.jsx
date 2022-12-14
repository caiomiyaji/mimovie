import { RiLoader2Fill } from 'react-icons/ri'

//css
import './loader.css'

function Loader (){
    return(
        <div className='loader'>
            <RiLoader2Fill className='loader-icon'/>
        </div>
    )
}

export default Loader;