"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const User_1 = require("../Model/User");
const InvalidParameterError_1 = require("../Errors/InvalidParameterError");
const UnauthorizedError_1 = require("../Errors/UnauthorizedError");
const NotFoundError_1 = require("../Errors/NotFoundError");
class UserBusiness {
    constructor(userDatabase, hashManager, authenticator, idGenerator) {
        this.userDatabase = userDatabase;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
    }
    signup(name, nickname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !email || !password || !nickname) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            if (email.indexOf("@") === -1) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid email");
            }
            if (password.length < 6) {
                throw new InvalidParameterError_1.InvalidParameterError("Password must contain at least 6 characters");
            }
            const id = this.idGenerator.generate();
            const hashPassword = yield this.hashManager.hash(password);
            yield this.userDatabase.createUser(new User_1.User(id, name, nickname, email, hashPassword, User_1.UserRole.NORMAL));
            const token = yield this.authenticator.generateToken({
                id: id,
                role: User_1.UserRole.NORMAL
            });
            return { token };
        });
    }
    signupAdmin(token, name, nickname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new UnauthorizedError_1.UnauthorizedError("Missing access token");
            }
            const tokenData = this.authenticator.verifyToken(token);
            if (tokenData.role !== User_1.UserRole.ADMIN) {
                throw new UnauthorizedError_1.UnauthorizedError("You must be an admin to use this endpoint");
            }
            if (!name || !email || !password || !nickname) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            if (password.length < 10) {
                throw new InvalidParameterError_1.InvalidParameterError("Your password must contain at least 10 characters");
            }
            const id = this.idGenerator.generate();
            const hashPassword = yield this.hashManager.hash(password);
            yield this.userDatabase.createUser(new User_1.User(id, name, nickname, email, hashPassword, User_1.UserRole.ADMIN));
        });
    }
    login(emailOrNickname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!emailOrNickname || !password) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            const user = yield this.userDatabase.getUserByEmailOrNickname(emailOrNickname);
            if (!user) {
                throw new NotFoundError_1.NotFoundError("User not found");
            }
            const isPasswordCorrect = yield this.hashManager.compare(password, user.getPassword());
            if (!isPasswordCorrect) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid Password");
            }
            const accessToken = this.authenticator.generateToken({
                id: user.getId(),
                role: user.getRole()
            });
            return {
                token: accessToken,
                role: user.getRole()
            };
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map