'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import peninhand from '../../asset/peninhand.png'
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromToken, logout } from '../../store/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';



const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Category', href: '/category', current: false },
  { name: 'Create Post', href: '/create-post', current: false },
  { name: 'Contact', href: '/contact', current: false },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.isLoginSuccess);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCreatePostClick = () => {
    if (user) {
      navigate('/create-post');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    dispatch(getUserFromToken());
  }, [authStatus]);


  return (
    <header className="bg-blue-600">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-2 py-0.5 lg:px-8">
        <div className="flex lg:flex-1">
          <div className="flex flex-shrink-0 items-center">
            <h1 className='font-bold text-white text-4xl'>Write<span className='text-orange-600'>Up</span></h1>
            <img className="pt-3 h-[60px] w-[55px] mx-auto mb-5" src={peninhand} alt="" />
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <ul className="flex space-x-6 text-lg font-semibold">

            {navigation.map((item) => (
              <li key={item.name}>
                {item.name === 'Create Post' ? (
                  <button
                    onClick={handleCreatePostClick}
                    className="text-white hover:text-orange-500"
                  >
                    {item.name}
                  </button>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `${isActive ? "text-orange-500" : "text-white"} hover:text-orange-500`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
            user ? (<button onClick={() => handleLogout()} className='bg-green-500 p-2 px-4 rounded-lg text-white font-semibold'>
              Logout
            </button>) : (
              <button onClick={() => navigate("/login")} className='bg-green-500 p-2 px-4 rounded-lg text-white font-semibold'>
                Login
              </button>)
          }
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-blue-600 px-2 py-0.5 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="flex flex-shrink-0 items-center">
              <h1 className='font-bold text-white text-4xl'>Write<span className='text-orange-600'>Up</span></h1>
              <img className="pt-3 h-[60px] w-[55px] mx-auto mb-5" src={peninhand} alt="" />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <ul className="space-y-6 text-lg font-semibold">
                  {navigation.map((item) => (
                    <li key={item.name}>

                      {
                        item.name === 'Create Post' ? (
                          <button
                            onClick={() => { handleCreatePostClick(); setMobileMenuOpen(false) }}
                            className="text-white hover:text-orange-500"
                          >
                            {item.name}
                          </button>
                        ) : (
                          <NavLink
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              `${isActive ? "text-orange-500" : "text-white"} hover:text-orange-500`
                            }
                          >
                            {item.name}
                          </NavLink>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-6 ">
                {user ? (
                  <a
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:text-orange-500"
                  >
                    Log out
                  </a>
                ) : (
                  <a
                    onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:text-orange-500"
                  >
                    Log in
                  </a>
                )}
              </div>

            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

