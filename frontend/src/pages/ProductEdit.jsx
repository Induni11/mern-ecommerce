import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import api from "../services/api";

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
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
        setImage(data.image);
      } catch (err) {
        setError("Unable to load product");
      }
    };

    fetchProduct();
  }, [id, isEdit]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const { data } = await api.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImage(data.imageUrl);
      setUploading(false);
    } catch (err) {
      setUploading(false);
      alert("Image upload failed");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name,
        price,
        brand,
        category,
        countInStock,
        description,
        image,
      };

      if (isEdit) {
        await api.put(`/api/products/${id}`, productData);
      } else {
        await api.post("/api/products", productData);
      }

      navigate("/admin/products");
    } catch (err) {
      setError("Admin access only");
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
      <Card className="p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-3">
          {isEdit ? "Edit Product" : "Create Product"}
        </h3>

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
            className="mb-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* ✅ Image upload */}
          <Form.Control
            className="mb-2"
            placeholder="Image URL"
            value={image}
            readOnly
          />

          <Form.Control
            type="file"
            className="mb-3"
            onChange={uploadFileHandler}
          />

          {uploading && <p>Uploading image...</p>}

          {image && (
            <img
              src={image}
              alt="product"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          )}

          <Button type="submit" className="w-100">
            Save
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ProductEdit;
