/** @format */

import { Router } from "express";
const router = Router();
import {
    createContactController,
    getAllContactsController,
    deleteListOfContactController,
    deleteContactController,
    updateContactController,
    dropDownController,
    contactImportController,
    getSingleContactController,
} from "../controllers";

router.post("/contacts", createContactController);
router.get("/contacts", getAllContactsController);
router.delete("/contacts", deleteListOfContactController);

router.get("/contacts/:id", getSingleContactController);
router.delete("/contacts/:id", deleteContactController);
router.put("/contacts/:id", updateContactController);

router.get("/contacts/dropdown", dropDownController);
router.get("/contacts/imports", contactImportController);

export default router;
