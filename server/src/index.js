import express from "express";
import cors from "cors";

// Routes
import documentsRouter from "./routes/documents.js";
import queryRouter from "./routes/query.js";

// Requests from frontend
const app = express();
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

// APIs
app.use("/api/documents", documentsRouter);
app.use("/api/query", queryRouter);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`)
});
