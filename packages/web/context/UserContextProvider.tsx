"use client"

import React, { createContext, useContext, useState } from 'react';
import { LoggedUserProps, UserContextType } from '@/app/types';

const UserContext = createContext<UserContextType>({ user: null, setUser: () => {}})

export function UserContextProvider({children}: {
  children: React.ReactNode
}) {
  let [user, setUser] = useState<LoggedUserProps | null>(null)

  return <UserContext.Provider value={{user, setUser}}>
    {children}
  </UserContext.Provider>
}

export function useUserContext() {
  return useContext(UserContext)
}