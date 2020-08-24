"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const jwt = __importStar(require("jsonwebtoken"));
class Authenticator {
    generateToken(input) {
        const token = jwt.sign({
            id: input.id,
            role: input.role
        }, process.env.JWT_KEY, {
            expiresIn: Authenticator.EXPIRES_IN
        });
        return token;
    }
    generateTokenBand(input) {
        const token = jwt.sign({
            id: input.id,
            authorization: input.authorization
        }, process.env.JWT_KEY, {
            expiresIn: Authenticator.EXPIRES_IN
        });
        return token;
    }
    verifyToken(token) {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        const result = {
            id: payload.id,
            role: payload.role,
            authorization: payload.authorization
        };
        return result;
    }
}
exports.Authenticator = Authenticator;
Authenticator.EXPIRES_IN = "1day";
//# sourceMappingURL=Authenticator.js.map