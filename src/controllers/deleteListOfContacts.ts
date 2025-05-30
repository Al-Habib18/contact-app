/** @format */

import { Request, Response } from "express";
import { listIdSchema } from "../schemas";
import { deleteManyContacts, findContactsForDelete } from "../lib";

const deleteListOfContactController = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;

        // Proper null/undefined check
        if (!Array.isArray(ids) || ids.length === 0) {
            res.status(400).json({ message: "Ids are required" });
        }

        // Validate with Zod
        const validation = listIdSchema.safeParse(ids);
        if (!validation.success) {
            res.status(400).json({ message: validation.error.message });
        }

        // Find which contacts exist
        const existingContacts = await findContactsForDelete(ids);
        const existingIds = existingContacts.map((c) => c.id);
        const notFoundIds = ids.filter(
            (id: string) => !existingIds.includes(id)
        );

        if (existingIds.length === 0) {
            res.status(404).json({ message: "No matching contacts found." });
        }

        // Delete existing ones only
        const result = await deleteManyContacts(existingIds);

        res.status(200).json({
            message: `${result.count} contact(s) deleted.`,
            notFoundIds,
        });
    } catch (err) {
        console.error("Delete Contacts Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default deleteListOfContactController;
