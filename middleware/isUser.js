// middlewares/admin.js
export const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Only user can buy the book" });
  }
  next();
};
