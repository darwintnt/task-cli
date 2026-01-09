import mongoose from "mongoose";

export const db = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
  } catch (error) {
    console.error("MongoDB Error.", error);
  }
};

mongoose.connection.on("error", (err) => console.log(err));

export const cnx = mongoose.connection;
