"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_http_1 = __importDefault(require("serverless-http"));
const index_1 = require("./index");
require("mysql");
exports.handler = serverless_http_1.default(index_1.app);
//# sourceMappingURL=lambda.js.map