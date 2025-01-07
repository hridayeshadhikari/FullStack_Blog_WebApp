import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = ({ latestPost }) => {


    return (

        <div className='bg-white mt-4 md:mt-0'>

            <h1 className='font-bold text-lg mb-5 p-2 bg-blue-500 text-white'>Recent Post</h1>
            {
                latestPost?.map((item) => (
                
                    <div key={item?.postId} className='p-3 '>
                        <div className='border-b-2'>
                            <Link to={`/post/${item.postId  }`} className='font-semibold leading-normal hover:text-blue-600'>{item.title}</Link>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default Sidebar
