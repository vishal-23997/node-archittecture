import { connect } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbConnection:Promise<void> = run().catch(err => console.log(err));

async function run(): Promise<void> {
    // Connect to MongoDB
    await connect(`${process.env.DB_URL}`);
    console.log("DB Connected");
}

export default dbConnection;

