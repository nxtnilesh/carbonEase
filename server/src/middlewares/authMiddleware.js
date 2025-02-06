// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// const authMiddleware = async (req, res, next) => {
    
//     try {
//         const token = req.header("Authorization");
//         if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });
//         console.log("Decoded", token,process.env.JWT_SECRET);
        
//         const decoded = jwt.verify(token.replace("Bearer ", " "), process.env.JWT_SECRET);
//         console.log("Auth decodne", decoded);
//         const user = await User.findById(decoded.userId).select("-password");

//         if (!user) return res.status(401).json({ message: "Invalid Token" });

//         req.user = user; // Attach user to request object
//         next();
        
//     } catch (error) {
//         res.status(401).json({ message: "Invalid or Expired Token" });
//     }
// };

// export default authMiddleware;


import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    logger.warn("Access attempt without valid token!");
    return res.status(401).json({
      message: "Authentication required",
      success: false,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn("Invalid token!");
      return res.status(429).json({
        message: "Invalid token!",
        success: false,
      });
    }

    req.user = user;
    next();
  });
};

export default authMiddleware;