import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: Rs. {product.price}</p>
      <p>{product.description}</p>

      <div style={{ margin: "10px 0" }}>
        <label>Qty: </label>
        <select value={qty} onChange={(e) => setQty(e.target.value)}>
          {[...Array(product.countInStock || 5).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>

      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
};

export default Product;
