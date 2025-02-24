import GlobalLayout from "./pages/_layout";
import Index from "./pages/index";
import CartIndex from "./pages/cart/index";
import PaymentIndex from "./pages/payment/index";
import ProductsIndex from "./pages/products/index";
import ProductsId from "./pages/products/[id]";
import PostsIndex from './pages/posts/index';
import PostsId from './pages/posts/[id]';

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { path: "/", element: <Index />, index: true },
      { path: "/cart", element: <CartIndex />, index: true },
      { path: "/payment", element: <PaymentIndex />, index: true },
      { path: "/products", element: <ProductsIndex />, index: true },
      { path: "/products/:id", element: <ProductsId /> },
      { path: "/posts", element: <PostsIndex />, index: true },
      { path: "/posts/:id", element: <PostsId />}
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/cart" },
  { route: "/payment" },
  { route: "/products" },
  { route: "/products/:id" },
  { route: "/posts" },
  { route: "/posts/:id" },
];