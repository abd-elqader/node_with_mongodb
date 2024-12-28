import { connectDB } from "./db/database.controller.js";
import { bookRouter } from "./modules/book/book.controller.js";
import { collectionRouter } from "./modules/collection/collection.controller.js";
import { logRouter } from './modules/log/log.controller.js';

export const bootstrap = async (app, express) => {
    connectDB();
    // ================ parse req
    app.use(express.json());
    // =============== routes =========
    // =============== logs
    app.use('/collection', collectionRouter);
    app.use('/books', bookRouter);
    app.use('/logs', logRouter);
    // =============== books
    
    app.get('/', (req, res, next) => {
        return res.json({message:"done done"})
    });
};