import { Db, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

export const connectDB = async (): Promise<Db> => {
  
  dotenv.config();
  //const mongouri: string = process.env._URL as string;
  const mongouri: string = "mongodb+srv://mgh99:mariagh99@cluster0.r1qlh.mongodb.net/Futbol?retryWrites=true&w=majority";
  const client = new MongoClient(mongouri);

  try {
    await client.connect();
    //console.info("MongoDB connected");
    return client.db("Futbol");
  } catch (e) {
    throw e;
  }
};