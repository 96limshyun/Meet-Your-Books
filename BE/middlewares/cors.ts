import cors from "cors"

const corsMiddleware = cors({
    origin: ["http://localhost:5173", "https://www.meetyourbooks.shop"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
})

export default corsMiddleware