import { User } from "../models/usersModel.js";

export const hasWhiteSpace = (text: string) => {
    const re = /\s/g;
    return re.test(text);
};

export const getEmailFromSiteName = async (site: String) => {
    let email = null;

    try {
        const user = await User.findOne({ url: site });

        if (!user) {
            console.error(`No user found for site ${site}`);
        } else {
            email = user.email;
        }

    } catch (err) {
        console.error(`Cannot get user from db due to: ${err}`);
    }

    return email;
};
