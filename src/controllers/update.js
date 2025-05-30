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
const schemas_1 = require("../schemas");
const lib_1 = require("../lib");
const updateContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { error } = schemas_1.idSchema.safeParse(id);
        if (error) {
            res.status(400).json({ message: error.message });
        }
        // validate request body
        const { error: error2 } = schemas_1.updateContactSchema.safeParse(req.body);
        if (error2) {
            res.status(400).json({ message: error2.message });
        }
        // check if contact exists
        const contact = yield (0, lib_1.getContactById)(id);
        if (!contact) {
            res.status(404).json({ message: "Contact not found" });
        }
        else {
            const updatedContact = yield (0, lib_1.updateContact)(id, {
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
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = updateContactController;
