import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import axiosInstance from '@/helpers/axiosInstance';
import { LoginResponse } from '@/app/types';
import { apiRoutes } from '@/app/routes';
import Cookies from 'js-cookie';
import { useUserContext } from '@/context/UserContextProvider';
import { useRouter } from 'next/navigation';
import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth';

export default function SocialLoginButtons() {
  let { user, setUser } = useUserContext()
  let router = useRouter()
  let googleLoginRedirectURL = `${process.env.NEXT_PUBLIC_NEXT_API_URL}/login`

  const handleLoginResponse = (responseData: LoginResponse) => {
    Cookies.set(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME!, responseData.accessToken)
    setUser({id: responseData.id, name: responseData.name})
    router.push('/')
  }


  return <div className="login-modal__social mt-2">
    <div className="login-modal__social-wrapper flex flex-col gap-2">
      <div className="flex items-center justify-center">
        <GoogleLogin
          login_uri={googleLoginRedirectURL}
          shape="pill"
          ux_mode="redirect"
          onSuccess={async credentialResponse => {
            const response = await axiosInstance({withJWT: false})
              .post<LoginResponse>(apiRoutes.auth.loginGoogle, {
                token: credentialResponse.credential
              })

            handleLoginResponse(response.data)
          }}
          onError={() => {
            toast.error('Something wrong with google')
          }}
          useOneTap
        />
      </div>
      <div className="flex items-center justify-center">
        <TLoginButton
          botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME!}
          buttonSize={TLoginButtonSize.Large}
          usePic={false}
          cornerRadius={20}
          onAuthCallback={async (user) => {
            if (!user.id){
              return toast.error('Something wrong with telegram')
            }

            const response = await axiosInstance({withJWT: false})
              .post<LoginResponse>(apiRoutes.auth.loginTelegram, {
                id: user.id,
                name: user.first_name
              })

            handleLoginResponse(response.data)
          }}
        />
      </div>
    </div>
  </div>
}