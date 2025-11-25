import express from "express"


import authenticateToken from "../middleware/authenticateToken.js";
import {isAdmin} from "../middleware/isAdmin.js"
import { getAllOrders, getMyOrders, getOneOrder, getOrder, placeOrder, updateOrderStatus } from "../controller/order.controller.js";
import { isUser } from "../middleware/isUser.js";


const router = express.Router();

router.route("/placeOrder").post(authenticateToken,isUser,placeOrder)
router.route("/myOrders").get(authenticateToken,isUser,getMyOrders)
router.route("/myOrders/:id").get(authenticateToken,isUser,getOrder)
router.route("/getAllOrders").get(authenticateToken,isAdmin,getAllOrders)
router.route("/updateOrderStatus/:id").post(authenticateToken,isAdmin,updateOrderStatus)
router.route("/getOneOrder/:id").get(authenticateToken,isAdmin,getOneOrder)


export default router;