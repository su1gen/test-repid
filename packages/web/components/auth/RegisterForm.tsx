import TextInput from '@/components/auth/TextInput';
import { ChangeEvent, FormEvent, useState } from 'react';
import { RegisterData } from '@/app/types';
import { apiRoutes } from '@/app/routes';
import axiosInstance from '@/helpers/axiosInstance';
import Cookies from 'js-cookie';
import { useUserContext } from '@/context/UserContextProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegisterForm() {
  let { user, setUser } = useUserContext()
  let router = useRouter()
  let [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const changeState = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleRegisterUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await axiosInstance({withJWT: false}).post(apiRoutes.auth.register, registerData)
    Cookies.set(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME!, response.data.accessToken)
    setUser({id: response.data.id, name: response.data.name})
    toast.success('You have successfully registered')
    router.push('/')
  }

  return <form id="auth_register" className="flex flex-col gap-4" onSubmit={handleRegisterUser}>
    <TextInput id={'register_name'} labelText={'Name'} type={'text'} name={'name'} onChange={changeState}
               required={true} autoFocus={true} autoComplete={'name'} />
    <TextInput id={'register_email'} labelText={'Email'} type={'email'} name={'email'} onChange={changeState}
               required={true} autoComplete={'username'} />
    <TextInput id={'register_password'} labelText={'Password'} type={'password'} name={'password'} onChange={changeState}
               required={true} autoComplete={'new-password'} />
    <TextInput id={'password_confirmation'} labelText={'Confirm Password'} type={'password'} name={'password_confirmation'} onChange={changeState}
               required={true} autoComplete={'new-password'} />

    <div className="flex items-center justify-end mt-4">
      <button type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ml-4">
        Register
      </button>
    </div>
  </form>
}