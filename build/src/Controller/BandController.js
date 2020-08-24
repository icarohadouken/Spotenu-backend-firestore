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
exports.BandController = void 0;
const BandDatabase_1 = require("../Data/BandDatabase");
const BandBusiness_1 = require("../Business/BandBusiness");
const HashManager_1 = require("../Services/HashManager");
const Authenticator_1 = require("../Services/Authenticator");
const IdGenerator_1 = require("../Services/IdGenerator");
class BandController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BandController.BandBusiness.signup(req.body.name, req.body.nickname, req.body.description, req.body.password, req.body.email);
                res.status(200).send({
                    message: "Band created"
                });
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
        });
    }
    getBands(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BandController.BandBusiness.getBands(req.headers.authorization);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
        });
    }
    approveBand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BandController.BandBusiness.authorizeBand(req.headers.authorization, req.query.id);
                res.status(200).send({
                    message: "Band approved sucessfully"
                });
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BandController.BandBusiness.login(req.body.login, req.body.password);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.errorCode || 400).send({ message: err.message });
            }
        });
    }
}
exports.BandController = BandController;
BandController.BandBusiness = new BandBusiness_1.BandBusiness(new BandDatabase_1.BandDatabase(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator(), new IdGenerator_1.IdGenerator());
//# sourceMappingURL=BandController.js.map