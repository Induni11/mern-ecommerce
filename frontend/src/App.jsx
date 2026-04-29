import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import ProductEdit from "./pages/ProductEdit";

function App() {
  return (
    <Router>
      <Header />

      <main style={{ minHeight: "80vh", padding: "1rem" }}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Product */}
          <Route path="/product/:id" element={<Product />} />

          {/* Cart */}
          <Route path="/cart/:id?" element={<Cart />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Checkout */}
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} /> 
          <Route path="/admin/product/new" element={<ProductEdit />} />
          <Route path="/admin/product/:id/edit" element={<ProductEdit />} /> 
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;