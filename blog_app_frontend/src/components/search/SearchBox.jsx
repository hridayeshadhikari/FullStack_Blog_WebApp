import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {

  const handleSearch=(value)=>{
      console.log(value);
      
  }
  return (
    <div className='bg-white mb-4'>
      <h1 className='font-bold text-lg  p-2 bg-blue-500 text-white'>Live Search</h1>
            <div className='flex p-4'>
                <input onSubmit={(e)=>handleSearch(e.target.value)} className='p-2 bg-gray-200 font-bold w-full md:w-auto rounded-l-md border-2 border-gray-300 outline-none focus:border-blue-500' type="search" placeholder='Search' />
                <div className='bg-blue-300 w-full md:w-10 flex justify-center items-center rounded-r-md'>
                    <SearchIcon sx={{ color: 'white' }} />
                </div>
            </div>
    </div>
  )
}

export default SearchBox
