import express from "express";
import { Book } from "../models/bookModel.js";

const router = express()

//route for save new book
router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "all field required title, author and publish Year" })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

//route for Get all books from DB
router.get("/", async (req, res) => {
    try {


        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            Data: books
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

// route for Get One Book from DB by id
router.get("/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(book)

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

//route for update Book
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "all field required title, author and publish Year" })
        }
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book successfully updated" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

//route for Delete Book
router.delete("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book successfully Deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})


export default router;