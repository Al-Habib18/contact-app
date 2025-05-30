/** @format */

import { Request, Response } from "express";

export const dropDownController = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            code: 200,
            message: "Data retrived successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default dropDownController;
