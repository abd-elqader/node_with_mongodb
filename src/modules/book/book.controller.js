import { Router } from "express";
import * as bookService from "./book.service.js";

export const bookRouter = Router();

bookRouter.post("collection/logs/capped", async (req, res, next) => {
    try {
        const database = await db(); 
        await database.createCollection("logs", {
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
});
bookRouter.post("/books", bookService.createBook);
bookRouter.post("/books/batch", bookService.createBluckBook);
bookRouter.get("/", bookService.filterBook);
bookRouter.patch("/:title", bookService.UpdateBook);
bookRouter.delete("/before-year", bookService.DeleteBookByBefore);
// bookRouter.get("/aggregate", bookService.DeleteBookByAfter);
// bookRouter.post("collection/books", bookService.createBookExplicit);
// bookRouter.post("collection/authors", bookService.createBookImplicit);
// bookRouter.post("collection/books/index", bookService.createIndex);
