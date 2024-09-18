import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromToken, logout } from '../../store/authSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import peninhand from '../../asset/peninhand.png'
import { useEffect } from 'react';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Category', href: '/category', current: false },
  { name: 'Post', href: 'post', current: false },
  { name: 'Create Post', href: '/create-post', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Header() {
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.isLoginSuccess)
  const { user } = useSelector(state => state.auth)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)



  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(getUserFromToken())
  }, [authStatus])

  return (
    <Disclosure as="nav" className="bg-blue-600">
      <div className="mx-auto max-w-[1250px] px-2 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <MenuIcon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <CloseIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
            <div className="flex flex-shrink-0 items-center">
              <h1 className='font-bold text-white text-4xl'>Write<span className='text-orange-600'>Up</span></h1>
              <img className="pt-3 h-[80px] w-[70px] mx-auto mb-5" src={peninhand} alt="" />
            </div>
            <div className="hidden sm:ml-6 md:ml-0 my-auto sm:block">
              <ul className="flex space-x-6 text-lg font-semibold">
                {navigation.map((item) => (

                  <li key={item.name}>
                    <NavLink to={item.href}
                      className={({ isActive }) =>
                        `${isActive ? "text-orange-500" : "text-white"} hover:text-orange-500`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


              {/* Profile dropdown */}
              {user && user ? <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu> : <button onClick={() => navigate("/login")} className='bg-green-500 p-2 px-4 rounded-lg text-white font-semibold'>Login</button>}
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
