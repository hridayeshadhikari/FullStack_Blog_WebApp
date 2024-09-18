import React, { useEffect } from 'react'
import PostForm from '../components/postForm/PostForm'
import { useDispatch,useSelector } from 'react-redux'
import { getPostById } from '../store/postSlice'
import { useParams } from 'react-router-dom'

const EditPost = () => {

    const postId=useParams()
    const dispatch=useDispatch()
    const post=useSelector(state=>state.post.singlePost)

    useEffect(()=>{
        dispatch(getPostById(postId))
    })

    // console.log("post ====>",post);
    
  return (
    <div className='max-w-[1250px] mx-auto py-10'>
      <PostForm post={post}/>
    </div>
  )
}

export default EditPost
