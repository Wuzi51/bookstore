import { createBrowserRouter } from "react-router-dom";
import { Home, NotFound, BookInfo, DetailPage  } from "@/pages";
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
        element: <BookInfo />
      },
      {
        path: 'detail',
        element: <DetailPage/>
      },
      {
        path: '*',
        element: <NotFound />
      },  
    ]
  }
  
])

export default router


