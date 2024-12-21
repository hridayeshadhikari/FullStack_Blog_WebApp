
import React, { useEffect } from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Sidebar from '../components/sidebar/Sidebar';
import SearchBox from '../components/search/SearchBox';
import Trending from '../components/Trending/Trending';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getLatestPost, getPopularPost, searchPost } from '../store/postSlice';
import HomePostCard from '../components/HomePostCard';

const SearchResultPage = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const { searchResult ,latestPost,popularPost} = useSelector((state) => state.post)

    const decodeQueryString = decodeURIComponent(location.search)
    const searchParams = new URLSearchParams(decodeQueryString)
    const title = searchParams.get('title')
    const page = searchParams.get('page') || 1

    const reqData = {
        title: title,
        page
    }

    useEffect(() => {
        dispatch(searchPost(reqData))
        dispatch(getLatestPost())
        dispatch(getPopularPost())
    }, [page, title])


    // const { searchResult } = useSelector((state) => state.searchResult)

    // console.log("yyyy", searchResult);


    return (
        <div className="py-10 max-w-[380px] md:max-w-[700px] lg:max-w-[1250px] mx-auto grid md:grid-cols-[1.5fr_.8fr_.8fr] gap-8 ">

            <div>
                <div className='bg-white mb-8 p-4 text-xl text-gray-800 text-center'>
                    <h1>Search Result for : <span className='text-blue-500 font-bold'>{title}</span></h1>
                </div>
                <div>
                    {
                        searchResult?.content?.map((item) => <HomePostCard key={item.title} post={item} />)
                    }
                </div>
            </div>
            <div>
                <Sidebar latestPost={latestPost}/>
            </div>
            <div>
                <SearchBox />
                <Trending popularPost={popularPost}/>
            </div>
        </div>
    )
}

export default SearchResultPage
