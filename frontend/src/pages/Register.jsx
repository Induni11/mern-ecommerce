import { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate("/");
  };

  return (
    <Container>
      <Card className="p-4 mx-auto" style={{ maxWidth: "450px" }}>
        <h4 className="text-center mb-3">Register</h4>

        <Form onSubmit={submitHandler}>
          <Form.Control
            className="mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Form.Control
            className="mb-3"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Form.Control
            className="mb-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;