/** @format */

import { Request, Response } from "express";
import { idSchema } from "../schemas";
import { deleteContact, getContactById } from "../lib";

const deleteContactController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // validate id
        const { error } = idSchema.safeParse(id);
        if (error) {
            res.status(400).json({ message: error.message });
        }

        // check if contact exists
        const contact = await getContactById(id);
        if (!contact) {
            res.status(404).json({ message: "Contact not found" });
        } else {
            await deleteContact(id); // delete contact
        }

        res.status(200).json({
            code: 200,
            message: "Contact deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default deleteContactController;
