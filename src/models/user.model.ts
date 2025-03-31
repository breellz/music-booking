import mongoose, { Schema, Document, Model } from "mongoose";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
 _id: string;
 email: string;
 password: string;
 generateAuthToken(): Promise<string>;
}

interface IUserModel extends Model<IUser> {
 findByCredentials: (email: string, password: string) => Promise<IUser>;
}

const UserSchema = new Schema<IUser>(
 {
  email: {
   type: String,
   required: false,
   unique: true,
   sparse: true,
   lowercase: true,
   trim: true,
  },
  password: {
   type: String,
   minlength: 8,
   trim: true,
  },
 },
 { timestamps: true }
);

//Generate auth token
UserSchema.methods.generateAuthToken = async function () {
 const user = this;
 const token = jwt.sign(
  { _id: user._id.toString() },
  process.env.JWT_SECRET as jwt.Secret,
  {
   expiresIn: "7d",
  }
 );
 return token;
};

//login in users
UserSchema.statics.findByCredentials = async (email, password) => {
 const user = await User.findOne({ email });

 if (!user) {
  throw new Error("User is not registered");
 }
 const isMatch = await bcrypt.compare(password, user.password);
 if (!isMatch) {
  throw new Error("Credentials do not match");
 }
 return user;
};

//Hash plain password before saving
UserSchema.pre("save", async function (next) {
 const user = this;
 if (user.isModified("password")) {
  const salt = await bcrypt.genSalt(8);
  user.password = await bcrypt.hash(user.password as string, salt);
 }
 next();
});

export const User = mongoose.model<IUser, IUserModel>("User", UserSchema);
