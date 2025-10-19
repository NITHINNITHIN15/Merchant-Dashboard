import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { products } from "../data/memoryStorage.js";

const router = express.Router();
router.use(protect);

router.get("/", (req, res) => {
  const userProducts = products.filter((p) => p.userId === req.user);

  const totalProducts = userProducts.length;
  const totalInventoryValue = userProducts.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );

  const categories = [...new Set(userProducts.map((p) => p.category))];
  const productsPerCategory = {};
  userProducts.forEach((p) => {
    productsPerCategory[p.category] =
      (productsPerCategory[p.category] || 0) + 1;
  });

  res.json({
    totalProducts,
    totalInventoryValue,
    totalCategories: categories.length,
    productsPerCategory,
  });
});

export default router;
