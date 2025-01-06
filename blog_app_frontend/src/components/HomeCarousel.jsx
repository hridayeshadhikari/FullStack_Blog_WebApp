import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 1024, min: 464 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};

const posts = [
    {
        id: '67667e432f53cf2b1c0ae96d',
        title: "java script",
        image: "https://res.cloudinary.com/dyxqdduzl/image/upload/v1734770239/z4hcmamutmgs1ql7nnoe.png",
    },
    {
        id: '6762ef7d9005c47339c87fb8',
        title: "What features are included in Farming Simulator?",
        image: "https://res.cloudinary.com/dyxqdduzl/image/upload/v1734537081/bmmpv6vnag73yav3dkpf.jpg",
    },
    {
        id: '6762f03b9005c47339c87fb9',
        title: "What are the best free flight simulators available?",
        image: "https://res.cloudinary.com/dyxqdduzl/image/upload/v1734537271/csmrixgdgsqitxdikbcg.jpg",
    },
    {
        id: '6762eec89005c47339c87fb7',
        title: "What are the different agents in Valorant?",
        image: "https://res.cloudinary.com/dyxqdduzl/image/upload/v1734536898/lv5pfyuquyr4y1kz7iws.jpg",
    },
    {
        id: '6762ec9c9005c47339c87fb3',
        title: "hyper text markup language (HTML)",
        image: "https://res.cloudinary.com/dyxqdduzl/image/upload/v1734536334/artokjyi4rxrabg9cvos.png",
    },
];

const HomeCarousel = () => {
    return (
        <div className='grid  lg:grid-cols-5 md:grid-cols-4 grid-cols-3 items-start'>

            <div className='lg:col-span-4 col-span-2 md:cols-span-3'>
                <Carousel
                    responsive={responsive}
                    showDots={false}
                    arrows={false}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                >
                    {posts.map((post) => (
                        <div key={post.id} className="relative">
                            <div
                                className="absolute bottom-0 font-bold left-0 w-full text-white text-center p-2"
                                style={{
                                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0) 100%)",
                                }}
                            >
                                <Link to={`/post/${post?.id}`}>{post?.title}</Link>
                            </div>
                            <img className='h-36' src={post.image} alt={post.title} />
                        </div>
                    ))}


                </Carousel>
            </div>

            <div className='font-bold bg-blue-600 text-xl text-white p-10 h-full flex items-center justify-center'>
                Featured Articles
            </div>
        </div>
    );
};

export default HomeCarousel;
