import { createBrowserRouter } from "react-router-dom";
import { Home, NotFound, Book, Books } from "@/pages";
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
        path: '/book/:id',
        element: <Book/>
      },
      {
        path: '/books',
        element: <Books/>
      },
      {
        path: '*',
        element: <NotFound />
      },  
    ]
  }
  
])

export default router


