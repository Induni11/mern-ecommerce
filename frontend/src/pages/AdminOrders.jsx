import { useEffect, useState } from "react";
import { Container, Table, Alert } from "react-bootstrap";
import api from "../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/api/orders");
        setOrders(data);
      } catch (err) {
        setError("Admin access only");
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h3 className="mb-4">All Orders (Admin)</h3>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>Rs. {order.totalPrice}</td>
              <td>{order.isPaid ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrders;
