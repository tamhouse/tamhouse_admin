import { Home, Account, Product, Login, Category, AddingProduct, EdittingProduct, AddingCategory } from "../pages";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: ["/home", "/"],
    exact: true,
    component: () => {
      return (<Home />);
    },
  },
  {
    path: ["/account"],
    exact: true,
    component: () => {
      return (<Account />);
    },
  },
  {
    path: ["/product"],
    exact: true,
    component: () => {
      return (<Product />);
    },
  },
  {
    path: ["/login"],
    exact: true,
    component: () => {
      return (<Login />);
    },
  },
  {
    path: ["/category"],
    exact: true,
    component: () => {
      return (<Category />);
    },
  },
  {
    path: ["/product/add"],
    exact: true,
    component: () => {
      return (<AddingProduct />);
    },
  },
  {
    path: ["/category/add"],
    exact: true,
    component: () => {
      return (<AddingCategory />);
    },
  },
  {
    path: ["/product/edit"],
    exact: true,
    component: () => {
      return (<EdittingProduct />);
    },
  },
  {
    path: "/YWRtaW4=",
    component: Home,
    exact: true,
  },
];