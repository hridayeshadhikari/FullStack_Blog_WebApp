import React from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Footer = () => {
    return (
        <div>
            <footer className='max-w-screen bg-[#222222] text-white font-semibold'>
                <div className='max-w-[1250px] mx-auto p-12'>
                    <div className='grid md:grid-cols-4 grid-cols-1 gap-10'>
                        <div>
                            <h1 className='text-white font-extrabold text-4xl py-2'>WRITE<span className='text-orange-500'>UP</span></h1>
                            
                            <p ><EmailIcon/> codecraft@gmail.com</p>
                            <p className='py-2'><LocalPhoneIcon/> 9568842385</p>
                            <div className='flex'>
                                <ul className='list-none p-0 m-0 flex '>
                                    <li>
                                        <a
                                            href="/a"
                                            className='h-12 w-12 bg-blue-700 flex items-center justify-center text-white'
                                        >
                                            <FacebookIcon />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/a"
                                            className='h-12 w-12 bg-red-600 flex items-center justify-center text-white'
                                        >
                                            <YouTubeIcon />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/a"
                                            className='h-12 w-12 bg-black flex items-center justify-center text-white'
                                        >
                                            <XIcon />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/a"
                                            className='h-12 w-12 bg-pink-500 flex items-center justify-center text-white'
                                        >
                                            <InstagramIcon />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='pl-2 pt-2 pb-4 text-xl font-semibold'>Programs</h1>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> divide the number?</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two?</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='pt-2 pb-4  pl-2 text-xl font-semibold'>Java</h1>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                        </div>
                        <div className='flex flex-col'  >
                            <h1 className='pt-2 pb-4  pl-2 text-xl font-semibold'>Spring Boot</h1>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                            <a href="/a" className='pb-3 font-thin text-xl text-gray-300'><ArrowRightIcon/> Sum of two numbers</a>
                        </div>
                    </div>
                </div>
                <div className='bg-[#333333] text-sm py-2 font-normal text-center'>
                    <p>@2020 codecraft</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
