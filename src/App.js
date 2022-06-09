import './App.css';
import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import {BsSearch} from 'react-icons/bs'

const API_KEY = 'apikey=90438ed';
// const movie1 = {
//   Poster: "https://m.media-amazon.com/images/M/MV5BNTI5OTBhMGYtNTZlNS00MjMzLTk5NTEtZDZkODM5YjYzYmE5XkEyXkFqcGdeQXVyMzU0OTU0MzY@._V1_SX300.jpg",
// Title: "Starwars: Goretech",
// Type: "movie",
// Year: "2018",
// imdbID: "tt9336300",
// }
const App =  () => {
  const [movies,setMovies]=useState([]);
  const [searchItem, setSearchItem] = useState('');


  const searchMovies = async (title) => {
    const response = await fetch(`https://www.omdbapi.com/?s=${title}&${API_KEY}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() =>{
    searchMovies('wolverine')
  },[]);
  
  return (
    <div className='app'>
    <h1>MovieHunt</h1>

    <div className='search'>
      <input 
      placeholder='Search for movies'
      value={searchItem} 
      onChange={(e) => setSearchItem(e.target.value)
      }
    
      />
      <BsSearch 
      alt='search'
      onClick={() => searchMovies(searchItem)}
      />
    </div>

    {
      movies?.length>0
        ? (<div className='container'>
          {
            movies.map((movie) => (
              <MovieCard movie={movie} />
            ))
          }
        
      </div>
      ) : (
        <div className='empty'>
          <h2>No movies found!!!</h2>
        </div>
      )
    }
    
    </div>
  )
}

export default App;
