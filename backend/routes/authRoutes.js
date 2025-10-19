import express from "express";
import bcrypt from "bcrypt";
import { users } from "../data/memoryStorage.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user.id,user.email);
  res.json({ token });
});

export default router;
