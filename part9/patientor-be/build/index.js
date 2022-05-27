"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3003;
const baseUrl = `/api`;
app.get(`${baseUrl}/ping`, (_req, res) => {
    res.status(200).send("pong");
});
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server started at http://localhost:${PORT}`);
});
