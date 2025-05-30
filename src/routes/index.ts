/** @format */

import { Router } from "express";
const router = Router();
import {
    createContactController,
    getAllContactsController,
    deleteListOfContactController,
    deleteContactController,
    updateContactController,
} from "../controllers";

router.post("/contacts", createContactController);
router.get("/contacts", getAllContactsController);
router.delete("/contacts", deleteListOfContactController);
router.delete("/contacts/:id", deleteContactController);
router.put("/contacts/:id", updateContactController);

export default router;
