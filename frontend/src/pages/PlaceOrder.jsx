import { Row, Col, Card, Button, Container } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const paymentMethod = localStorage.getItem("paymentMethod");

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const placeOrderHandler = async () => {
    await api.post("/api/orders", {
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: itemsPrice,
    });

    localStorage.removeItem("cartItems");
    navigate("/");
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <Card className="p-3 mb-3">
            <h5>Shipping</h5>
            <p>{shippingAddress.address}, {shippingAddress.city}</p>
          </Card>

          <Card className="p-3 mb-3">
            <h5>Payment</h5>
            <p>{paymentMethod}</p>
          </Card>

          <Card className="p-3">
            <h5>Order Items</h5>
            {cartItems.map(item => (
              <div key={item.product}>
                {item.name} × {item.qty}
              </div>
            ))}
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3">
            <h4>Total: Rs. {itemsPrice}</h4>
            <Button className="w-100 mt-3" onClick={placeOrderHandler}>
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrder;