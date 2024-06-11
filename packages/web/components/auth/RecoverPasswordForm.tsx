import { ChangeEvent, FormEvent, useState } from 'react';
import { LoginFormProps, LoginResponse, RecoverData } from '@/app/types';
import axiosInstance from '@/helpers/axiosInstance';
import { apiRoutes } from '@/app/routes';
import { toast } from 'sonner';
import { FormTypes } from '@/enums/FormTypes';

export default function RecoverPasswordForm({dispatchActiveForm}: LoginFormProps) {
  let [recoverData, setRecoverData] = useState<RecoverData>({
    email: '',
  })

  const changeState = (e: ChangeEvent<HTMLInputElement>) => {
    setRecoverData({
      email: e.target.value.trim()
    })
  }

  const handleRecoverPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axiosInstance().post<LoginResponse>(apiRoutes.auth.recover, recoverData)
    dispatchActiveForm(FormTypes.Login)
    toast.success('We have emailed your password reset link')
  }

  return <form id="forgot_password" action="" onSubmit={handleRecoverPassword}>
    <div>
      <label className="block font-medium text-sm text-gray-700" htmlFor="forgot_password_email">
        Email
      </label>
      <input onChange={changeState}
        className="border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded-md shadow-sm block mt-1 w-full"
        id="forgot_password_email" type="email" name="email" required={true} autoFocus={true}/>
    </div>
    <div className="flex items-center justify-end mt-4">
      <button type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
        Email Password Reset Link
      </button>
    </div>
  </form>
}