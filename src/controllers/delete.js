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
const deleteContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // validate id
        const { error } = schemas_1.idSchema.safeParse(id);
        if (error) {
            res.status(400).json({ message: error.message });
        }
        // check if contact exists
        const contact = yield (0, lib_1.getContactById)(id);
        if (!contact) {
            res.status(404).json({ message: "Contact not found" });
        }
        else {
            yield (0, lib_1.deleteContact)(id); // delete contact
        }
        res.status(200).json({
            code: 200,
            message: "Contact deleted successfully",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = deleteContactController;
