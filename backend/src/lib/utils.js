import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, "unbreakable_secret_key", { expiresIn: "1h" });
  try {
    const decoded = jwt.verify(token, "unbreakable_secret_key");
    console.log("Decoded Token:", decoded); 
  } catch (error) {
    console.log("Token Verification Failed:", error.message);
  }

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
