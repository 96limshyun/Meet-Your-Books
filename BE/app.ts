import express from "express"
import authRouter from "./routes/auth";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import openAIRouter from "./routes/openAI";

dotenv.config();

const app = express()
const port = 4000;

app.use(cors())
app.use(bodyParser.json())

app.use("/", authRouter)
app.use("/", openAIRouter)

app.listen(port, () => {
    console.log(port + "연결 완료")
})