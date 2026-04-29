import { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem("shippingAddress")) || {};

  const [address, setAddress] = useState(saved.address || "");
  const [city, setCity] = useState(saved.city || "");
  const [postalCode, setPostalCode] = useState(saved.postalCode || "");
  const [country, setCountry] = useState(saved.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ address, city, postalCode, country })
    );
    navigate("/payment");
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 />

      <Card className="p-4 shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
        <h4 className="text-center mb-3">Shipping Address</h4>

        <Form onSubmit={submitHandler}>
          <Form.Control
            className="mb-3"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <Form.Control
            className="mb-3"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <Form.Control
            className="mb-3"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />

          <Form.Control
            className="mb-3"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />

          <Button type="submit" className="w-100">
            Continue
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Shipping;
