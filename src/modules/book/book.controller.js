import { Router } from "express";
import * as bookService from "./book.service.js";

export const bookRouter = Router();

// 5
bookRouter.post("/", bookService.createBook);
// 6
bookRouter.post("/batch", bookService.createBluckBook);
// 8
bookRouter.patch("/:title", bookService.UpdateBook);
// 9
bookRouter.get("/title", bookService.findByTitle);
// 10
bookRouter.get("/year", bookService.findAllByYear);
// 11
bookRouter.get("/genre", bookService.findAllByGenre);
// 12
bookRouter.get("/skip-limit", bookService.skipLimit);
// 13
bookRouter.get("/year-integer", bookService.yearInteger);
// 14
bookRouter.get("/exclude-genres", bookService.excludeGenres);
// 15
bookRouter.delete("/before-year", bookService.DeleteBookBeforeYear);
// 16
bookRouter.get("/aggregate1", bookService.aggregate1);
// 17
bookRouter.get("/aggregate2", bookService.aggregate2);
// 18
bookRouter.get("/aggregate3", bookService.aggregate3);
// 19
bookRouter.get("/aggregate4", bookService.aggregate4);
