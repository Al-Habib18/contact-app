/** @format */

import prisma from "../schemas/prisma";
import { Status } from "@prisma/client";
import { SortType } from "../types";
import defaults from "../config/defaults";

const getContactByEmail = (email: string) => {
    return prisma.contact.findUnique({
        where: {
            email: email,
        },
    });
};

const getContactById = (id: string) => {
    return prisma.contact.findUnique({
        where: {
            id: id,
        },
    });
};

const createContact = (data: { name: string; email: string }) => {
    return prisma.contact.create({
        data: {
            name: data.name,
            email: data.email,
        },
    });
};

const getAllContacts = async (data: {
    limit?: number | undefined;
    page?: number | undefined;
    sortTypeParam?: SortType;
}) => {
    if (data.page === undefined) data.page = defaults.page;
    if (data.limit === undefined) data.limit = defaults.limit;

    const contacts = await prisma.contact.findMany({
        skip: (data.page - 1) * data.limit,
        take: data.limit,
        orderBy: {
            createdAt: data.sortTypeParam,
        },
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
        },
    });
    if (!contacts) return [];
    return contacts;
};

const deleteContact = (id: string) => {
    return prisma.contact.delete({
        where: {
            id: id,
        },
    });
};

const updateContact = (
    id: string,
    data: { name?: string; email?: string; status?: Status }
) => {
    return prisma.contact.update({
        where: {
            id: id,
        },
        data: {
            name: data.name,
            email: data.email,
            status: data.status,
        },
    });
};

export {
    createContact,
    getContactByEmail,
    getContactById,
    getAllContacts,
    deleteContact,
    updateContact,
};
