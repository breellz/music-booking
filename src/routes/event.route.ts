import { Router } from "express";
import {
 createEvent,
 getAllEvents,
 getEventById,
 updateEventById,
 deleteEventById,
} from "../controller/event.controller";
import { Auth } from "../middleware/auth";

const eventRouter = Router();

// Create Event
eventRouter.post("/", Auth, createEvent);

// Get All Events
eventRouter.get("/", Auth, getAllEvents);

// Get Event by ID
eventRouter.get("/:id", Auth, getEventById);

// Update Event by ID
eventRouter.patch("/:id", Auth, updateEventById);

// Delete Event by ID
eventRouter.delete("/:id", Auth, deleteEventById);

export { eventRouter };
