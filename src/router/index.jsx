import { createBrowserRouter } from 'react-router-dom';
import { Home, NotFound, Book, Books, Checkout, Favorite } from '@/pages';
import Layout from '../components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/book/:id',
        element: <Book />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/favorite',
        element: <Favorite />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
