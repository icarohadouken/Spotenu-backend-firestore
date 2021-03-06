"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const UserController_1 = require("../Controller/UserController");
const express_1 = __importDefault(require("express"));
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", new UserController_1.UserController().signup);
exports.userRouter.post("/signup/admin", new UserController_1.UserController().signupAdmin);
exports.userRouter.post("/login", new UserController_1.UserController().login);
//# sourceMappingURL=UserRouter.js.map