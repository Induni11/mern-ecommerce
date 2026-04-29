import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
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

  if (!product) return <p>Loading...</p>;

  return (
    <Card className="p-4 shadow-sm">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <h5>Rs. {product.price}</h5>

      <Form.Group className="my-3" controlId="qty">
        <Form.Label>Quantity</Form.Label>
        <Form.Select
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        >
          {[...Array(product.countInStock || 5).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button onClick={addToCartHandler}>Add to Cart</Button>
    </Card>
  );
};

export default Product;