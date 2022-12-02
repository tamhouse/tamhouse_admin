import { Home, Account, Product, Login, AddingProduct, EdittingProduct } from "../pages";

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
    path: ["/product/add"],
    exact: true,
    component: () => {
      return (<AddingProduct />);
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