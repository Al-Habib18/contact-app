/** @format */

import { Request, Response } from "express";

const deleteListOfContactController = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "Contacts deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default deleteListOfContactController;
