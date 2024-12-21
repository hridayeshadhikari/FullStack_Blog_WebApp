import React from 'react'
import PostForm from '../components/postForm/PostForm'
import { useLocation } from 'react-router-dom'

const EditPost = () => {

    const location = useLocation();
    const { post } = location.state || {};
  
  return (
    <div className='max-w-[1250px] mx-auto py-10'>
      <PostForm post={post}/>
    </div>
  )
}

export default EditPost
