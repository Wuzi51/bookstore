import { createBrowserRouter } from "react-router-dom";
import { Home, NotFound, Detailpage  } from "@/pages";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'book',
        element: <Detailpage />
      },
      {
        path: '*',
        element: <NotFound />
      },  
    ]
  }
  
])

export default router


