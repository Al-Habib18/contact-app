"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controllers_1 = require("../controllers");
router.post("/contacts", controllers_1.createContactController);
router.get("/contacts", controllers_1.getAllContactsController);
router.delete("/contacts", controllers_1.deleteListOfContactController);
router.get("/contacts/:id", controllers_1.getSingleContactController);
router.delete("/contacts/:id", controllers_1.deleteContactController);
router.put("/contacts/:id", controllers_1.updateContactController);
router.get("/contacts/dropdown", controllers_1.dropDownController);
router.get("/contacts/imports", controllers_1.contactImportController);
exports.default = router;
