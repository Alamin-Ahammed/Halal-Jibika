import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Jobs from "../pages/Jobs/Jobs";
import Favorite from "../pages/Favorite/Favorite";
import NotFound from "../pages/NotFound/NotFound";
import SignUp from "../pages/Sign-Up/SingUp";
import SignIn from "../pages/SignIn/SignIn";
import ShowDetailsOfAJob from "../pages/ShowDetailsOfAJob/ShowDetailsOfAJob";

export const routes = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'jobs',
                element: <Jobs />
            },
            {
                path: 'favorites',
                element: <Favorite />
            },
            {
                path: 'signup',
                element: <SignUp />
            },
            {
                path: 'signin',
                element: <SignIn />
            },
            {
                path: 'ShowDetailsOfAJob',
                element: <ShowDetailsOfAJob />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])