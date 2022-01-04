const express = require("express");

const reserveController = require('../controllers/reserveController.js');
const authController = require('../controllers/authController.js');

const reserveRouter = express.Router();

reserveRouter
.route("/reserve/:id")
.post(
    // authController.protect, 
    // authController.restrictTo('user'),
    reserveController.confirmReserevation
)
.get(
    // authController.protect, 
    // authController.restrictTo('user'),
    reserveController.getAllReservation
)

reserveRouter
.route("/cancel/:id")
.delete(
    // authController.protect, 
    // authController.restrictTo('user'),
    reserveController.cancelReserevation
)


module.exports = reserveRouter;