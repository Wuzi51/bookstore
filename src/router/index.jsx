import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '../components/Layout';
import { Spin } from 'antd';

// Lazy load all pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Book = lazy(() => import('@/pages/Book'));
const Books = lazy(() => import('@/pages/Books'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Favorite = lazy(() => import('@/pages/Favorite'));
const Profile = lazy(() => import('@/pages/Profile'));
const OrderHistory = lazy(() => import('@/pages/OrderHistory'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Spin size="large" />
  </div>
);

// Wrapper for lazy components
const LazyPage = ({ children }) => <Suspense fallback={<PageLoader />}>{children}</Suspense>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <LazyPage>
            <Home />
          </LazyPage>
        ),
      },
      {
        path: '/book/:id',
        element: (
          <LazyPage>
            <Book />
          </LazyPage>
        ),
      },
      {
        path: '/books',
        element: (
          <LazyPage>
            <Books />
          </LazyPage>
        ),
      },
      {
        path: '/checkout',
        element: (
          <LazyPage>
            <Checkout />
          </LazyPage>
        ),
      },
      {
        path: '/favorite',
        element: (
          <LazyPage>
            <Favorite />
          </LazyPage>
        ),
      },
      {
        path: '/profile',
        element: (
          <LazyPage>
            <Profile />
          </LazyPage>
        ),
      },
      {
        path: '/orders',
        element: (
          <LazyPage>
            <OrderHistory />
          </LazyPage>
        ),
      },
      {
        path: '/reset-password',
        element: (
          <LazyPage>
            <ResetPassword />
          </LazyPage>
        ),
      },
      {
        path: '*',
        element: (
          <LazyPage>
            <NotFound />
          </LazyPage>
        ),
      },
    ],
  },
]);

export default router;
