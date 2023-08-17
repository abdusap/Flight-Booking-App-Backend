import express from "express"
import { bookFlight, bookingHistory, login, userSignUp } from "../controller/userController.js";
const router= express.Router()

router.post('/signup',userSignUp)
router.post('/login',login)
router.post('/book_flight',bookFlight)
router.get('/booking_history',bookingHistory)

export default router;