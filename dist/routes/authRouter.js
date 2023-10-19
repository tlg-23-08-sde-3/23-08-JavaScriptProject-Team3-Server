import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/usersModel.js";
const router = express.Router();
router.post("/signup", async (req, res) => {
    const { email, password, url } = req.body;
    if (!email || !password || !url) {
        return res.status(400).send({ status: "Email, Password, and URL Required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ error: `User with email ${email} already exists` });
    }
    const existingURL = await User.findOne({ url });
    if (existingURL) {
        return res
            .status(400)
            .send({ error: `URL: '${url}' is already taken, please choose a different URL` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, url });
    res.send(newUser);
});
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Email or password missing!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(500).send({ error: "User not found!" });
    }
    if (!user.password) {
        return res.status(500).send({ error: "An unexpected error has happened!" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).send({ error: "Invalid password" });
    }
    res.send(user);
});
export default router;
