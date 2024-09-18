import React from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import parse from 'html-react-parser'
import { Link, useNavigate } from 'react-router-dom';
import { disLikePost, likePost } from '../store/postSlice';
import { useDispatch } from 'react-redux';

const HomePostCard = ({ post }) => {
    // console.log("----->",post);
    const navigate=useNavigate()
    const createdAtDate = new Date(post.postDate);
    const currentDate = new Date();
    const timeDifferenceMs = currentDate - createdAtDate;
    const daysDifference = timeDifferenceMs / (1000 * 60 * 60 * 24);
    const daysPassed = Math.round(daysDifference);
    const dispatch=useDispatch()

    const handleLikePost=(postId)=>{
        dispatch(likePost(postId))
    }
    const handleDisLikePost=(postId)=>{
        dispatch(disLikePost(postId))
    }

    return (
        <div className="bg-white max-w-[380px] md:max-w-[700px] lg:max-w-[1250px] mx-auto ">
            <div className="w-full flex justify-center mb-4 relative">
                <img
                    className='h-[20rem]'
                    src={post.featuredImage}
                    alt=""
                />
            </div>
            <div className="w-full space-y-5 px-10 ">
                <h1 className="text-4xl font-bold hover:text-blue-600">{post.title}</h1>
                <div className='flex justify-between '>
                    <p className='text-gray-400'>written by <u className='underline decoration-blue-600 underline-offset-4 decoration-[1.5px]'>{post.author.firstName + " " + post.author.lastName}</u></p>
                    <div className='space-x-4 flex'>
                        <p className='text-blue-600 hover:text-gray-500'><ThumbUpOffAltIcon onClick={()=>handleLikePost(post.postId)}/>{post.liked?.length}</p>
                        <p className='text-red-500 hover:text-gray-500'><ThumbDownOffAltIcon onClick={()=>handleDisLikePost(post.postId)}/>{post.disliked?.length}</p>
                    </div>
                </div>
                <p className='text-gray-700'>{parse(post.content.split(' ').slice(0, 50).join(' '))}</p>
                <hr />
                <div className='flex justify-between'>
                    <u className='text-gray-400 underline decoration-blue-600 underline-offset-4 decoration-[1.5px] hover:text-blue-600'><Link onClick={()=>navigate(`/post/${post?.postId}`)}>Continue reading</Link></u>
                    <div className='flex'><p className='text-gray-400'>{daysPassed} day ago</p>
                        <ModeCommentIcon className='text-orange-600 ml-5' /><p className='text-gray-400'>{post.comments.length} comments</p>
                    </div>
                </div>

            </div>
            <div className="border-t-4 border-dotted border-blue-500 w-full my-4" />
        </div>
    )
}

export default HomePostCard
