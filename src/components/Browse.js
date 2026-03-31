import Header from './Header'
import addNowPlayingMovies  from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
const Browse = () => {
   addNowPlayingMovies();
  return (
    <>
    <Header/>
    <MainContainer/>
    <SecondaryContainer/>
    </>
  )
}

export default Browse