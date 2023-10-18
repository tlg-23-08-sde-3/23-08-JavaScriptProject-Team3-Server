import express from "express";
import { RegistryList } from "../models/registryModel.js"
import { getEmailFromSiteName } from "../utils/utils.js";

const router = express.Router();

router.get("/:site", async (req, res) => {
    const {site} = req.params;
    const email = await getEmailFromSiteName(site);

    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }

    const registryList = await RegistryList.findById(email);

    if (!registryList) {
        return res.status(400).send({error: "Unable to find PhotoList"});
    }

    res.send(registryList);

});

router.post("/:site", async (req, res) => {
    const { registry } = req.body;
    const {site} = req.params;
    const email = await getEmailFromSiteName(site);

    if (!email) {
        return res.status(400).send({ error: `Unable to find site: ${site}.` });
    }

    try {

        const registryList = await RegistryList.findByIdAndUpdate(
            email,
            {
                registry
            },
            {
                upsert: true,
                new: true,
            }
        );

        res.send(registryList);
    } catch (e) {
        console.error("Failed to add item to the registry");
        res.status(500).send({
            error: `Failed to add item to the database due to ${e}`,
        });
    }

});


export default router;