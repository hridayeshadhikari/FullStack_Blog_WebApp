import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { searchPost } from '../../store/postSlice';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {

  const dispatch = useDispatch()
  const [inputData,setInputData]=useState('')
  const [page, setPage] = useState(1)
  const navigate=useNavigate()

  const handleSearch = (value) => {

    const reqData = {
      title: value,
      page
    }

    // dispatch(searchPost(reqData))
    navigate(`/search?title=${reqData.title}&page=${reqData.page}`)
    console.log(value);
  }
  return (
    <div className='bg-white mb-4'>
      <h1 className='font-bold text-lg  p-2 bg-blue-500 text-white'>Live Search</h1>
      <div className='flex p-4'>
        <input onChange={(e) => setInputData(e.target.value)} className='p-2 bg-gray-200 font-bold w-full md:w-auto rounded-l-md border-2 border-gray-300 outline-none focus:border-blue-500' type="search" placeholder='Search' />
        <div onClick={()=>handleSearch(inputData)} className='bg-blue-300 w-full md:w-10 flex justify-center items-center rounded-r-md'>
          <SearchIcon sx={{ color: 'white' }} />
        </div>
      </div>
    </div>
  )
}

export default SearchBox
