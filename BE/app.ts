import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import authRouter from "./routes/auth";
import openAIRouter from "./routes/openAI";
import regionRouter from "./routes/region";
import commentRouter from "./routes/comment";
import favoriteRouter from "./routes/favorites";
import libraryOpenAPIRouter from "./routes/libraryOpenAPI";

import corsMiddleware from "./middlewares/cors";

import { MONGODB_CONNECT_MESSAGE, PORT } from "./constants";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL!;
const app = express();

app.use(corsMiddleware);
app.use(bodyParser.json());

mongoose
    .connect(MONGO_URL, {
        autoIndex: true,
        bufferCommands: true,
    })
    .then(() => console.log(MONGODB_CONNECT_MESSAGE.CONNECT_SUCCESSFUL))
    .catch((err) => console.error(MONGODB_CONNECT_MESSAGE.CONNECT_FAILED, err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, MONGODB_CONNECT_MESSAGE.CONNECT_FAILED));
db.once("open", async () => {
    console.log(MONGODB_CONNECT_MESSAGE.CONNECT_SUCCESSFUL);
});

app.use("/", authRouter);
app.use("/", openAIRouter);
app.use("/", commentRouter);
app.use("/", favoriteRouter);
app.use("/", regionRouter);
app.use("/", libraryOpenAPIRouter);

app.listen(PORT, () => {
    console.log(PORT + "연결 완료");
});
