import express from "express";
import { CommentList } from "../models/commentModel.js";
import { getEmailFromSiteName } from "../utils/utils.js";
const router = express.Router();
router.get("/:site", async (req, res) => {
    const { site } = req.params;
    const email = await getEmailFromSiteName(site);
    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }
    const commentList = await CommentList.findById(email);
    if (!commentList) {
        return res.status(400).send({ error: "Unable to find CommentList" });
    }
    res.send(commentList);
});
router.post("/:site", async (req, res) => {
    const { name, comment } = req.body;
    const { site } = req.params;
    const email = await getEmailFromSiteName(site);
    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }
    try {
        const filter = { _id: email };
        const commentList = await CommentList.findOneAndUpdate({ "_id": email }, {
            $push: { "comments": { name, comment } }
        }, {
            upsert: true,
            new: true,
        });
        res.send(commentList);
    }
    catch (e) {
        console.error("Failed to add comment to the list");
        res.status(500).send({
            error: `Failed to add comment to the database due to ${e}`,
        });
    }
});
export default router;
