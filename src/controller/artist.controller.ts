import { Request, Response, NextFunction } from "express";
import Artist from "../models/artist.model";
import {
 sendErrorResponse,
 sendSuccessResponse,
} from "../middleware/error/responseHandler";
import logger from "../utils/helpers/logger";
import { CustomRequest } from "../middleware/auth";

// Create Artist Profile
export const createArtistProfile = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 const { stageName, bio, pricePerHour } = req.body;
 const userId = req.user?._id;

 try {
  // Check if artist profile already exists for the user
  const existingArtist = await Artist.findOne({ user: userId });
  if (existingArtist) {
   return sendErrorResponse(res, "Artist profile already exists", 400);
  }

  // Create new artist profile
  const newArtist = await Artist.create({
   user: userId,
   stageName,
   bio,
   pricePerHour,
  });

  return sendSuccessResponse(res, "Artist profile created successfully", 201, {
   artist: newArtist,
  });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};

// Get Artist Profile
export const getArtistProfile = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 const userId = req.user?._id;

 try {
  // Fetch artist profile by user ID
  const artist = await Artist.findOne({ user: userId });
  if (!artist) {
   return sendErrorResponse(res, "Artist profile not found", 404);
  }

  return sendSuccessResponse(res, "Artist profile fetched successfully", 200, {
   artist,
  });
 } catch (error) {
  logger.error(error);
  next(error);
 }
};

// Update Artist Availability
export const updateArtistAvailability = async (
 req: CustomRequest,
 res: Response,
 next: NextFunction
) => {
 const { availability } = req.body;
 const userId = req.user?._id;

 try {
  // Update artist availability
  const updatedArtist = await Artist.findOneAndUpdate(
   { user: userId },
   { availability },
   { new: true }
  );

  if (!updatedArtist) {
   return sendErrorResponse(res, "Artist profile not found", 404);
  }

  return sendSuccessResponse(
   res,
   "Artist availability updated successfully",
   200,
   { artist: updatedArtist }
  );
 } catch (error) {
  logger.error(error);
  next(error);
 }
};
