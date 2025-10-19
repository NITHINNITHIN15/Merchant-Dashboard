import React from "react";
import api from "../api/axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import '../styles/ProductList.css';

export default function ProductList({ products, fetchProducts, setEditProduct }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Products</h2>

      <table className="product-list">
        <thead>
          <tr>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>STOCK</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5">No products found</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>
                  <span className="category-badge">{p.category}</span>
                </td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setEditProduct(p)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
