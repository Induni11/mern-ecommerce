import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import api from "../services/api";

const Cart = () => {
  const { id } = useParams();
  const location = useLocation();
  const qtyFromUrl =
    Number(new URLSearchParams(location.search).get("qty")) || 1;

  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

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
        countInStock: data.countInStock || 10,
        qty: qtyFromUrl,
      };

      const existItem = cartItems.find(
        (x) => x.product === item.product
      );

      let updatedCart;

      if (existItem) {
        updatedCart = cartItems.map((x) =>
          x.product === existItem.product ? item : x
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

  // ✅ Update quantity
  const updateQtyHandler = (productId, qty) => {
    const updatedCart = cartItems.map((item) =>
      item.product === productId
        ? { ...item, qty: Number(qty) }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // ✅ Remove item
  const removeFromCartHandler = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.product !== productId
    );

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

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

            {/* ✅ Quantity selector */}
            <label>Qty: </label>
            <select
              value={item.qty}
              onChange={(e) =>
                updateQtyHandler(item.product, e.target.value)
              }
            >
              {[...Array(item.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>

            <br /><br />

            <button
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
              }}
              onClick={() => removeFromCartHandler(item.product)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;