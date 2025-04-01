import mongoose, { Schema, Document } from "mongoose";

export interface IArtist extends Document {
 user: mongoose.Schema.Types.ObjectId;
 stageName: string;
 bio: string;
 availability: boolean;
 pricePerHour: number;
}

const ArtistSchema: Schema = new Schema(
 {
  user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: true,
  },
  stageName: {
   type: String,
   required: true,
  },
  bio: {
   type: String,
  },
  availability: {
   type: Boolean,
   default: true,
  },
  pricePerHour: {
   type: Number,
   required: true,
  },
 },
 { timestamps: true }
);

const Artist = mongoose.model<IArtist>("Artist", ArtistSchema);

export { Artist };
