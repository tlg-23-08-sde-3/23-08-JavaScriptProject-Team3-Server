import "dotenv/config";
import express from "express";
import cors from "cors";

import { connect } from "./db/mongodb.js";

/* API Routers */
import authRouter from "./routes/authRouter.js";
import weddingRouter from "./routes/weddingsRouter.js";
import guestRouter from './routes/guestRouter.js';
import commentRouter from './routes/commentsRouter.js';
import photoRouter from './routes/photoRouter.js';
import registryRouter from './routes/registryRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* Use Routers */
app.use("/auth", authRouter);
app.use("/wedding", weddingRouter);
app.use("/guests", guestRouter);
app.use("/comments", commentRouter);
app.use("/gallery", photoRouter);
app.use("/registry", registryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
    connect();
});
