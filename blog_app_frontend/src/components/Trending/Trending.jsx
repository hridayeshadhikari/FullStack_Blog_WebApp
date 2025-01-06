import React from 'react'
import { Link } from 'react-router-dom'

const Trending = ({ popularPost }) => {

    // console.log("pppp",popularPost);
    
    return (
        <div className='bg-white justify-center md:justify-end'>

            <h1 className='font-bold text-lg mb-5 p-2 bg-blue-500 text-white'>Popular Post</h1>
            {
                popularPost?.map((item) => 
                    (<div className='p-3 '>
                        <div className='border-b-2'>
                            <Link to={`/post/${item.postId}`} className='font-semibold leading-normal hover:text-blue-600'>{item.title}</Link>
                        </div>
                    </div>)    
                )
            }

        </div>
    )
}

export default Trending
