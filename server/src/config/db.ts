import mongoose from "mongoose";

export default async function connectDB(url: string) {
  try {
    await mongoose.connect(url);
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", () => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
}