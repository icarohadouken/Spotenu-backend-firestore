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
exports.BandDatabase = void 0;
const index_1 = require("../index");
const Band_1 = require("../Model/Band");
class BandDatabase {
    constructor() {
        this.tableName = "Band";
    }
    toModel(dbModel) {
        return (dbModel &&
            new Band_1.Band(dbModel.id, dbModel.name, dbModel.nickname, dbModel.description, dbModel.password, dbModel.authorization, dbModel.email));
    }
    createBand(band) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.db.collection("Band").doc(band.getId()).set({
                id: band.getId(),
                name: band.getName(),
                nickname: band.getNickname(),
                email: band.getEmail(),
                description: band.getDescription(),
                password: band.getPassword(),
                authorization: band.getAuthorization()
            });
        });
    }
    getBands() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.db.collection('Band').get();
            return result.docs.map(band => ({
                id: band.data().id,
                name: band.data().name,
                nickname: band.data().nickname,
                email: band.data().email,
                authorization: band.data().authorization
            }));
        });
    }
    getBandById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.db.collection('Band').where('id', "==", id).get();
            const band = result.docs.map(band => (Object.assign({}, band.data())));
            return this.toModel(band[0]);
        });
    }
    loginBand(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.db.collection('Band').where('email', "==", login).get();
            const band = result.docs.map(band => (Object.assign({}, band.data())));
            if (!band[0]) {
                const nickname = yield index_1.db.collection('Band').where('nickname', "==", login).get();
                const bandByNickname = nickname.docs.map(band => (Object.assign({}, band.data())));
                return this.toModel(bandByNickname[0]);
            }
            return this.toModel(band[0]);
        });
    }
    approveBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.db.collection("Band").doc(id).update({ authorization: true });
        });
    }
}
exports.BandDatabase = BandDatabase;
//# sourceMappingURL=BandDatabase.js.map