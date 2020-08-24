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
const index_1 = require("../index");
const User_1 = require("../Model/User");
class UserDatabase {
    toModel(dbModel) {
        return (dbModel &&
            new User_1.User(dbModel.id, dbModel.name, dbModel.nickname, dbModel.email, dbModel.password, dbModel.role));
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.db.collection('User').doc(user.getId()).set({
                id: user.getId(),
                name: user.getName(),
                nickname: user.getNickname(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            });
        });
    }
    getUserByEmailOrNickname(emailOrNickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = index_1.db.collection('User');
            const results = yield users.where('email', '==', emailOrNickname).get();
            const user = results.docs.map(doc => (Object.assign({}, doc.data())));
            if (!user[0]) {
                const nickname = yield users.where('nickname', '==', emailOrNickname).get();
                const userByNickname = nickname.docs.map(doc => (Object.assign({}, doc.data())));
                return this.toModel(userByNickname[0]);
            }
            return this.toModel(user[0]);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = index_1.db.collection('User');
            const results = yield users.where('id', "==", id).get();
            const user = results.docs.map(doc => (Object.assign({}, doc.data())));
            return this.toModel(user[0]);
        });
    }
}
exports.UserDatabase = UserDatabase;
//# sourceMappingURL=UserDatabase.js.map