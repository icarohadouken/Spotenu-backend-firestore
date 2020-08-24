export class Band {
    constructor(
        private id: string,
        private name: string,
        private nickname: string,
        private description: string,
        private password: string,
        private authorization: number,
        private email: string
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

    getDescription(): string{
        return this.description
    }

    getPassword(): string{
        return this.password
    }

    getAuthorization(): number{
        return this.authorization
    }

    getEmail(): string{
        return this.email
    }
}