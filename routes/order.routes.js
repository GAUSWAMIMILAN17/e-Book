import express from "express"


import authenticateToken from "../middleware/authenticateToken.js";
import {isAdmin} from "../middleware/isAdmin.js"
import { placeOrder } from "../controller/order.controller.js";


const router = express.Router();

router.route("/placeOrder/:id").post(authenticateToken,placeOrder)
export default router;