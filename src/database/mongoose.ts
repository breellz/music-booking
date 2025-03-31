import mongoose from "mongoose";

class Mongoose {
 private static connection: mongoose.Connection | null;

 public static get mongodbUrl() {
  switch (process.env.NODE_ENV) {
   case "development":
    return process.env.MONGODB_DEV_URI;
   default:
    return process.env.MONGODB_DEV_URI;
  }
 }

 public static async connect() {
  if (Mongoose.mongodbUrl) {
   mongoose.connection.on("connected", () =>
    console.log(`Connected to database`)
   );
   if (process.env.NODE_ENV === "test") {
    console.log(`buffering disabled`);
    mongoose.set("bufferCommands", false);
    mongoose.set("bufferTimeoutMS", 10000);
   }
   mongoose.connection.on("error", (err) => {
    if (Mongoose.connection) {
     Mongoose.disconnect();
    }
   });
   await mongoose.connect(Mongoose.mongodbUrl);
   Mongoose.connection = mongoose.connection;
  }
 }

 public static async disconnect() {
  if (Mongoose.connection) await Mongoose.connection.close();
  Mongoose.connection = null;
  console.log("Database connection closed");
 }

 public static async checkHealth() {
  if (!Mongoose.connection) {
   return false;
  } else {
   return true;
  }
 }
}

export default Mongoose;
