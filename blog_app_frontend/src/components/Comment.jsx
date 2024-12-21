import { Avatar } from '@mui/material'
import React from 'react'

const Comment = ({comment}) => {
    const createdAtDate = new Date(comment.createdAt);
    const currentDate = new Date();
    const timeDifferenceMs = currentDate - createdAtDate;
    const daysDifference = timeDifferenceMs / (1000 * 60 * 60 * 24);
    const daysPassed = Math.round(daysDifference);
  return (
    <>
      <div className="flex items-start space-x-4">
        <Avatar /> 
        
        <div className="p-2 px-4 rounded-2xl bg-gray-300 ">
            <h1 className="font-semibold">{comment.user.firstName} {comment.user.lastName} <span className='font-normal text-sm text-gray-600'>{daysPassed} days ago</span></h1>
            <p className='text-gray-600'>{comment.title}</p>
        </div>
      </div>
    </>
  )
}

export default Comment;
