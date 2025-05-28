import { type JSX } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { Navigate } from 'react-router'
import Spinner from '../Loader/Spinner'

type ProtectedRouteProps = {
  children: JSX.Element
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
const {userInfo, isUserLoading} = useAppSelector(state => state.user)

  if (isUserLoading) {
    return <div className="flex justify-center items-center h-screen w-full"><Spinner /></div>
  }

  return userInfo ? children : <Navigate to="/auth" replace/>
}

export default ProtectedRoute