import mongoose from "mongoose";

async function conn(db_url: string) {
  try {
    await mongoose.connect(db_url)
    console.log("Connected to database")
  } catch (error: any) {
    console.log(error.message)
  }
}

export default conn;