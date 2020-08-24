"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Band = void 0;
class Band {
    constructor(id, name, nickname, description, password, authorization) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.description = description;
        this.password = password;
        this.authorization = authorization;
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
    getDescription() {
        return this.description;
    }
    getPassword() {
        return this.password;
    }
    getAuthorization() {
        return this.authorization;
    }
}
exports.Band = Band;
//# sourceMappingURL=Band.js.map