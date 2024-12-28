import { logModel } from "../../db/models/log.model.js";
// 7
export const createLog = async (req, res, next) => {
    try {
        const log = await logModel.insertOne(req.body);
        res.status(201).json(log);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};