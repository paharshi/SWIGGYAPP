import React ,{lazy,Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './src/component/Header';
import { Outlet, createBrowserRouter,RouterProvider } from 'react-router-dom';
import Contact from './src/component/Contact'
// import About from './src/component/About'
import Body from './src/component/Body'
import './index.css'
import RestaurantMenu from './src/component/RestaurantMenu';
import { Suspense } from 'react'
import Cart from './src/component/Cart'
import ContextUser from './src/utiles/ContextUser';
import { Provider } from 'react-redux';
import appStore from './src/utiles/store/appStore.js';



const Products = lazy (()=>import("./src/component/Products.js"))
const About = lazy (()=>import("./src/component/About.js"))
const App = ()=>{

    const [userInfo, setUserInfo]=useState()

    useEffect(()=>{

        const data={
            name:"WELCOME TO SUSMITHA"
        }

        setUserInfo(data.name)

    },[])



    return (
        
        <Provider store={appStore}>
        <ContextUser.Provider value={{loggedInUser:userInfo, setUserInfo}}>
              <div className="app">
              <ContextUser.Provider value={{loggedInUser: userInfo}}>
              <Header />
              </ContextUser.Provider>

        <Outlet />
        </div>
        </ContextUser.Provider>
        </Provider>






       
    )
    
}
const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children : [
            {
                path:'/',
                element:<Body/>
            },
            {
                path:'/product',
                // element:<Products/>
                element:<Suspense fallback  ={<h1>Loading...  </h1>}><Products/></Suspense>
            },
            {
                path:'/about',
                // element:<About/>
                element:<Suspense fallback={<h1>Loading...hi .</h1>}><About/></Suspense>
            },
            {
                path:'/contact',
                element:<Contact/>
            },
            {
                path:'/cart',
                element:<Cart/>
            },
            {
                path:'/restaurant/:resId',
                element:<RestaurantMenu/>
            },
        ],
        errorElement : <Error />
    }
])
export default App
const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)




 {/* // <ContextUser.Provider value={{nameLoggin: userInfo,setUserInfo}}>
        //       <div className="app">
        //       <ContextUser.Provider value={{nameLoggin: userInfo}}>
        //       <Header />
        //       </ContextUser.Provider>

        // <Outlet />
        // </div>
        // </ContextUser.Provider> */}