"use strict";
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
const schemas_1 = require("../schemas");
const lib_1 = require("../lib");
const pagination_1 = __importDefault(require("../utils/pagination"));
const defaults_1 = __importDefault(require("../config/defaults"));
const types_1 = require("../types");
const getAllContactsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, page, sortTypeParam } = req.query;
        const data = {
            limit: limit ? Number(limit) : defaults_1.default.limit,
            page: page ? Number(page) : defaults_1.default.page,
            sortTypeParam: sortTypeParam === types_1.SortType.DESC ? types_1.SortType.DESC : types_1.SortType.ASC,
        };
        // validate query params
        const { error } = schemas_1.queryContactSchema.safeParse(data);
        if (error) {
            res.status(400).json({ message: error.message });
        }
        // get all contacts
        const contacts = yield (0, lib_1.getAllContacts)(data);
        if (!contacts) {
            res.status(404).json({ message: "Contacts not found" });
        }
        else {
            // create paginated response
            const totalItems = contacts.length;
            const pagination = (0, pagination_1.default)({
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
    }
    catch (err) {
        console.log("Error in getAllContactsController", err);
        res.status(500).json({ message: "Internal server error" });
        // next(err);
    }
});
exports.default = getAllContactsController;
