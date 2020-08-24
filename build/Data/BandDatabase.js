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
const BaseDatabase_1 = require("./BaseDatabase");
const Band_1 = require("../Model/Band");
class BandDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.tableName = "Band";
    }
    toModel(dbModel) {
        return (dbModel &&
            new Band_1.Band(dbModel.id, dbModel.name, dbModel.email, dbModel.nickname, dbModel.password, dbModel.authorization));
    }
    createBand(band) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert(band)
                .into(this.tableName);
        });
    }
    getBands() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select('id', 'name', 'nickname', 'authorization')
                .from(this.tableName);
            return result;
        });
    }
    getBandById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select('*')
                .from(this.tableName)
                .where({ id });
            return this.toModel(result[0]);
        });
    }
    getBandByNickname(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select('*')
                .from(this.tableName)
                .where({ nickname });
            return this.toModel(result[0]);
        });
    }
    approveBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .raw(`
                UPDATE ${this.tableName}
                SET authorization = true
                where id = '${id}'
            `);
        });
    }
}
exports.BandDatabase = BandDatabase;
//# sourceMappingURL=BandDatabase.js.map