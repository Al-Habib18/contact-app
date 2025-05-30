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
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const schemas_1 = require("../schemas");
const createContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({ message: "Name and email are required" });
        }
        // validate request body
        const { error } = schemas_1.createContactSchema.safeParse(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
        }
        // check if contact already exists
        const existingContact = yield (0, lib_1.getContactByEmail)(email);
        if (existingContact) {
            res.status(400).json({ message: "Contact already exists" });
        }
        // create contact
        const contact = yield (0, lib_1.createContact)({ name, email });
        if (!contact) {
            res.status(500).json({ message: "Contact creation failed" });
        }
        else {
            res.status(201).json({
                code: 201,
                message: "Contact created successfully",
                data: contact,
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = createContactController;
