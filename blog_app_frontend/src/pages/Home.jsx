import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Trending from '../components/Trending/Trending'
import HomePostCard from '../components/HomePostCard'
import SearchBox from '../components/search/SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from '../store/postSlice'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate, useParams } from 'react-router-dom'


const Home = () => {

    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.post)

    const param =useParams()
    const navigate=useNavigate()
    const location= useLocation()

    const decodeQueryString=decodeURIComponent(location.search)
    const searchParams=new URLSearchParams(decodeQueryString)

    const pageNumber = searchParams.get("page") || 1;

    const handlePaginationChange = (event, value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", value);
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
        window.scrollTo({
            top: 0,
            behavior: 'instant',  
        });
    };

    useEffect(() => {
        dispatch(getAllPost(pageNumber))
    }, [pageNumber])

    console.log("a====>", posts);

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
                            posts?.content?.map((post) => <HomePostCard key={post.title} post={post} />)
                        }
                        <div className='flex justify-center py-10'>
                            <Stack spacing={2}>
                                <Pagination count={posts.totalPages} onChange={handlePaginationChange} variant="outlined" shape="rounded" />
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
                        <img className='h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="" alt="" />
                        <p className='font-bold text-xl text-center my-4'>REACT JS</p>
                    </div>
                    <div className='basis-[25%]'>
                        <img className='h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="https://images-cdn.openxcell.com/wp-content/uploads/2024/07/25070933/springboot-inner.svg" alt="" />
                        <p className='font-bold text-xl text-center my-4'>SPRING BOOT</p>
                    </div>
                    <div className='basis-[25%]'>
                        <img className='h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="" alt="" />
                        <p className='font-bold text-xl text-center my-4'>MY SQL</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
