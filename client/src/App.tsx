import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router'
import TodosPage from './pages/Todo';
import AuthPage from './pages/Auth';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import AuthRoute from './components/Routes/AuthRoute';
import Layout from './Layout';
import Spinner from './components/Loader/Spinner';
import { getUserInfo } from './redux/slices/userSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/auth',
        element: <AuthRoute><AuthPage /></AuthRoute>
      },
      {
        path: '/todos',
        element: <ProtectedRoute><TodosPage /></ProtectedRoute>
      },
      {
        path: '*',
        element: <Navigate to='/todos' replace/>
      }
    ]
  }
])

function App() {
  const dispatch = useAppDispatch()
  const {isUserLoading} = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner />
      </div>
    )
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
