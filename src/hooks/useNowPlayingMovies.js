import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useNowPlayingMovies = () => {
   const dispatch=useDispatch();
   const movies=useSelector((store)=>store.movies.NowPlayingMovies)
  const getNowPlayingMovies=async ()=>
  {
    const data=await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    const json=await data.json();
    dispatch(addNowPlayingMovies(json.results));
  }
  useEffect(()=>
  {if(!movies)
    getNowPlayingMovies();

  },[]);
}

export default useNowPlayingMovies