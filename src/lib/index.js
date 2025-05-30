"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = exports.deleteManyContacts = exports.deleteContact = exports.findContactsForDelete = exports.getAllContacts = exports.getContactById = exports.getContactByEmail = exports.createContact = void 0;
const prisma_1 = __importDefault(require("../schemas/prisma"));
const defaults_1 = __importDefault(require("../config/defaults"));
const getContactByEmail = (email) => {
    return prisma_1.default.contact.findUnique({
        where: {
            email: email,
        },
    });
};
exports.getContactByEmail = getContactByEmail;
const getContactById = (id) => {
    return prisma_1.default.contact.findUnique({
        where: {
            id: id,
        },
    });
};
exports.getContactById = getContactById;
const createContact = (data) => {
    return prisma_1.default.contact.create({
        data: {
            name: data.name,
            email: data.email,
        },
    });
};
exports.createContact = createContact;
const getAllContacts = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.page === undefined)
        data.page = defaults_1.default.page;
    if (data.limit === undefined)
        data.limit = defaults_1.default.limit;
    const contacts = yield prisma_1.default.contact.findMany({
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
    if (!contacts)
        return [];
    return contacts;
});
exports.getAllContacts = getAllContacts;
const findContactsForDelete = (ids) => {
    return prisma_1.default.contact.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
};
exports.findContactsForDelete = findContactsForDelete;
const deleteContact = (id) => {
    return prisma_1.default.contact.delete({
        where: {
            id: id,
        },
    });
};
exports.deleteContact = deleteContact;
const deleteManyContacts = (ids) => {
    return prisma_1.default.contact.deleteMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
};
exports.deleteManyContacts = deleteManyContacts;
const updateContact = (id, data) => {
    return prisma_1.default.contact.update({
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
exports.updateContact = updateContact;
