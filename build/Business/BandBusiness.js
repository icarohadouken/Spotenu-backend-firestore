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
exports.BandBusiness = void 0;
const Band_1 = require("../Model/Band");
const InvalidParameterError_1 = require("../Errors/InvalidParameterError");
const UnauthorizedError_1 = require("../Errors/UnauthorizedError");
const GenericError_1 = require("../Errors/GenericError");
const NotFoundError_1 = require("../Errors/NotFoundError");
const User_1 = require("../Model/User");
class BandBusiness {
    constructor(bandDatabase, hashManager, authenticator, idGenerator) {
        this.bandDatabase = bandDatabase;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
    }
    signup(name, nickname, description, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !nickname || !description || !password) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            if (password.length < 6) {
                throw new InvalidParameterError_1.InvalidParameterError("Password must contain at least 6 characters");
            }
            const id = this.idGenerator.generate();
            const hashPassword = yield this.hashManager.hash(password);
            yield this.bandDatabase.createBand(new Band_1.Band(id, name, nickname, description, hashPassword, 0));
        });
    }
    getBands(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new UnauthorizedError_1.UnauthorizedError("Missing access token");
            }
            const tokenData = this.authenticator.verifyToken(token);
            if (tokenData.role !== User_1.UserRole.ADMIN) {
                throw new UnauthorizedError_1.UnauthorizedError("You must be an admin to use this endpoint");
            }
            const result = yield this.bandDatabase.getBands();
            return result;
        });
    }
    authorizeBand(token, bandId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new UnauthorizedError_1.UnauthorizedError("Missing access token");
            }
            const tokenData = this.authenticator.verifyToken(token);
            if (tokenData.role !== User_1.UserRole.ADMIN) {
                throw new UnauthorizedError_1.UnauthorizedError("You must be an admin to use this endpoint");
            }
            const checkBand = yield this.bandDatabase.getBandById(bandId);
            if ((checkBand === null || checkBand === void 0 ? void 0 : checkBand.getAuthorization()) === 1) {
                throw new GenericError_1.GenericError("Band already approved");
            }
            yield this.bandDatabase.approveBand(bandId);
        });
    }
    login(nickname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!nickname || !password) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            const band = yield this.bandDatabase.getBandByNickname(nickname);
            if (!band) {
                throw new NotFoundError_1.NotFoundError("Band not found");
            }
            const isPasswordCorrect = yield this.hashManager.compare(password, band.getPassword());
            if (!isPasswordCorrect) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid password");
            }
            if (band.getAuthorization() === 0) {
                throw new UnauthorizedError_1.UnauthorizedError("Band need to be approved by an admin");
            }
            const accessToken = this.authenticator.generateTokenBand({
                id: band.getId(),
                authorization: band.getAuthorization()
            });
            return { accessToken };
        });
    }
}
exports.BandBusiness = BandBusiness;
//# sourceMappingURL=BandBusiness.js.map