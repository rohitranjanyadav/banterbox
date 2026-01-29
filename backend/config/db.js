import mongoose from "mongoose";

export const connectDb = async (req, res) => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGO_URL || "");

    console.log("Database connected :", dbConnection.connection.host);
  } catch (error) {
    console.log("Error connecting to database");
    process.exit(1);
  }
};

export default connectDb;
