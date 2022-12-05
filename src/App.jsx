import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';

import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movie' element={<Movie />}/>
      </Routes>
    </div>
  )
}

export default App
