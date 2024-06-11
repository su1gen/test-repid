'use client'

import Link from 'next/link';
import { useUserContext } from '@/context/UserContextProvider';
import { LoggedUserBlock } from '@/components/auth/LoggedUserBlock';

export default function MainTitleUserButton() {
  const { user } = useUserContext()

  if (!user) {
    return <Link href={'/login'}
                 className="font-semibold text-blue-500 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
      Log in
    </Link>
  }

  return <LoggedUserBlock  name={user.name} id={user.id}/>
}