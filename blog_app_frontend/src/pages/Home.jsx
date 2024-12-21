import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Trending from '../components/Trending/Trending'
import HomePostCard from '../components/HomePostCard'
import SearchBox from '../components/search/SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost, getLatestPost, getPopularPost } from '../store/postSlice'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer, Bounce } from 'react-toastify'


const Home = () => {

    const dispatch = useDispatch()
    const { posts, latestPost, popularPost } = useSelector((state) => state.post)
    useEffect(() => {
        const loginSuccess = localStorage.getItem("loginSuccess")
        if (loginSuccess === 'true'){
            toast.success('Login Success')
            setTimeout(() => {
                localStorage.removeItem('loginSuccess');
            }, 1000);
        }
    }, [])

    // console.log("llll",latestPost );
    // console.log("pppp",popularPost );

    const navigate = useNavigate()
    const location = useLocation()

    const decodeQueryString = decodeURIComponent(location.search)
    const searchParams = new URLSearchParams(decodeQueryString)

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
        dispatch(getLatestPost())
        dispatch(getPopularPost())
    }, [pageNumber])

    // console.log("a====>", posts);

    const handleNavigate = (category) => {
        navigate(`/category?name=${encodeURIComponent(category)}`)
    }

    return (
        <div className='bg-gray-100'>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className='py-10 max-w-[1250px] mx-auto'>
                <div className='grid  md:grid-cols-[.8fr_2fr_.8fr] grid-cols-1 gap-x-6 gap-y-6'>
                    <div className='order-3 md:order-1 w-[380px] md:w-full mx-auto'>
                        <Trending popularPost={popularPost} />
                    </div>
                    <div className='order-1 md:order-2'>
                        <div className='bg-blue-500 py-[22px] md:w-full w-[380px] mx-auto'>

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
                    <div className='order-2 md:order-3 md:w-full w-[380px] mx-auto'>
                        <SearchBox />
                        <Sidebar latestPost={latestPost} />
                    </div>
                </div>
                <h1 className='font-bold text-2xl border-b-[1px] pb-5 mt-8'>EXPLORE BY</h1>
                <div className='grow flex md:flex-row flex-col my-5'>
                    <div className='basis-[25%]'>
                        <img onClick={() => handleNavigate("Programming")} className='h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="https://cdn-icons-png.flaticon.com/512/1485/1485286.png" alt="" />
                        <p className='font-bold text-xl text-center my-4'>Programming</p>
                    </div>
                    <div className='basis-[25%]'>
                        <img onClick={() => handleNavigate("Education")} className='h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="https://cdn-icons-png.flaticon.com/512/3778/3778120.png" alt="" />
                        <p className='font-bold text-xl text-center my-4'>Education</p>
                    </div>
                    <div className='basis-[25%]'>
                        <img onClick={() => handleNavigate("Sports")} className='h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="https://cdn-icons-png.flaticon.com/512/8855/8855089.png" alt="" />
                        <p className='font-bold text-xl text-center my-4'>Sports</p>
                    </div>
                    <div className='basis-[25%]'>
                        <img onClick={() => handleNavigate("Gaming")} className='bg-gray-100 h-[150px] w-[150px] mx-auto hover:scale-110 duration-500' src="https://cdn-icons-png.flaticon.com/512/2946/2946159.png" alt="" />
                        <p className='font-bold text-xl text-center my-4'>Gaming</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
