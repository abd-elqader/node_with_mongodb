import { db } from "../../db/database.controller.js";

export const createBook = async (req, res, next) => {
    try {
        const database = await db();
        const booksCollection = database.collection("books");
        const result = await booksCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const filterBook = async (req, res, next) => {
    try {
        const database = await db();
        const booksCollection = database.collection("books");
        const result = await booksCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const UpdateBook = async (req, res, next) => {
    console.log(req.params.title);
    
    try {
        const database = await db();
        const booksCollection = database.collection("books");
        const result = await booksCollection.updateOne(
            { title: req.params.title },
            { $set: req.body }
        );
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const DeleteBookByBefore = async (req, res, next) => {
    try {
        const year = parseInt(req.query.year, 10);
        const result = await booksCollection.deleteMany({
            year: { $lt: year },
        });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const DeleteBookByAfter = async (req, res, next) => {
    try {
        const pipeline = [
            { $match: { year: { $gt: 2000 } } },
            { $sort: { year: -1 } },
        ];
        const books = await booksCollection.aggregate(pipeline).toArray();
        res.json(books);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const createBluckBook = async (req, res, next) => {
    try {
        const database = await db();
        const booksCollection = database.collection("books");
        const result = await booksCollection.insertMany(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};