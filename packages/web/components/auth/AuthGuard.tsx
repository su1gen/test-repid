"use client"

import React, { useEffect } from 'react';
import axiosInstance from '@/helpers/axiosInstance';
import { LoggedUserProps } from '@/app/types';
import { apiRoutes } from '@/app/routes';
import { useUserContext } from '@/context/UserContextProvider';

const checkJWTToken = async () => {
  try {
    const response = await axiosInstance({withToastErrors: false}).get<LoggedUserProps>(apiRoutes.auth.status)
    return {id: response.data.id, name: response.data.name}
  } catch (e) {}

  return null
}

export function AuthGuard({children}: {
  children: React.ReactNode
}) {
  let { user, setUser } = useUserContext()

  const getUserFromJWT = async () => {
    let currentUser = await checkJWTToken()
    if (currentUser) {
      setUser(currentUser)
    }
  }

  useEffect(() => {
    getUserFromJWT().then(() => {
      console.log(111, user)
    })
  }, [])

  return children;
}