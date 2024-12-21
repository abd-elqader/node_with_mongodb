import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const dbName = "assignment9";

let client = null;
let database = null;

// Connect to MongoDB
export const db = async () => {
    try {
        if (!client) {
            client = await MongoClient.connect(uri);
            console.log("Connected to MongoDB");
        }
        if (!database) {
            database = client.db(dbName);
        }
        return database;
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
};