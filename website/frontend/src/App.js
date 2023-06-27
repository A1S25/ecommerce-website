import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "./components/miscelleanous/protectedRoute";

import Header from "./components/layout/header page/header";
import Footer from "./components/layout/footer page/footer";
import Homes from "./components/home/home";
import ProductDetail from "./components/product/product detail page/productDetail";
import ProductCatalogue from "./components/product/product catalogue page/productCatalogue";
import About from "./components/layout/about page/about";
import Contact from "./components/layout/contact page/contact";
import Account from "./components/account/account page/account";
import UpdateProfile from "./components/account/account page/update profile/updateProfile";
import UpdatePassword from "./components/account/account page/update password/updatePassword";
import Registration from "./components/account/registration page/registration";
import Login from "./components/account/login page/login";
import ForgetPassword from "./components/account/forget password page/forgetPassword";
import ResetPassword from "./components/account/reset password page/resetPassword"
import Cart from "./components/checkout process/cart page/cart";
import Wishlist from "./components/checkout process/wishlist page/wishlist";
import Shipping from "./components/checkout process/shipping page/shipping";
import ConfirmOrder from "./components/checkout process/confirm order page/confirmOrder";
import Payment from "./components/checkout process/payment page/payment";
import OrderSuccess from "./components/checkout process/order success page/orderSuccess";
import Myorder from "./components/order/my order page/myOrder";
import OrderHistory from "./components/order/order history page/orderHistory";
import Dashboard from "./components/seller/seller dashboard page/dashboard";
import SellerProduct from "./components/seller/seller product page/sellerProduct";
import NewProduct from "./components/seller/seller product page/New Product/newProduct";
import UpdateProduct from "./components/seller/seller product page/Update Product/updateProduct";
import SellerOrder from "./components/seller/seller order page/sellerOrder";
import SellerProcessOrder from "./components/seller/seller order page/seller process order/sellerProcessOrder";
import AdminDashboards from "./components/admin/admin dashoard page/admindashboard";
import ProductReviews from "./components/admin/admin reviews or comment page/productReviews";
import UserList from "./components/admin/admin user page/userList";
import UpdateUser from "./components/admin/admin user page/update user/updateuser";

function App() {
  const { isAuthenticated } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    async function getStripeApiKey() {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/payments/stripeapikey");
        setStripeApiKey(response.data.stripeApiKey);
      } catch (error) {
        console.error("Failed to retrieve Stripe API key:", error);
      }
    }
    if (isAuthenticated) { getStripeApiKey(); }
  }, [isAuthenticated]);

  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductCatalogue />} />
        <Route path="/products/:keyword" element={<ProductCatalogue />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<ProtectedRoute element={Account} />} />
        <Route path="/me/update" element={<ProtectedRoute element={UpdateProfile} />} />
        <Route path="/password/update" element={<ProtectedRoute element={UpdatePassword} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<ProtectedRoute element={Cart} />} />
        <Route path="/wishlist" element={<ProtectedRoute element={Wishlist} />} />
        <Route path="/shipping" element={<ProtectedRoute element={Shipping} />} />
        <Route path="/order/confirm" element={<ProtectedRoute element={ConfirmOrder} />} />
        {stripePromise && (
          <Route path="/process/payment" element={<Elements stripe={stripePromise}><ProtectedRoute element={Payment} /> </Elements>} />
        )}
        <Route path="/success" element={<ProtectedRoute element={OrderSuccess} />} />
        <Route path="/orders" element={<ProtectedRoute element={Myorder} />} />
        <Route path="/order/:id" element={<ProtectedRoute element={OrderHistory} />} />
        <Route path="/seller/dashboard" element={<ProtectedRoute element={Dashboard} isAdmin={true} />} />
        <Route path="/seller/products" element={<ProtectedRoute element={SellerProduct} isAdmin={true} />} />
        <Route path="/seller/product" element={<ProtectedRoute element={NewProduct} isAdmin={true} />} />
        <Route path="/seller/product/:id" element={<ProtectedRoute element={UpdateProduct} isAdmin={true} />} />
        <Route path="/seller/orders" element={<ProtectedRoute element={SellerOrder} isAdmin={true} />} />
        <Route path="/seller/order/:id" element={<ProtectedRoute element={SellerProcessOrder} isAdmin={true} />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute element={AdminDashboards} isTeam={true} />} />
        <Route path="/admin/reviews" element={<ProtectedRoute element={ProductReviews} isTeam={true} />} />
        <Route path="/admin/users" element={<ProtectedRoute element={UserList} isTeam={true} />} />
        <Route path="/admin/user/:id" element={<ProtectedRoute element={UpdateUser} isTeam={true} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;