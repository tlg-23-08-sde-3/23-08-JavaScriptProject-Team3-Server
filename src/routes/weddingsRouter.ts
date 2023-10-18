import express from "express";
import { Wedding } from "../models/weddingsModel.js";
import { getEmailFromSiteName } from "../utils/utils.js";

const router = express.Router();

interface IWedding {
    _id: string;
    name1: string | undefined;
    name2: string | undefined;
    date: string | undefined;
    venue: string | undefined;
    image: string | undefined;
    story: string | undefined;
}

const placeholder = "/placeholder.jpg";

router.get("/:site", async (req, res) => {
    const { site } = req.params;
    const email = await getEmailFromSiteName(site);

    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }

    const wedding = await Wedding.findById(email);

    if (!wedding) {
        return res.status(400).send({ error: `Unable to find any wedding data.` });
    }

    res.send(wedding);
});

router.post("/:site", async (req, res) => {
    const { name1, name2, date, venue, image, story }: IWedding = req.body;
    const { site } = req.params;

    const email = await getEmailFromSiteName(site);

    if (!email) {
        return res
            .status(400)
            .send({ error: `Unable to find site, please verify you're using correct site name.` });
    }

    if (!name1 || !name2) {
        return res.status(400).send({ error: "One or more names missing!" });
    }

    try {
        const wedding = await Wedding.findByIdAndUpdate(
            email,
            {
                name1,
                name2,
                date,
                venue,
                image: image || placeholder,
                story,
            },
            {
                upsert: true,
                new: true,
            }
        );

        res.send(wedding);
    } catch (err) {
        console.error("Failed to create new entry in wedding collection", err);
        res.status(500).send({
            error: `Failed to add the wedding info to the database due to ${err}`,
        });
    }
});

export default router;
