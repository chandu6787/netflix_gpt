import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addTopRatedMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';
import { useSelector } from 'react-redux';

const useTopRatedMovies = () => {
   const dispatch=useDispatch();
  const movies=useSelector((store)=>store.movies.TopRatedMovies)

  const getTopRatedMovies=async ()=>
  {
    const data=await fetch('https://api.themoviedb.org/3/movie/top_rated', API_OPTIONS)


    const json=await data.json();
    dispatch(addTopRatedMovies(json.results));
  }
  useEffect(()=>
  {
    if(!movies)
    getTopRatedMovies();

  },[]);
}

export default useTopRatedMovies