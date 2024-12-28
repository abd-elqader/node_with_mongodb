import { db } from "../../db/database.controller.js";
import { authorModel } from "../../db/models/author.model.js";
import { bookModel } from "../../db/models/book.model.js";
// 1
export const createBookExplicit = async (req, res, next) => {
    try {
        await db
            .createCollection("books", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["title"],
                        properties: {
                            title: {
                                bsonType: "string",
                                description: "must be a non-empty string",
                            },
                        },
                    },
                },
            })
            .catch((err) => {
                if (err.codeName === "NamespaceExists") {
                    console.log("Collection 'books' already exists");
                } else {
                    throw err;
                }
            });

        res.status(201).json({
            success: true,
            ok: 1,
        });
    } catch (error) {
        console.error("Error creating collection:", error.message);
        res.status(500).json({
            success: false,
            error: "Failed to create collection.",
        });
    }
};
// 2
export const createAuthorImplicit = async (req, res, next) => {
    try {
        const author = await authorModel.insertOne(req.body);
        res.status(201).json({
            success: true,
            res: author,
        });
    } catch (error) {
        console.error("Error creating collection:", error.message);
        res.status(500).json({
            success: false,
            error: "Failed to create collection.",
        });
    }
};
// 3
export const createLogCapped = async (req, res, next) => {
    try {
        await db.createCollection("logs", {
            capped: true,
            size: 1024 * 1024,
        });
        res.status(201).json({
            message: "Capped collection created successfully",
        });
    } catch (error) {
        console.error("Error creating capped collection:", error);
        res.status(500).json({ error: "Failed to create capped collection" });
    }
};
// 4
export const createIndexforBook = async (req, res, next) => {
    try {
        await bookModel.createIndex({ title: 1 });
        res.status(201).json({
            message: "Index created successfully",
        });
    } catch (error) {
        console.error("Error creating index:", error);
        res.status(500).json({ error: "Failed to create index" });
    }
};