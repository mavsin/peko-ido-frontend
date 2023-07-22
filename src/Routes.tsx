import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";

// ----------------------------------------------------------------------------------

const Home = lazy(() => import('./pages/Home'))

// ----------------------------------------------------------------------------------

export default function Routes() {
  return useRoutes([
    {
      element: <LandingLayout />,
      path: '/',
      children: [
        {
          element: <Home />,
          path: ''
        }
      ]
    }
  ])
}