import React from 'react'
import { BASE_IMAGE_URL } from '../utils/constants'

const MovieCard = ({posterpath}) => {
  return (
    <div className="w-48 pr-4">
        <img alt="Movie Card" src={BASE_IMAGE_URL+posterpath}/>
    </div>
  )
}

export default MovieCard