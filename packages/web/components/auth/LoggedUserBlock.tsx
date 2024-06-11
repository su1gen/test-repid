import { LoggedUserProps, LoginResponse } from '@/app/types';
import { FormEvent, useState, useRef } from 'react';
import axiosInstance from '@/helpers/axiosInstance';
import { apiRoutes } from '@/app/routes';
import Cookies from 'js-cookie';
import { useUserContext } from '@/context/UserContextProvider';
import { useOnClickOutside } from 'usehooks-ts'

export function LoggedUserBlock({ id, name }: LoggedUserProps) {
  const { user, setUser } = useUserContext()
  const [isPopupOpened, setIsPopupOpened] = useState(false)
  const ref = useRef(null)

  const handleProfileButtonClick = () => {
    setIsPopupOpened(!isPopupOpened)
  }

  useOnClickOutside(ref, handleProfileButtonClick)

  const handleLogoutEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await axiosInstance().post<LoginResponse>(apiRoutes.auth.logout)
    Cookies.remove(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME!)
    setUser(null)
  }

  return <div>
    <div className="relative">
      <div>
        <button type="button" onClick={handleProfileButtonClick}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
          <div>{name}</div>

          <div className="ml-1">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
            </svg>
          </div>
        </button>
      </div>
      {isPopupOpened &&
          <div ref={ref} className="absolute z-50 mt-2 w-48 rounded-md shadow-lg origin-top-right right-0">
              <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white">
                {/*<a*/}
                {/*  className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"*/}
                {/*  href="https://repid.org/profile">Profile</a>*/}

                  <form method="POST" onSubmit={handleLogoutEvent}>
                      <button type="submit"
                          className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >Log Out</button>
                  </form>
              </div>
          </div>
      }
    </div>
  </div>
}