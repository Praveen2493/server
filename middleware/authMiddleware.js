const jwt = require("jsonwebtoken");

const authMiddleware = (
  req,
  res,
  next
) => {

 const authHeader =
  req.headers.authorization;

if (
  !authHeader ||
  !authHeader.startsWith("Bearer ")
) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
}

try {

  const token =
    authHeader.substring(7).trim();

   // console.log("Token:", token);

  const decoded =
    jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    //console.log("Decoded:", decoded);

  req.user = decoded;

  next();

} catch (error) {

   //console.log("JWT Error:", error.message);

  return res.status(401).json({
    success: false,
    message: "Invalid Token",
  });

}
};

module.exports =authMiddleware;