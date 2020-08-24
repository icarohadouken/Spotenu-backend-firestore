import {InvalidParameterError} from '../Errors/InvalidParameterError'

export enum UserRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export class User { 
    constructor(
        private id: string,
        private name: string,
        private nickname: string,
        private email: string,
        private password: string,
        private role: UserRole
    ) {}

    getId(): string{
        return this.id
    }

    getName(): string{
        return this.name
    }

    getNickname(): string{
        return this.nickname
    }

    getEmail(): string{
        return this.email
    }

    getPassword(): string{
        return this.password
    }

    getRole(): string{
        return this.role
    }
}

export const stringToUserRole = (input: string): UserRole => {
    switch (input) {
        case "NORMAL":
            return UserRole.NORMAL;
        case "ADMIN":
            return UserRole.ADMIN;
        default:
            throw new InvalidParameterError("Invalid user role");
    }
};