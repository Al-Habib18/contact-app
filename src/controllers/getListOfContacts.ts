/** @format */
import { NextFunction, Request, Response } from "express";
import { queryContactSchema } from "../schemas";
import { getAllContacts } from "../lib";
import getPagination from "../utils/pagination";
import defaults from "../config/defaults";
import { SortType } from "../types";

const getAllContactsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { limit, page, sortTypeParam } = req.query;
        const data = {
            limit: limit ? Number(limit) : defaults.limit,
            page: page ? Number(page) : defaults.page,
            sortTypeParam:
                sortTypeParam === SortType.DESC ? SortType.DESC : SortType.ASC,
        };

        // validate query params
        const { error } = queryContactSchema.safeParse(data);
        if (error) {
            res.status(400).json({ message: error.message });
        }

        // get all contacts
        const contacts = await getAllContacts(data);
        if (!contacts) {
            res.status(404).json({ message: "Contacts not found" });
        } else {
            // create paginated response
            const totalItems = contacts.length;
            const pagination = getPagination({
                totalItems,
                limit: data.limit,
                page: data.page,
            });
            // links
            console.log("req_url:-", req.path);

            const links = {
                self: `req.path/?page=${data.page}&limit=${data.limit}&sortTypeParam=${data.sortTypeParam}`,
                next: `req.path/?page=${pagination.next}&limit=${data.limit}&sortTypeParam=${data.sortTypeParam}`,
                prev: `req.path/?page=${pagination.prev}&limit=${data.limit}&sortTypeParam=${data.sortTypeParam}`,
            };

            // respose

            if (contacts.length === 0) {
                res.status(200).json({
                    code: 200,
                    message: "Contacts fetched successfully",
                    data: [],
                    pagination,
                    links,
                });
            }

            // return contacts
            res.status(200).json({
                code: 200,
                message: "Contacts fetched successfully",
                data: contacts,
                pagination,
                links,
            });
        }
    } catch (err) {
        console.log("Error in getAllContactsController", err);
        res.status(500).json({ message: "Internal server error" });
        // next(err);
    }
};

export default getAllContactsController;
