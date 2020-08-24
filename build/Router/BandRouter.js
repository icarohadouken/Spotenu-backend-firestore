"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bandRouter = void 0;
const BandController_1 = require("../Controller/BandController");
const express_1 = __importDefault(require("express"));
exports.bandRouter = express_1.default.Router();
exports.bandRouter.post("/signup", new BandController_1.BandController().signup);
exports.bandRouter.get("/", new BandController_1.BandController().getBands);
exports.bandRouter.put("/approve/", new BandController_1.BandController().approveBand);
exports.bandRouter.post("/login", new BandController_1.BandController().login);
//# sourceMappingURL=BandRouter.js.map