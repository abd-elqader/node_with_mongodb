import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const dbName = "assignment9";

const client = new MongoClient(uri);
export const db = client.db(dbName);

export const connectDB = async () => {
    try {
        await client.connect();
        console.log("Database connected");
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        throw error;
    }
};
