import {type JSX } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { Navigate } from 'react-router'
import Spinner from '../Loader/Spinner'

type AuthRouteProps = {
  children: JSX.Element
}

const AuthRoute = ({children}: AuthRouteProps) => {
  const {userInfo, isUserLoading} = useAppSelector(state => state.user)

  if (isUserLoading) {
    return <div className="flex justify-center items-center h-screen w-full"><Spinner /></div>
  }

  return userInfo ? <Navigate to="/todos" replace/> : children
}

export default AuthRoute