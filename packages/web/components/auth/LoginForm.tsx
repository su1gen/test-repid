import { ChangeEvent, FormEvent, useState } from 'react';
import TextInput from '@/components/auth/TextInput';
import { LoginData, LoginFormProps, LoginResponse } from '@/app/types';
import { apiRoutes } from '@/app/routes';
import { FormTypes } from '@/enums/FormTypes';
import axiosInstance from '@/helpers/axiosInstance';
import Cookies from 'js-cookie'
import { useUserContext } from '@/context/UserContextProvider';
import { useRouter } from 'next/navigation';



export default function LoginForm({dispatchActiveForm}: LoginFormProps) {
  let { user, setUser } = useUserContext()
  let router = useRouter()
  let [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
    remember: false
  })

  const changeState = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleLoginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await axiosInstance().post<LoginResponse>(apiRoutes.auth.loginCredentials, loginData)
    // console.log(response)
    Cookies.set(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME!, response.data.accessToken)
    setUser({id: response.data.id, name: response.data.name})
    router.push('/')
  }

  const handleLoginStatus = async () => {
    // const response = await axiosInstance().get(apiRoutes.auth.status)
    const response = await axiosInstance().get(apiRoutes.auth.session)
    console.log(response.data)
  }

  return <form id="auth_login" className="flex flex-col gap-4" onSubmit={handleLoginUser}>

    <TextInput id={'auth_email'} labelText={'Email'} type={'email'} name={'email'} onChange={changeState}
               required={true} autoFocus={true} autoComplete={'username'} />
    <TextInput id={'auth_password'} labelText={'Password'} type={'password'} name={'password'} onChange={changeState}
               required={true} autoComplete={'current-password'} />

    <div className="flex items-center justify-end mt-4">
      <button type="button"
              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => dispatchActiveForm(FormTypes.Recover)}
      >
        Forgot your password?
      </button>
      <button type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-400 border border-transparent rounded-md
                    font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700
                    active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    transition ease-in-out duration-150 ml-3">
        Log in
      </button>
      <button type="button" onClick={handleLoginStatus}
              className="inline-flex items-center px-4 py-2 bg-blue-400 border border-transparent rounded-md
                    font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700
                    active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    transition ease-in-out duration-150 ml-3">
        Check status
      </button>
    </div>
  </form>
}