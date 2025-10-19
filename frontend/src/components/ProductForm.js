import React, { useState, useEffect } from "react";
import api from "../api/axios";
import '../styles/ProductForm.css';

export default function ProductForm({ fetchProducts, editProduct, setEditProduct }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (editProduct) setProduct(editProduct);
  }, [editProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        await api.put(`/products/${editProduct.id}`, product);
        setEditProduct(null);
      } else {
        await api.post("/products", product);
      }
      setProduct({ name: "", price: "", category: "", stock: "" });
      fetchProducts();
    } catch (err) {
      alert("Error saving product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={product.stock}
        onChange={handleChange}
        required
      />
      <button type="submit">{editProduct ? "Update" : "Add"} Product</button>
    </form>
  );
}


