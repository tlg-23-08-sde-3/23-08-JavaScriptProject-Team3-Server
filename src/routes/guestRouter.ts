import express from "express";
import { GuestList } from "../models/guestModel.js";
import { getEmailFromSiteName } from "../utils/utils.js";

const router = express.Router();

router.get("/:site", async (req, res) => {
    const {site} = req.params;
    const email = await getEmailFromSiteName(site); 

    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }

    const guestList = await GuestList.findById(email);

    if (!guestList) {
        return res.status(400).send({error: "Unable to find GuestList"});
    }

    res.send(guestList);
})

router.post("/:site", async (req, res) => {
    const { guests } = req.body;
    const { site } = req.params;
    const email = await getEmailFromSiteName(site);

    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }

    try {
        const guestList = await GuestList.findByIdAndUpdate(
            email,
            {
                guests: guests || [],
            },
            {
                upsert: true,
                new: true,
            }
        );

        res.send(guestList);
    } catch (e) {
        console.error("Failed to add guests to the list");
        res.status(500).send({
            error: `Failed to add guests to the database due to ${e}`,
        });
    }
});

export default router;
