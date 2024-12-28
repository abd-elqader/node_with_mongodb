import { bookModel } from "../../db/models/book.model.js";
// 5
export const createBook = async (req, res, next) => {
    try {
        const book = await bookModel.insertOne(req.body);
        res.status(201).json({ success: true, data: book });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
// 6
export const createBluckBook = async (req, res, next) => {
    try {
        const books = await bookModel.insertMany(req.body);
        res.status(201).json({ success: true, data: books });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 8
export const UpdateBook = async (req, res, next) => {
    // console.log(req.params.title);
    try {
        const result = await bookModel.updateOne(
            { title: req.params.title },
            { $set: req.body }
        );
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 9
export const findByTitle = async (req, res, next) => {
    // console.log(req.query.title);
    try {
        const result = await bookModel.findOne({ title: req.query.title });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
// 10
export const findAllByYear = async (req, res, next) => {
    // console.log( Number(req.query.from), Number(req.query.to));
    try {
        const result = await bookModel
            .find({
                year: {
                    $gte: Number(req.query.from),
                    $lte: Number(req.query.to),
                },
            })
            .toArray();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
};
// 11
export const findAllByGenre = async (req, res, next) => {
    // console.log( req.query.genre );
    try {
        const result = await bookModel
            .find({ genres: { $eq: req.query.genre } })
            .toArray();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
};
// 12
export const skipLimit = async (req, res, next) => {
    // console.log( req.query.genre );
    try {
        const result = await bookModel
            .find({})
            .sort({ year: -1 })
            .skip(2)
            .limit(3)
            .toArray();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
};
// 13
export const yearInteger = async (req, res, next) => {
    try {
        const result = await bookModel
            .find({ year: { $type: "int" } })
            .toArray();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
};

// 14
export const excludeGenres = async (req, res, next) => {
    try {
        const result = await bookModel
            .find({
                genres: { $not: { $in: ["Horror", "Science Fiction"] } },
            })
            .toArray();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
};
// 15
export const DeleteBookBeforeYear = async (req, res, next) => {
    console.log( req.query.year );
    try {
        const result = await bookModel.deleteMany({
            year: { $lt: Number(req.query.year) },
        });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 16
export const aggregate1 = async (req, res, next) => {
    try {
        const result = await bookModel.aggregate([
            {
                $match: {
                    year: { $gt: 2000 }
                }
            },
            {
                $sort: {
                    year: -1
                }
            }
        ]).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 17
export const aggregate2 = async (req, res, next) => {
    try {
        const result = await bookModel.aggregate([
            {
                $match: {
                    year: { $gt: 2000 }
                }
            },
            {
                $project: {
                    _id: 0,
                    author: 1,
                    title: 1,
                    year: 1
                }
            }
        
        ]).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 18
export const aggregate3 = async (req, res, next) => {
    try {
        const result = await bookModel.aggregate([
            {
                $unwind: "$genres"
            }
        ]).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// 19
export const aggregate4 = async (req, res, next) => {
    try {
        const result = await bookModel.aggregate([
            {
                $lookup: {
                    from: "logs",
                    localField: "_id",
                    foreignField: "book_id",
                    as: "bookLogs",
                },
            },
            {
                $project: {
                    _id: 0,
                    action: { $arrayElemAt: ["$bookLogs.action", 0] },
                    book_details: {
                        title: "$title",
                        author: "$author",
                        year: "$year",
                    },
                },
            },
        ]).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};