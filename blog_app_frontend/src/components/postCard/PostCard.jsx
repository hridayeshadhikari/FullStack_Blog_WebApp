import React from 'react'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {
    return (
        <div className='bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.15)] rounded-md p-4'>
            <img className='w-full h-40 mb-3' src={post.featuredImage} alt="" />
            <Link to={`/post/${post.postId}`} className='font-bold text-xl hover:text-blue-600 cursor-pointer'>{post.title}</Link>
            <p className='text-sm text-gray-500 mt-2 pb-1'>{parse(post.content.split(' ').slice(0, 15).join(' '))}</p>
            <Link to={`/post/${post.postId}`} className='text-sm'>Read more...</Link>
        </div>
    )
}

export default PostCard
