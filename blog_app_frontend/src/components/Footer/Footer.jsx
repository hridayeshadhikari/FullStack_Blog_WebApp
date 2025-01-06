import React from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className='max-w-screen bg-[#222222] text-white font-semibold'>
                <div className='max-w-[1250px] mx-auto p-12'>
                    <div className='grid md:grid-cols-4 grid-cols-1 gap-10'>
                        <div>
                            <h1 className='text-white font-extrabold text-4xl py-2'>WRITE<span className='text-orange-500'>UP</span></h1>

                            <p ><EmailIcon /> writeup@gmail.com</p>
                            <p className='py-2'><LocalPhoneIcon /> 9568842385</p>
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
                        <div className='flex flex-col pl-0 md:pl-12'>
                            <h1 className='pt-2 pb-4 text-xl font-semibold '>Other Pages</h1>
                            <Link to={'/about-us'} className='pb-2 font-thin  text-gray-300'>About us</Link>
                            <Link to={'/privacy-policy'} className='pb-2 font-thin text-gray-300'>Privacy Policy</Link>
                            <Link to={'/contact'} className='pb-2 font-thin  text-gray-300'>Contact us</Link>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='pt-2 pb-4 text-xl font-semibold'>Our contacts</h1>
                            <p className='pb-8 font-thin text-gray-300'>Writeup Web Solutions
                                , Uttarakhand India.</p>

                            <p className='font-thin text-gray-300'>email us : contact@writeup.com</p>
                        </div>
                        <div className='flex flex-col mt-12 space-y-6'  >
                            <img className='h-12' src="https://img.setka.io/clients/D3SuW9_Vtk6NhYeFXfduUy55A4Dromkt/post_images/tiny-logo-2022071511014423.svg" alt="" />
                            <img src="https://www.drupal.org/files/project-images/logo_191.png" alt="" />

                        </div>
                    </div>
                </div>
                <div className='bg-[#333333] text-sm py-2 font-normal text-center'>
                    <p>@2024 writeup</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
