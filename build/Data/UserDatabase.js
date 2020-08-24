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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const User_1 = require("../Model/User");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.tableName = "User";
    }
    toModel(dbModel) {
        return (dbModel &&
            new User_1.User(dbModel.id, dbModel.name, dbModel.nickname, dbModel.email, dbModel.password, dbModel.role));
    }
    createUser(user) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.getConnection.call(this)
                .insert(user)
                .into(this.tableName);
        });
    }
    getUserByEmailOrNickname(emailOrNickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select("*")
                .from(this.tableName)
                .where({ email: emailOrNickname });
            if (!result[0]) {
                const nickname = yield this.getConnection()
                    .select("*")
                    .from(this.tableName)
                    .where({ nickname: emailOrNickname });
                return this.toModel(nickname[0]);
            }
            return this.toModel(result[0]);
        });
    }
}
exports.UserDatabase = UserDatabase;
//# sourceMappingURL=UserDatabase.js.map