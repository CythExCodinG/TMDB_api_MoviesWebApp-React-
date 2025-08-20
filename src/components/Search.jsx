import React from 'react'
import { FaSearch } from "react-icons/fa";



const Search = ({ moviename, setmoviename }) => {
  return (
    <div className='flex items-center justify-center w-full mt-6'>
      <div className=' w-4/5 lg:w-2/5 md:w-3/5 flex items-center border-1 rounded-lg justify-center gap-2 px-4 py-2 bg-gray-900'>
        <FaSearch
          className='text-zinc-500 text-md lg:text-xl md:text-lg' />
        <input className='w-full px-1 border-none outline-none h-[1.8rem] md:h-[2rem] lg:h-[2.5rem] text-sm lg:text-lg text-white tracking-wide font-bold rounded-lg' type="text" value={moviename} onChange={(e) => setmoviename(e.target.value)} placeholder='Search through thousands of movies' />
      </div>
    </div>
  )
}

export default Search