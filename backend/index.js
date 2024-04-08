import express from "express";
import { PORT, MONGODBURL } from "./config.js"
import mongoose from "mongoose";
import BookRoute from "./routes/BooksRoute.js";
import cors from 'cors'

const app = express();

app.use(express.json())

// Middleware for Handling CORE POLICY
//option 1: Allow all Origins with default of cors(*)
//*g app.use(cors());

//option 2: Allow custom Origins
app.use(cors({
    origin: "https://localhost:3000",
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));



app.use('/books', BookRoute)


app.get('/', (req, res) => {
    return res.status(201).send("hello welcome")
})


mongoose
    .connect(MONGODBURL)
    .then(() => {
        console.log("App connected to Database");
        app.listen(PORT, () => {
            console.log(`Running on PORT :: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })