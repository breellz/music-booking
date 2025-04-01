import { Router } from "express";
import {
 bookArtist,
 getBooking,
 getAllBookings,
 updateBooking,
} from "../controller/booking.controller";
import { Auth } from "../middleware/auth";

const bookingRouter = Router();

// Book an Artist for an Event
bookingRouter.post("/", Auth, bookArtist);

// Get Booking by Event ID
bookingRouter.get("/:id", Auth, getBooking);

// Get All Bookings
bookingRouter.get("/", Auth, getAllBookings);

// Update Booking
bookingRouter.patch("/:bookingId", Auth, updateBooking);

export { bookingRouter };
