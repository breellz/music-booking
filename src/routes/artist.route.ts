import { Router } from "express";
import {
 createArtistProfile,
 getArtistProfile,
 updateArtistAvailability,
} from "../controller/artist.controller";
import { Auth } from "../middleware/auth";

const artistRouter = Router();

// Create Artist Profile
artistRouter.post("/profile", Auth, createArtistProfile);

// Get Artist Profile
artistRouter.get("/profile", Auth, getArtistProfile);

// Update Artist Availability
artistRouter.patch("/availability", Auth, updateArtistAvailability);

export { artistRouter };
