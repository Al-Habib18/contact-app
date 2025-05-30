"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)()); //set corsOption
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/hello", (_req, res) => {
    res.json({ message: "hello world" });
});
// Use combined routes
app.use(routes_1.default);
/* app.use("*", (req, res) => {
    console.log("req_url:-", req.url);
    res.status(404).json({ message: "Route Not Found" });
}); */
app.use((err, _req, res) => {
    res.status(500).json({ message: err.message });
});
/*
app.use("*", (req, res) => {
    console.log("req_url:-", req.url);
    res.status(404).json({ message: "Route Not Found" });
}); */
const PORT = process.env.PORT || 3000;
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
