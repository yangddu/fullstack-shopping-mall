import GlobalLayout from "../src/pages/_layout";
import Index from "../src/pages/index";
import CartIndex from "../src/pages/cart/index";
import PaymentIndex from "../src/pages/payment/index";
import ProductsIndex from "../src/pages/products/index";
import ProductsId from "../src/pages/products/[id]";
import PostsIndex from '../src/pages/posts/index';
import PostsId from '../src/pages/posts/[id]';

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