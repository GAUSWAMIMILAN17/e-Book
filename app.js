import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import BookRoute from "./routes/books.routes.js"
import orderRoute from "./routes/order.routes.js"


dotenv.config({})
const app = express()

app.use(cookieParser());


//middleware
app.use(express.json());  // json data aave to parse kare and req.body ne aape
app.use(express.urlencoded({ extended: true }));  //Agar data form se aata hai (HTML form style), to usko parse karta hai.
// app.use(cookieParser());


const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;

app.use("/api/user", userRoute)
app.use("/api/books", BookRoute)
app.use("/api/order", orderRoute )

app.listen(PORT, ()=> {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
})