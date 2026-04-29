import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col, ListGroup, Alert } from "react-bootstrap";
import api from "../services/api";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/api/orders/${id}`);
        setOrder(data);
      } catch (err) {
        setError("Unable to fetch order details");
      }
    };

    fetchOrder();
  }, [id]);

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container>
        <p>Loading order...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h3 className="mb-4">Order Details</h3>

      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <h5>Shipping</h5>
              <p>
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.country}
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <h5>Payment Method</h5>
              <p>{order.paymentMethod}</p>
              <p>Paid: {order.isPaid ? "Yes" : "No"}</p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Order Items</h5>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    {item.name} × {item.qty} = Rs. {item.qty * item.price}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Order Summary</h5>
              <p>
                <strong>Total:</strong> Rs. {order.totalPrice}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetails;
