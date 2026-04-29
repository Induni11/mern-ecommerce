import { useEffect, useState } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AdminProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setProducts(data);
      } catch (err) {
        setError("Admin access only");
      }
    };

    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this product?")) {
      await api.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h3 className="mb-4">Products (Admin)</h3>

      {/* ✅ Create Product button */}
      <Button
        className="mb-3"
        onClick={() => navigate("/admin/product/new")}
      >
        Create Product
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>Rs. {product.price}</td>
              <td>
                {/* ✅ Edit */}
                <Button
                  variant="light"
                  size="sm"
                  className="me-2"
                  onClick={() =>
                    navigate(`/admin/product/${product._id}/edit`)
                  }
                >
                  Edit
                </Button>

                {/* ✅ Delete */}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteHandler(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminProducts;
