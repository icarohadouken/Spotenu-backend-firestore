"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const BaseError_1 = require("./BaseError/BaseError");
class UnauthorizedError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 403);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=UnauthorizedError.js.map