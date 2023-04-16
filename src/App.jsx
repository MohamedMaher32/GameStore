import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import Home from './Component/Home/Home'
import Navbar from './Component/Navbar/Navbar'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword'
import ResetCode from './Component/ForgetPassword/ResetCode'
import NewPassword from './Component/ForgetPassword/NewPassword'
import All from './Component/All/All'
import Categories from './Component/Categories/Categories'
import Platforms from './Component/Platforms/Platforms'
import SortBy from './Component/SortBy/SortBy'
import { FunctionContextProvider } from './Context/ShareFunction'
import Datelies from './Component/Datelies/Datelies'
export default function App() {
  // ProtectRouting function
  function ProtectRouting(props) {
    if (localStorage.getItem("token")) {
        return props.children
    }
    else {
        return <Navigate to='/Login' />
    }
}
 // if user have data in localstorage navgite to home else navgite register
 function ProtectRouting2(props) {
    console.log(props);
    if (localStorage.getItem("token")) {
        return <Navigate to='/Home' />
    }
    else {
        return props.children
    }
}
  let routes = createHashRouter([
    {
      path: "", element: <Layout/>, children: [
        { index: true, element: <ProtectRouting2><Register /> </ProtectRouting2> },
        { path: "*", element: <ProtectRouting2><Register /> </ProtectRouting2> },
        { path: "login", element: <Login/> },
        { path: "home", element: <ProtectRouting><Home /></ProtectRouting> },
        { path: "datelies/:id", element: <ProtectRouting><Datelies /></ProtectRouting> },
        { path: "navbar", element: <Navbar /> },
        { path: "forgetFassowrd", element: <ForgetPassword /> },
        { path: "resetCode", element: <ResetCode /> },
        { path: "newPassword", element: <NewPassword /> },
        { path: "all", element: <ProtectRouting><All /></ProtectRouting> },
        { path: "categories/:cat", element: <ProtectRouting><Categories /></ProtectRouting> },
        { path: "platforms/:type", element: <ProtectRouting><Platforms /></ProtectRouting> },
        { path: "sort-by/:sort", element: <ProtectRouting><SortBy /></ProtectRouting> },
      ]
    }
  ])
  return (
    <div>
      <FunctionContextProvider>
        <RouterProvider router={routes} />
      </FunctionContextProvider>


    </div>
  )
}
