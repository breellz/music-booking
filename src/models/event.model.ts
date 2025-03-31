import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
 title: string;
 description?: string;
 date: Date;
 user: mongoose.Types.ObjectId;
}

const EventSchema = new Schema<IEvent>(
 {
  title: {
   type: String,
   required: true,
  },
  description: {
   type: String,
  },
  date: {
   type: Date,
   required: true,
  },
  user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: true,
  },
 },
 { timestamps: true }
);

export const Event = mongoose.model<IEvent>("Event", EventSchema);
