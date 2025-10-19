import jwt from "jsonwebtoken";

export const generateToken = (userId, email) => {
  return jwt.sign({ userId,email }, "secretkey", { expiresIn: "1h" });
};
