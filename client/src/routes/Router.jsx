import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../users/pages/LoginPage";
import SignupPage from "../users/pages/SignupPage";
import ROUTES from "./routesModel";
import UserEditPage from "../users/pages/UserEditPage";
import UsersPage from "../users/pages/UsersPage";
import UserProfilesPage from "../users/pages/UserProfilesPage";
import UserInfoPage from "../users/pages/UserInfoPage";
import ProductsPage from "../products/pages/ProductsPage";
import CreateProductPage from "../products/pages/CreateProductPage";
import WishProductsPage from "../products/pages/WishProductsPage";
import EditProductPage from "../products/pages/EditProductPage";
import ProductsDetailsPage from "../products/pages/ProductsDetailsPage";
import CartsPage from "../carts/pages/CartsPage";
import OrdersPage from "../orders/pages/OrdersPage";
import OrderPage from "../orders/pages/OrderPage";
import CreatePostPage from "../posts/pages/CreatePostPage";
import EditPostPage from "../posts/pages/EditPostPage";
import PostPage from "../posts/pages/PostsPage";
import FavPostsPage from "../posts/pages/FavPostsPage";
import MyPostsPage from "../posts/pages/MyPostsPage";
import PostDetailsPage from "../posts/pages/PostDetailsPage";
import OrdersCRM from "../orders/pages/OrdersCRM";
import AdminDrawerMenu from "./components/AdminDrawerMenu";
import PostsDrawerMenu from "./components/PostsDrawerMenu";
import AnalayzesPage from "../analayzes/pages/AnalayzesPage";
import HomePage from "../pages/HomePage";
import UserResetPassPage from "../users/pages/UserResetPassPage";
import NotificationsPage from "../notifications/pages/NotificationsPage";
import CreateContactPage from "../contacts/pages/CreateContactPage";
import ContactsPage from "../contacts/pages/ContactsPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<HomePage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.RESET_PASS} element={<UserResetPassPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={`${ROUTES.EDIT_USER}/:id`} element={<UserEditPage />} />
      <Route
        path={`${ROUTES.USER_PROFILE}/view/:id`}
        element={<UserProfilesPage />}
      />
      <Route path={`${ROUTES.USER_PROFILE}/:id`} element={<UserInfoPage />} />
      <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
      <Route path={ROUTES.CREATE_PRODUCT} element={<CreateProductPage />} />
      <Route path={ROUTES.WISH_PRODUCTS} element={<WishProductsPage />} />
      <Route
        path={`${ROUTES.EDIT_PRODUCT}/:id`}
        element={<EditProductPage />}
      />
      <Route
        path={`${ROUTES.PRODUCTS}/:id`}
        element={<ProductsDetailsPage />}
      />
      <Route path={ROUTES.CART} element={<CartsPage />} />
      <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
      <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />

      <Route path={ROUTES.CREATE_CONTACTS} element={<CreateContactPage />} />
      <Route path={`${ROUTES.ORDERS}/:id`} element={<OrderPage />} />
      <Route path={ROUTES.POSTS} element={<PostsDrawerMenu />}>
        <Route path={"all_posts"} element={<PostPage />} />
        <Route path={"create_post"} element={<CreatePostPage />} />
        <Route path={"fav_posts"} element={<FavPostsPage />} />
        <Route path={"my_posts"} element={<MyPostsPage />} />
      </Route>
      <Route path={`${ROUTES.POSTS}/:id`} element={<PostDetailsPage />} />
      <Route path={`${ROUTES.EDIT_POST}/:id`} element={<EditPostPage />} />
      <Route path={ROUTES.ADMIN} element={<AdminDrawerMenu />}>
        <Route path={"users"} element={<UsersPage />} />
        <Route path={"orders"} element={<OrdersCRM />} />
        <Route path={"analyzes"} element={<AnalayzesPage />} />
        <Route path={"contacts"} element={<ContactsPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
