"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToUserRole = exports.User = exports.UserRole = void 0;
const InvalidParameterError_1 = require("../Errors/InvalidParameterError");
var UserRole;
(function (UserRole) {
    UserRole["NORMAL"] = "NORMAL";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User {
    constructor(id, name, nickname, email, password, role) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getNickname() {
        return this.nickname;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
}
exports.User = User;
exports.stringToUserRole = (input) => {
    switch (input) {
        case "NORMAL":
            return UserRole.NORMAL;
        case "ADMIN":
            return UserRole.ADMIN;
        default:
            throw new InvalidParameterError_1.InvalidParameterError("Invalid user role");
    }
};
//# sourceMappingURL=User.js.map