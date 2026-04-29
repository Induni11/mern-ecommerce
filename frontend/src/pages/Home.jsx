import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>

      {products.map((product) => (
        <div key={product._id} style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
          <h3>{product.name}</h3>
          <p>Rs. {product.price}</p>
          <Link to={`/product/${product._id}`}>View Product</Link>
        </div>
      ))}
    </>
  );
};

export default Home;