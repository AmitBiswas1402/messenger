import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, "unbreakable_secret_key", { expiresIn: "1h" });

  console.log("Generated Token:", token); // ✅ Debugging: Check if token is created

  // 🔍 Verify token immediately after generating it
  try {
    const decoded = jwt.verify(token, "unbreakable_secret_key");
    console.log("Decoded Token:", decoded); // ✅ Debugging: Check if decoding works
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
