import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" });
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,                // prod me true (HTTPS required)
    sameSite: isProd ? "none" : "lax",
    maxAge: 15 * 24 * 60 * 60 * 1000,
    path: "/",                     // explicit
  });
};
