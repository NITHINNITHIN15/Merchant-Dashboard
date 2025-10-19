import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import Navbar from "./Navbar";
import api from "../api/axios";
import '../styles/Dashboard.css';


export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchData = async () => {
    try {
      const res1 = await api.get("/products");
      const res2 = await api.get("/stats");
      setProducts(res1.data);
      setStats(res2.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryValues = {};
  const categoryCounts = {};
  products.forEach((p) => {
    const total = Number(p.price) * Number(p.stock);
    categoryValues[p.category] = (categoryValues[p.category] || 0) + total;
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  const maxValue = Math.max(...Object.values(categoryValues), 1);

  return (
    <div className="dashboard">
      <Navbar />

      <div className="overview-card">
        <h3>Overview</h3>
        <div className="overview-stats">
          <div>
            <p className="stat-title">PRODUCTS</p>
            <p className="stat-value">{stats.totalProducts || 0}</p>
          </div>
          <div>
            <p className="stat-title">TOTAL VALUE</p>
            <p className="stat-value">
              ${stats.totalInventoryValue?.toLocaleString() || 0}
            </p>
          </div>
          <div>
            <p className="stat-title">CATEGORIES</p>
            <p className="stat-value">{stats.totalCategories || 0}</p>
          </div>
        </div>

        <div className="category-breakdown">
          <h4>Category Breakdown</h4>
          {Object.keys(categoryValues).length === 0 && <p>No data yet.</p>}
          {Object.entries(categoryValues).map(([cat, value]) => (
            <div key={cat} className="category-row">
              <span className="category-name">{cat}</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(value / maxValue) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="category-value">
                ${value.toLocaleString()}{" "}
                <span className="category-items">
                  ({categoryCounts[cat]} items)
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <ProductForm
        fetchProducts={fetchData}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />
      <ProductList
        products={products}
        fetchProducts={fetchData}
        setEditProduct={setEditProduct}
      />
    </div>
  );
}
