import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" });
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,                 
    sameSite: isProd ? "none" : "lax",
     domain: "https://job-pilot-nu.vercel.app", 
    maxAge: 15 * 24 * 60 * 60 * 1000,
    path: "/",                     
  });
};
