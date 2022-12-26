import {Routes, Route} from 'react-router-dom';

//pages
import Home from './pages/Home';
import Movie from './pages/Movie';
import MoviesList from './pages/MoviesList'
import NotFound from './pages/NotFound';

//css
import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movies' element={<MoviesList />}/>
        <Route path='/movie/:id' element={<Movie />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App
