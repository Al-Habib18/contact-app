/** @format */

import z from "zod";
import { SortType, Status } from "../types";

export const idSchema = z.string().uuid();

export const createContactSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
});

export const updateContactSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    status: z.nativeEnum(Status).optional(),
});

export const queryContactSchema = z.object({
    limit: z.number().optional(),
    page: z.number().optional(),
    sortTypeParam: z.nativeEnum(SortType).optional(),
});
