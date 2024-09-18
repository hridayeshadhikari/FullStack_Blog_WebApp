import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import PostCard from '../components/postCard/PostCard'

const CategoryPage = () => {

    const post = [
        {
            name: "java"
        },
        {
            name: "java script"
        },
        {
            name: "js"
        },
        {
            name: "HTML"
        }
    ]

    return (
        <>
            <div className='max-w-screen bg-gray-200'>
                <div className='max-w-[350px] md:max-w-[1130px] mx-auto'>
                    <h1 className='font-semibold text-3xl py-4'>Category: Programming</h1>
                </div>
            </div>
            <div className='max-w-[350px] md:max-w-[1130px] mx-auto'>
                <div className='grid md:grid-cols-[70%_30%] grid-cols-1 gap-6'>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-6 my-5'>

                        {
                            post.map((item) => <PostCard key={item.name}/>)
                        }
                    </div>
                    <div className='my-5'><Sidebar /></div>
                </div>
            </div>
        </>
    )
}

export default CategoryPage
