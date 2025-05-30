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
const deleteListOfContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids } = req.body;
        // Proper null/undefined check
        if (!Array.isArray(ids) || ids.length === 0) {
            res.status(400).json({ message: "Ids are required" });
        }
        // Validate with Zod
        const validation = schemas_1.listIdSchema.safeParse(ids);
        if (!validation.success) {
            res.status(400).json({ message: validation.error.message });
        }
        // Find which contacts exist
        const existingContacts = yield (0, lib_1.findContactsForDelete)(ids);
        const existingIds = existingContacts.map((c) => c.id);
        const notFoundIds = ids.filter((id) => !existingIds.includes(id));
        if (existingIds.length === 0) {
            res.status(404).json({ message: "No matching contacts found." });
        }
        // Delete existing ones only
        const result = yield (0, lib_1.deleteManyContacts)(existingIds);
        res.status(200).json({
            message: `${result.count} contact(s) deleted.`,
            notFoundIds,
        });
    }
    catch (err) {
        console.error("Delete Contacts Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = deleteListOfContactController;
