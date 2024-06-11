'use client'

import { useReducer } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import RecoverPasswordForm from '@/components/auth/RecoverPasswordForm';
import { FormTypes } from '@/enums/FormTypes';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';


const activeFormReducer = (state: FormTypes, action: FormTypes) => {
  if (state !== action){
    return action
  }
  return state
}


export default function Login() {
  const [activeForm, dispatchActiveForm] = useReducer(activeFormReducer, FormTypes.Login)

  const renderForm = () => {
    switch (activeForm) {
      case FormTypes.Login:
        return <LoginForm dispatchActiveForm={dispatchActiveForm} />
      case FormTypes.Register:
        return <RegisterForm />
      case FormTypes.Recover:
        return <RecoverPasswordForm dispatchActiveForm={dispatchActiveForm}/>
    }
  }


  const getClassesForTabButton = (formType: FormTypes): string => {
    if (formType === activeForm){
      return 'border-blue-500 text-blue-500'
    }
    return 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
  }

  return <div className="w-full sm:max-w-xl mt-6 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
    <div className="text-center text-2xl mt-4 text-gray-600">
      Sign in to RepID service
    </div>

    <SocialLoginButtons />

    <div className="mb-6 mt-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex auth_nav" aria-label="Tabs">
          <button type="button" onClick={() => dispatchActiveForm(FormTypes.Login)}
            className={"cursor-pointer basis-1/2 text-center whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium " + getClassesForTabButton(FormTypes.Login)}
            data-tab="auth_login">Login with Email
          </button>
          <button type="button" onClick={() => dispatchActiveForm(FormTypes.Register)}
            className={"cursor-pointer basis-1/2 text-center whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium " + getClassesForTabButton(FormTypes.Register)}
            data-tab="auth_register">Register
          </button>
        </nav>
      </div>
    </div>

    <div className="email_form">
      { renderForm() }
    </div>

    <div className="flex pl-8 pr-8 gap-4 mt-6">
      <div>
        <svg width="44" height="50" viewBox="0 0 44 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.875 0L0 6.65285V7.8125C0 20.6833 0.285929 28.2552 3.21656 34.2163C6.1472 40.1774 11.5729 44.0375 21.0938 49.5484L21.875 50L22.6562 49.5484C32.1771 44.0375 37.6028 40.1774 40.5335 34.2163C43.4641 28.2552 43.75 20.6833 43.75 7.8125V6.65285L21.875 0ZM32.3181 12.7381C35.1681 12.6568 36.6324 16.1156 34.5886 18.1031L18.3167 34.375L9.2346 25.2929C6.16585 22.3492 10.7098 17.8053 13.6536 20.874L18.3167 25.5371L30.1697 13.6841C30.7357 13.1015 31.5063 12.7622 32.3181 12.7381Z"
            fill="#4E9A06"/>
        </svg>
      </div>
      <div className="text-gray-600 text-sm">
        <div>By signing in I agree to <a className="underline"
                                         href="https://reshim.org/files/privacy_notice/Community_Of_Change_Privacy_Notice_eng.pdf"
                                         target="_blank">Community of Change z.s. privacy policy</a></div>
        <div className="text-xs">Community of Change z.s. is a nonprofit organisation developing RepID and online
          platforms connected with it
        </div>
      </div>
    </div>
  </div>
}