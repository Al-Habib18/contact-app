/** @format */

import { Request, Response } from "express";
import { createContact, getContactByEmail } from "../lib";
import { createContactSchema } from "../schemas";

const createContactController = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({ message: "Name and email are required" });
        }

        // validate request body
        const { error } = createContactSchema.safeParse(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
        }

        // check if contact already exists

        const existingContact = await getContactByEmail(email);
        if (existingContact) {
            res.status(400).json({ message: "Contact already exists" });
        }

        // create contact
        const contact = await createContact({ name, email });
        if (!contact) {
            res.status(500).json({ message: "Contact creation failed" });
        } else {
            res.status(201).json({
                code: 201,
                message: "Contact created successfully",
                data: contact,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default createContactController;
