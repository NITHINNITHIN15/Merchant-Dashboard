import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { products } from "../data/memoryStorage.js";

const router = express.Router();

router.use(protect);

router.get("/", (req, res) => {
  const userProducts = products.filter((p) => p.userId === req.user);
  res.json(userProducts);
});

router.post("/", (req, res) => {
  const { name, price, category, stock } = req.body;
  const newProduct = {
    id: Date.now(),
    userId: req.user,
    name,
    price: Number(price),
    category,
    stock: Number(stock),
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put("/:id", (req, res) => {
  const product = products.find(
    (p) => p.id === Number(req.params.id) && p.userId === req.user
  );
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, price, category, stock } = req.body;
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = Number(price);
  if (category !== undefined) product.category = category;
  if (stock !== undefined) product.stock = Number(stock);

  res.json(product);
});

router.delete("/:id", (req, res) => {
  const index = products.findIndex(
    (p) => p.id === Number(req.params.id) && p.userId === req.user
  );
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  products.splice(index, 1);
  res.json({ message: "Product deleted" });
});

export default router;
