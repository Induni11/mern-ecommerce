import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import api from "../services/api";

const Cart = () => {
  const { id } = useParams();
  const location = useLocation();
  const qty = Number(new URLSearchParams(location.search).get("qty")) || 1;

  const [cartItems, setCartItems] = useState([]);

  // ✅ Add item to cart
  useEffect(() => {
    const addToCart = async () => {
      if (!id) return;

      const { data } = await api.get(`/api/products/${id}`);

      const item = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      };

      const alreadyExists = cartItems.find(
        (x) => x.product === item.product
      );

      let updatedCart;

      if (alreadyExists) {
        updatedCart = cartItems.map((x) =>
          x.product === alreadyExists.product ? item : x
        );
      } else {
        updatedCart = [...cartItems, item];
      }

      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    addToCart();
    // eslint-disable-next-line
  }, [id]);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Go Back</Link>
        </p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.product}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h4>{item.name}</h4>
            <p>Price: Rs. {item.price}</p>
            <p>Qty: {item.qty}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
