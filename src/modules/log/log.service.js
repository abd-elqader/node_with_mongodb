import { db } from "../../db/database.controller.js";

export const createLog = async (req, res, next) => {
    try {
        const database = await db();
        const logsCollection = database.collection("logs");
        const result = await logsCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const FetchLogs = async (req, res, next) => {
    try {
        const database = await db();
        const logsCollection = database.collection("logs");
        const logs = await logsCollection.find().toArray();
        res.json(logs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
