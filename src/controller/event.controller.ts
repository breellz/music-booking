import { Request, Response, NextFunction } from "express";
import { Event } from "../models/event.model";
import {
 sendErrorResponse,
 sendSuccessResponse,
} from "../middleware/error/responseHandler";
import logger from "../utils/helpers/logger";
import { CustomRequest } from "../middleware/auth";
import { IPageFilter } from "../utils/pageMeta";
import {
 getUserEvents,
 handleEventCreation,
 handleFetchEvent,
} from "../services/event.service";
import {
 validateEventDetails,
 validateId,
 validatePastSchedule,
} from "../utils/helpers/validators/validators";

// Create Event
export const createEvent = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 const { title, description, date } = req.body;

 try {
  validateEventDetails(title, description, date);
  validatePastSchedule(date);
  const newEvent = await handleEventCreation({
   user: req.user?._id,
   title,
   description,
   date,
  });

  return sendSuccessResponse(res, "Event created successfully", 201, {
   event: newEvent,
  });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};

// Get All Events
export const getAllEvents = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 const filters = req.query as IPageFilter;
 try {
  const events = await getUserEvents(filters, req.user!._id);
  return sendSuccessResponse(res, "Events fetched successfully", 200, events);
 } catch (error) {
  logger.error(error);
  next(error);
 }
};

// Get Event by ID
export const getEventById = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 const { id } = req.params;

 try {
  validateId(id, "eventId");

  const event = await handleFetchEvent(id, req.user!._id);
  if (!event) {
   return sendErrorResponse(res, "Event not found", 404);
  }
  return sendSuccessResponse(res, "Event fetched successfully", 200, {
   event,
  });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};

// Update Event by ID
export const updateEventById = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 const { id } = req.params;
 const { title, description, date } = req.body;

 try {
  validateId(id, "eventId");

  if (date) {
   validatePastSchedule(date);
  }
  const updatedEvent = await Event.findByIdAndUpdate(
   id,
   { title, description, date },
   { new: true }
  );

  if (!updatedEvent) {
   return sendErrorResponse(res, "Event not found", 404);
  }

  return sendSuccessResponse(res, "Event updated successfully", 200, {
   event: updatedEvent,
  });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};

// Delete Event by ID
export const deleteEventById = async (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const { id } = req.params;

 try {
  validateId(id, "eventId");

  const deletedEvent = await Event.findByIdAndDelete(id);

  if (!deletedEvent) {
   return sendErrorResponse(res, "Event not found", 404);
  }

  return sendSuccessResponse(res, "Event deleted successfully", 200, {
   event: deletedEvent,
  });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};
