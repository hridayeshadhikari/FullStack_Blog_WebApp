
import React from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Sidebar from '../components/sidebar/Sidebar';
import SearchBox from '../components/search/SearchBox';
import Trending from '../components/Trending/Trending';

const SearchResultPage = () => {
  return (
    <div className="py-10 max-w-[380px] md:max-w-[700px] lg:max-w-[1250px] mx-auto grid md:grid-cols-[1.5fr_.8fr_.8fr] gap-8 ">
            <div className='bg-white'>
                <div className="w-full flex justify-center mb-4 relative  p-2 ">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYGWNMGvnJomHJ7vegON0KrztBB8q9WsBDdg&s"
                        alt=""
                        className="rounded-xl h-[25rem]"
                    />

                    
                        
                </div>
                <div className="max-w-[700px] mx-auto mb-6 p-10 pt-0 pb-2">
                    <h1 className="text-4xl font-bold">nice</h1>
                    <p className="mt-2 text-end text-sm">written by <u className='text-gray-400 underline decoration-blue-600 underline-offset-4 decoration-[1.5px]'>harry</u></p>
                    <div className="browser-css mt-8 ">
                        <p className="text-gray-600 font-medium">excellentr</p>
                    </div>
                    <div className='space-x-4 flex mt-4'>
                        <p className='text-blue-600'><ThumbUpOffAltIcon />10</p>
                        <p className='text-red-500'><ThumbDownOffAltIcon />10</p>
                    </div>
                </div>

            </div>
            <Sidebar />
            <div>
            <SearchBox/>
            <Trending/>
            </div>
        </div>
  )
}

export default SearchResultPage
