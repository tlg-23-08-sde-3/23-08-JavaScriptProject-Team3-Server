import express from "express";
import { PhotoList } from "../models/photoModel.js";
import { getEmailFromSiteName } from "../utils/utils.js";
const router = express.Router();
router.get("/:site", async (req, res) => {
    const { site } = req.params;
    const email = await getEmailFromSiteName(site);
    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }
    const photoList = await PhotoList.findById(email);
    if (!photoList) {
        return res.status(400).send({ error: "Unable to find PhotoList" });
    }
    res.send(photoList);
});
router.post("/:site", async (req, res) => {
    const { photos } = req.body;
    const { site } = req.params;
    const email = await getEmailFromSiteName(site);
    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }
    try {
        const photoList = await PhotoList.findByIdAndUpdate(email, {
            photos: photos || []
        }, {
            upsert: true,
            new: true,
        });
        res.send(photoList);
    }
    catch (e) {
        console.error("Failed to add photo to the list");
        res.status(500).send({
            error: `Failed to add photo to the database due to ${e}`,
        });
    }
});
export default router;
