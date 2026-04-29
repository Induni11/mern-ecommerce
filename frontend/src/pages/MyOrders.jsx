import { useEffect, useState } from "react";
import { Table, Container, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/api/orders/myorders");
        setOrders(data);
      } catch (err) {
        setError("Please login to view your orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <h3 className="mb-4">My Orders</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      {!error && orders.length === 0 && (
        <p>You have no orders.</p>
      )}

      {orders.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>Rs. {order.totalPrice}</td>
                <td>{order.isPaid ? "Yes" : "No"}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/order/${order._id}`}
                    variant="primary"
                    size="sm"
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyOrders;
