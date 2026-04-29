import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../services/api";

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
      <h2 className="mb-4">Latest Products</h2>

      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Rs. {product.price}</Card.Text>

                <Link to={`/product/${product._id}`}>
                  <Button variant="primary" size="sm">
                    View Product
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
