import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: Rs. {product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default Product;
