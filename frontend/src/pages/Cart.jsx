import { useParams, useLocation } from "react-router-dom";

const Cart = () => {
  const { id } = useParams();
  const location = useLocation();

  const qty = new URLSearchParams(location.search).get("qty") || 1;

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p><strong>Product ID:</strong> {id}</p>
      <p><strong>Quantity:</strong> {qty}</p>
    </div>
  );
};

export default Cart;