import React from 'react'
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language, id } }) => {
  return (
    <div key={id} className='moviecard p-2 bg-[#171231] rounded-lg w-2/5 lg:w-1/6 md:w-1/6 mb-8 overflow-hidden'>
      <img className='min-h-[13rem] w-full object-cover rounded-lg' src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : './No-Poster.png'} alt="" />
      <h3 className='text-white font-bold mt-1 whitespace-nowrap overflow-hidden'>{title}</h3>
      <div className='flex items-center gap-2 text-sm tracking-tight'>
        <FaStar className='text-yellow-500' />
        <span className='text-zinc-400 font-bold'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
        <span className='text-zinc-400 font-bold'>| {original_language} |</span>
        <span className='text-zinc-400 font-bold'>{release_date ? release_date.split('-')[0] : 'N/A'}</span>
      </div>
    </div>
  )
}

export default MovieCard
