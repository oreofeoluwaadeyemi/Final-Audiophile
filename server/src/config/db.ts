import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try{
      const conn = await mongoose.connect(
      process.env.MONGO_URI as string
    )

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch(error) {
    console.error(`❌ MongoDB Connection Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
//berreladeyemi_db_user
//7XsSqSxvEukCyqCK
//mongodb+srv://berreladeyemi_db_user:7XsSqSxvEukCyqCK@cluster0.bdsxmsd.mongodb.net/?appName=Cluster0
