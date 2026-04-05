import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';
import { useSelector } from 'react-redux';

const usePopularMovies = () => {
   const dispatch=useDispatch();
  const movies=useSelector((store)=>store.movies.PopularMovies)

  const getPopularMovies=async ()=>
  {
    const data=await fetch('https://api.themoviedb.org/3/movie/popular',API_OPTIONS)

    const json=await data.json();
    dispatch(addPopularMovies(json.results));
  }
  useEffect(()=>
  { 
    if(!movies)
    getPopularMovies();

  },[]);
}

export default usePopularMovies