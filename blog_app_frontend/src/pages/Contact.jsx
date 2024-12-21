import React from 'react'

const Contact = () => {
    return (
        <>
            <h1 className='max-w-[1250px] mx-auto font-bold text-2xl text-center tracking-widest pt-16'>
                CONTACT US
            </h1>
            <p className='text-lg max-w-[400px] py-5 text-gray-500 mx-auto text-center'>
                Hey we are located in India. Feel free to use the contact form to the right to reach out to us.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1050px] mx-auto py-10'>
                <div>
                    <h2 className="font-semibold text-xl mb-3">PHONE SUPPORT</h2>
                    <p className="mb-4 text-gray-500">+91 123 456 7890</p>
                    <h2 className="font-semibold text-xl mb-3 mt-10">ELECTRONIC MAIL</h2>
                    <p className='text-gray-500'>support@example.com</p>
                </div>
                <div>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="w-full p-2 rounded mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="w-full p-2  rounded mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                placeholder="Your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="phone">Phone Number</label>
                            <input 
                                type="number" 
                                id="phone" 
                                className="w-full p-2  rounded mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                placeholder="Your phone number"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                className="w-full p-2  rounded mt-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                placeholder="Your message"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded mt-4">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact
