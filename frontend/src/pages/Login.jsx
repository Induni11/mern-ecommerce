import { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Container>
      <Card className="p-4 mx-auto" style={{ maxWidth: "450px" }}>
        <h4 className="text-center mb-3">Login</h4>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={submitHandler}>
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
            Login
          </Button>
        </Form>

        {/* ✅ Register link */}
        <p className="mt-3 text-center">
          New customer? <Link to="/register">Register</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
