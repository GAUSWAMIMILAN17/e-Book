import jwt from "jsonwebtoken";
import {User} from "../models/userschema.model.js"

const authenticateToken = async(req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("COOKIE TOKEN:", req.cookies.token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "User Not Login , Plz Login then Try", success: false });
    }
    const decoded =   jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return (
        res.status(401).json({ message: "Invalid token" }), (success = false)
      );
    }
    // req.id = decoded.userId;
    const user = await User.findById(decoded.userId).select("-password");
    // console.log(user)
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Serve Error / Invalid token" });
  }
};

export default authenticateToken;