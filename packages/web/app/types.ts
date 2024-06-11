import React, { ChangeEvent, Dispatch, JSX } from 'react';
import { FormTypes } from '@/enums/FormTypes';

export type PlatformCardProps = {
  Logo: () => JSX.Element
  link: string
  linkText: string
  description: string
}

export type LoginData = {
  email: string
  password: string
  remember: boolean
}

export type TextInputProps = {
  id: string
  labelText: string
  type: string
  name: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  autoFocus?: boolean
  autoComplete?: string | undefined
}

export type RegisterData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type LoginFormProps = {
  dispatchActiveForm: Dispatch<FormTypes>
}

export type LoginResponse = {
  id: number
  name: string
  accessToken: string
}

export type LoggedUserProps = {
  id: number
  name: string
}

export type UserContextType = {
  user: LoggedUserProps | null,
  setUser: React.Dispatch<React.SetStateAction<LoggedUserProps | null>>
}

export type RecoverData = {
  email: string
}