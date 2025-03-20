
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import WebSite from "../page/WebSite";
import Dashboard from "../components/Dashboard/Dashboard";
import Slider from "../page/Slider";
import Login from "../page/login/Login";
import SignUp from "../page/SignUp/SignUp";
import PrivateRouter from "./PrivateRouter";
import Service from "../page/Service";
import Category from "../page/Category";




const router = createBrowserRouter(
    [{
        path: "/",
        element: <PrivateRouter> <App /></PrivateRouter>
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><Dashboard /></PrivateRouter>,
        children: [
            {
                path: 'website',
                element: <WebSite />
            },
            {
                path: 'slider',
                element: <Slider />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'service',
                element: <Service />
            },
            {
                path: 'category',
                element: <Category />
            },
        ]
    }, {
        path: "login",
        element: <Login />
    },
    {
        path: "signup",
        element: <SignUp />
    }
    ]
)

export default router