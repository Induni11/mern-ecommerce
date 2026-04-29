import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import api from "../services/api";

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // product id (optional)

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isEdit) return;

      try {
        const { data } = await api.get(`/api/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
      } catch (err) {
        setError("Unable to load product");
      }
    };

    fetchProduct();
  }, [id, isEdit]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await api.put(`/api/products/${id}`, {
          name,
          price,
          brand,
          category,
          countInStock,
          description,
        });
      } else {
        await api.post("/api/products", {
          name,
          price,
          brand,
          category,
          countInStock,
          description,
        });
      }

      navigate("/admin/products");
    } catch (err) {
      setError("Admin access only");
    }
  };

  return (
    <Container>
      <Card className="p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-3">
          {isEdit ? "Edit Product" : "Add Product"}
        </h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={submitHandler}>
          <Form.Control
            className="mb-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Form.Control
            className="mb-2"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <Form.Control
            className="mb-2"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />

          <Form.Control
            className="mb-2"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <Form.Control
            className="mb-2"
            type="number"
            placeholder="Count In Stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
          />

          <Form.Control
            as="textarea"
            rows={3}
            className="mb-3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <Button type="submit" className="w-100">
            Save
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ProductEdit;
