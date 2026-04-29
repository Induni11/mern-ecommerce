import { useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethod", paymentMethod);
    navigate("/placeorder");
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 />

      <Card className="p-4 shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
        <h4 className="text-center mb-3">Payment Method</h4>

        <Form onSubmit={submitHandler}>
          <Form.Check
            type="radio"
            label="PayPal / Credit Card"
            value="PayPal"
            checked={paymentMethod === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mb-3"
          />

          <Button type="submit" className="w-100">
            Continue
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Payment;
