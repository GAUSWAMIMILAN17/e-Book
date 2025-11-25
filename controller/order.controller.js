import express from "express"

import {Order} from "../models/orderschema.model.js"


// place order

export const placeOrder = (req, res) => {
    try {
        const userId = req.use._id
        console.log(userId)

        const { bookId, quantity} = req.body;

        

    } catch (error) {

    }
}