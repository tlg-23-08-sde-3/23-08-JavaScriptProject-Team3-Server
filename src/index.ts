import "dotenv/config";
import express from "express";
import cors from "cors";

import { connect } from "./db/mongodb.js";

/* API Routers */
import authRouter from "./routes/authRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* Use Routers */
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
    connect();
});
