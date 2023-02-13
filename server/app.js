import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { connectDB } from "./db/connect.js";
import postsRouter from "./routes/posts.js";
import authRouter from "./routes/auth.js";


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));

app.get("/", (req, res) => res.send("Server Started"));
app.use("/auth", authRouter);
app.use('/posts', postsRouter);


const port = 5000 || process.env.PORT;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log(`Server started to listen on port ${port}`));
    }
    catch (error) {
        console.log(error.message);
    }

}
start();

