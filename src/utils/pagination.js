"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaults_1 = __importDefault(require("../config/defaults"));
const getPagination = ({ totalItems = 0, limit = defaults_1.default.limit, page = defaults_1.default.page, }) => {
    const totalPage = Math.ceil(totalItems / limit);
    const pagination = {
        page,
        limit,
        totalItems,
        totalPage,
    };
    if (page < totalPage) {
        pagination.next = page + 1;
    }
    if (page > 1) {
        pagination.prev = page - 1;
    }
    return pagination;
};
exports.default = getPagination;
