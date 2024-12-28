import { Router } from "express";
import * as collectionService from "./collection.service.js";


export const collectionRouter = Router();

// 1
collectionRouter.post("/books", collectionService.createBookExplicit);
// 2
collectionRouter.post("/authors", collectionService.createAuthorImplicit);
// 3
collectionRouter.post("/logs/capped", collectionService.createLogCapped);
// 4
collectionRouter.post("/books/index", collectionService.createIndexforBook);