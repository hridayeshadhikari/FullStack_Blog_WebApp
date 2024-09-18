import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Trending from '../components/Trending/Trending'
import HomePostCard from '../components/HomePostCard'
import SearchBox from '../components/search/SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from '../store/postSlice'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Home = () => {

    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(getAllPost())
    }, [])

    console.log("====>", posts);

    return (
        <div className='bg-gray-100'>
            <div className='py-10 max-w-[1250px] mx-auto'>
                <div className='grid grid-cols-[.8fr_2fr_.8fr] gap-x-6'>
                    <div>
                        <Trending />
                    </div>
                    <div>
                        <div className='bg-blue-500 py-[22px] w-full'>

                        </div>
                        {
                            posts.map((post) => <HomePostCard key={post.title} post={post} />)
                        }
                        <div className='flex justify-center py-10'>
                            <Stack spacing={2}>
                                <Pagination count={10} variant="outlined" shape="rounded" />
                            </Stack>
                        </div>
                    </div>
                    <div>
                        <SearchBox />
                        <Sidebar />
                    </div>
                </div>
                <h1 className='font-bold text-2xl border-b-[1px] pb-5'>EXPLORE BY</h1>
                <div className='grow flex md:flex-row flex-col my-5'>
                    <div className='basis-[25%]'>
                        <img className='h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="https://cdn-icons-png.freepik.com/512/3664/3664988.png" alt="" />
                        <p className='font-bold text-xl text-center my-4'>JAVA</p>
                    </div>
                    <div className='basis-[25%]'>
                        <img className='h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="data:image/png;base64,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" alt="" />
                        <p className='font-bold text-xl text-center my-4'>REACT JS</p>
                    </div>
                    <div className='basis-[25%]'>
                        <img className='h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="https://images-cdn.openxcell.com/wp-content/uploads/2024/07/25070933/springboot-inner.svg" alt="" />
                        <p className='font-bold text-xl text-center my-4'>SPRING BOOT</p>
                    </div>
                    <div className='basis-[25%]'>
                        <img className='h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="data:image/png;base64,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" alt="" />
                        <p className='font-bold text-xl text-center my-4'>MY SQL</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
