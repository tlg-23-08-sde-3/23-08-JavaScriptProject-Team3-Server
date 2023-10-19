import express from "express";
import { GuestList, IGuest } from "../models/guestModel.js";
import { getEmailFromSiteName } from "../utils/utils.js";

const router = express.Router();

router.get("/:site", async (req, res) => {
    const { site } = req.params;
    const email = await getEmailFromSiteName(site);

    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }

    const guestList = await GuestList.findById(email);

    if (!guestList) {
        return res.status(400).send({ error: "Unable to find GuestList" });
    }

    res.send(guestList);
});

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

/* Single guest update from the public site */
router.post("/update/:site", async (req, res) => {
    const { name, attending, plusOne } = req.body;

    const { site } = req.params;
    const email = await getEmailFromSiteName(site);

    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }

    if (!name) {
        return res.status(400).send({ error: "Gust Name is required!" });
    }

    try {
        const updateInfo = await GuestList.updateOne(
            {
                guests: { $elemMatch: { name: name } },
            },
            {
                $set: { "guests.$.attending": attending, "guests.$.plusOne": plusOne },
            },
            {
                new: true,
            }
        );
        

        // Send response after the update
        if (updateInfo.matchedCount === 1) {
            if (updateInfo.modifiedCount === 1) {
                return res.send({ info: "RSVP updated successfully!" });
            } else {
                return res.send({ info: "RSVP already up-to-date! No new changes!" });
            }
        } else {
            return res.send({ error: "No matching RSVP found" });
        }
    } catch (e) {
        console.error("Failed to get the guestList: ", e);
        return res.status(500).send({ error: `Failed to get the GuestList due to ${e}` });
    }

});

export default router;
