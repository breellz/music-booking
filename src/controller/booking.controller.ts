import { NextFunction, Response } from "express";
import { getEventBookings } from "../services/booking.service";
import { validateId } from "../utils/helpers/validators/validators";
import { IPageFilter } from "../utils/pageMeta";
import { Artist } from "../models/artist.model";
import { Booking } from "../models/bookings.model";
import { Event } from "../models/event.model";
import {
 sendErrorResponse,
 sendSuccessResponse,
} from "../middleware/error/responseHandler";
import logger from "../utils/helpers/logger";
import { CustomRequest } from "../middleware/auth";

// Book an Artist for an Event
export const bookArtist = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 const { artistId, eventId } = req.body;

 try {
  // Check if the event exists
  const event = await Event.findById(eventId);
  if (!event) {
   return sendErrorResponse(res, "Event not found", 404);
  }

  // Check if the artist exists
  const artist = await Artist.findById(artistId);
  if (!artist) {
   return sendErrorResponse(res, "Artist not found", 404);
  }

  // Check if the artist is already booked for the event
  const existingBooking = await Booking.findOne({
   artist: artistId,
   event: eventId,
  });
  if (existingBooking) {
   return sendErrorResponse(
    res,
    "Artist is already booked for this event",
    400
   );
  }

  // Create a new booking
  const newBooking = await Booking.create({
   artist: artistId,
   event: eventId,
   status: "pending",
   user: req.user!._id,
  });

  return sendSuccessResponse(res, "Artist booked successfully", 201, {
   booking: newBooking,
  });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};

// Check Event Booking Status
export const getBooking = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 const { id } = req.params;

 try {
  // Fetch all bookings for the event
  validateId(id, "bookingId");
  const booking = await Booking.findOne({ _id: id })
   .populate("artist")
   .populate("event");

  if (!booking) {
   return sendErrorResponse(res, "Booking not found", 404);
  }
  return sendSuccessResponse(res, "Bookings fetched successfully", 200, {
   booking,
  });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};

export const getAllBookings = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 const filters = req.query as IPageFilter;

 try {
  // Fetch all bookings for the artist
  const bookings = await getEventBookings(filters, req.user!._id);

  return sendSuccessResponse(
   res,
   "Bookings fetched successfully",
   200,
   bookings
  );
 } catch (error) {
  logger.error(error);
  next(error);
 }
};

// update a booking
export const updateBooking = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 //either artist or owner can update booking
 const { bookingId } = req.params;
 const status = req.query.status as string;
 try {
  // Find the booking by ID
  validateId(bookingId, "bookingId");
  if (
   !status ||
   !["pending", "confirmed", "cancelled", "rejected"].includes(status)
  ) {
   return sendErrorResponse(res, "Invalid status", 400);
  }

  const booking = await Booking.findById(bookingId)
   .populate("artist")
   .populate("event");

  if (!booking) {
   return sendErrorResponse(res, "Booking not found", 404);
  }

  if (booking.status === status) {
   return sendErrorResponse(res, `Booking already ${status}`, 400);
  }
  if (
   ["confirmed", "rejected"].includes(status) &&
   req.user!._id.toString() !== (booking as any).artist.user.toString()
  ) {
   return sendErrorResponse(
    res,
    "Only the artist can confirm or reject the booking",
    403
   );
  }
  if (
   ["cancelled"].includes(status) &&
   req.user!._id.toString() !== (booking as any).event.user.toString()
  ) {
   return sendErrorResponse(
    res,
    "Only the event owner can cancel the booking",
    403
   );
  }

  booking.status = status;
  await booking.save();

  return sendSuccessResponse(res, `Booking ${status} successfully`, 200, {
   booking,
  });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};
