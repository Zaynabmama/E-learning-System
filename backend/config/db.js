import mongoose from "mongoose";

const databaseConnection = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to database");
};

export default databaseConnection;
