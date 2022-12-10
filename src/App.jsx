import {Routes, Route} from 'react-router-dom';

//pages
import Home from './pages/Home';
import Movie from './pages/Movie';

//css
import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movie/:id' element={<Movie />}/>
      </Routes>
    </div>
  )
}

export default App
