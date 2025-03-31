import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
 artist: mongoose.Types.ObjectId;
 event: mongoose.Types.ObjectId;
 status: string;
}

const BookingSchema = new Schema<IBooking>(
 {
  artist: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Artist",
   required: true,
  },
  event: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Event",
   required: true,
  },
  status: {
   type: String,
   enum: ["pending", "confirmed", "cancelled"],
   default: "pending",
  },
 },
 { timestamps: true }
);

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
