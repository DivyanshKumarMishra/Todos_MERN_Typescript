import { Navigate, Outlet } from 'react-router'
import { useAppSelector } from './redux/hooks'
import Navbar from './components/Navbar'
import { Toaster } from './components/ui/sonner'

const Layout = () => {
  const {userInfo, isUserError} = useAppSelector(state => state.user)
  
  return isUserError ? <Navigate to="/auth" replace/> : (
    <div>
      {userInfo && <Navbar />}
      <Outlet />
      <Toaster />
    </div>
  )
}

export default Layout