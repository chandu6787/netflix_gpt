import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';
import { useSelector } from 'react-redux';

const useUpcomingMovies = () => {
   const dispatch=useDispatch();
   const movies=useSelector((store)=>store.movies.UpComingMovies)

  const getUpcomingMovies=async ()=>
  {
    const data=await fetch('https://api.themoviedb.org/3/movie/upcoming', API_OPTIONS)


    const json=await data.json();
    dispatch(addUpcomingMovies(json.results));
  }
  useEffect(()=>
  {
    if(!movies)
    getUpcomingMovies();

  },[]);
}

export default useUpcomingMovies