"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryContactSchema = exports.updateContactSchema = exports.createContactSchema = exports.emailSchema = exports.listIdSchema = exports.idSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const types_1 = require("../types");
exports.idSchema = zod_1.default.string().uuid();
exports.listIdSchema = zod_1.default.array(exports.idSchema);
exports.emailSchema = zod_1.default.string().email();
exports.createContactSchema = zod_1.default.object({
    name: zod_1.default.string().min(3).max(50),
    email: zod_1.default.string().email(),
});
exports.updateContactSchema = zod_1.default.object({
    name: zod_1.default.string().min(1).optional(),
    email: zod_1.default.string().email().optional(),
    status: zod_1.default.nativeEnum(types_1.Status).optional(),
});
exports.queryContactSchema = zod_1.default.object({
    limit: zod_1.default.number().optional(),
    page: zod_1.default.number().optional(),
    sortTypeParam: zod_1.default.nativeEnum(types_1.SortType).optional(),
});
