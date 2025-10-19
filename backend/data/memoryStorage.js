import bcrypt from "bcrypt";

const hashedPassword = bcrypt.hashSync("password123", 10);

export const users = [
  { id: 1, email: "admin@test.com", password: hashedPassword },
];

export const products = [];
