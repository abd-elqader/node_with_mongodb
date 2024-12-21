import { bookRouter } from "./modules/book/book.controller.js";
import { logRouter } from './modules/log/log.controller.js';

export const bootstrap = async (app, express) => {

    // ================ parse req
    app.use(express.json());
    // =============== routes =========
    // =============== logs
    app.use('/', bookRouter);
    app.use('/logs', logRouter);
    // =============== books

    app.get('/', (req, res, next) => {
        return res.json({message:"done done"})
    });
};