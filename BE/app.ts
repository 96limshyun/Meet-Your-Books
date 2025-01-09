import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import authRouter from "./routes/auth";
import openAIRouter from "./routes/openAI";
import commentRouter from "./routes/comment";
import favoriteRouter from "./routes/favorites";
import regionRouter from "./routes/region";
import libraryOpenAPIRouter from "./routes/libraryOpenAPI";

import corsMiddleware from "./middlewares/cors";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL!;
const app = express();
const port = 4000;

app.use(corsMiddleware);
app.use(bodyParser.json());

mongoose
    .connect(MONGO_URL, {
        autoIndex: true,
        bufferCommands: true,
    })
    .then(() => console.log("MongoDB 연결 성공"))
    .catch((err) => console.error("MongoDB 연결 실패:", err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
    console.log("MongoDB 연결 완료");
});

app.use("/", authRouter);
app.use("/", openAIRouter);
app.use("/", commentRouter);
app.use("/", favoriteRouter);
app.use("/", regionRouter);
app.use("/", libraryOpenAPIRouter);

app.listen(port, () => {
    console.log(port + "연결 완료");
});
