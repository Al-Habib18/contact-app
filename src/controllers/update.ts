/** @format */

import { Request, Response } from "express";
import { idSchema, updateContactSchema } from "../schemas";
import { getContactById, updateContact } from "../lib";

const updateContactController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, status } = req.body;

        if (!id) {
            res.status(400).json({ message: "Id is required" });
        }

        if (!name && !email && !status) {
            res.status(400).json({ message: "At least one field is required" });
        }

        // validate id
        const { error } = idSchema.safeParse(id);
        if (error) {
            res.status(400).json({ message: error.message });
        }

        // validate request body
        const { error: error2 } = updateContactSchema.safeParse(req.body);
        if (error2) {
            res.status(400).json({ message: error2.message });
        }

        // check if contact exists
        const contact = await getContactById(id);
        if (!contact) {
            res.status(404).json({ message: "Contact not found" });
        } else {
            const updatedContact = await updateContact(id, {
                name,
                email,
                status,
            });
            res.status(200).json({
                code: 200,
                message: "Contact updated successfully",
                data: updatedContact,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default updateContactController;
