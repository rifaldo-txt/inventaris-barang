import path from "path";
import React, { lazy, Suspense} from "react";

const Loadable = Component => props => {
    return(
        <Suspense>
            <Component {...props}/>
        </Suspense>
    )
}

const Teste = Loadable(lazy(()=>import('../pages/testing/index')))
const Dashboard = Loadable(lazy(()=>import('../pages/pesan/index')))
const MainPage = Loadable(lazy(()=>import('../pages/MainPage')))
    

const mainRoutes = [
    {
        path:'',
        element:<Teste/>
    },
    {
        path:'/dashboard',
        element:<Dashboard/>
    },
    {
        path:'/main',
        element:<MainPage/>
    }
]

export default mainRoutes