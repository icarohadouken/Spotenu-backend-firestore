import { UserDatabase } from '../Data/UserDatabase'
import { HashManager } from '../Services/HashManager'
import { Authenticator } from '../Services/Authenticator'
import { IdGenerator } from '../Services/IdGenerator'
import { User, stringToUserRole, UserRole } from '../Model/User'
import { InvalidParameterError } from '../Errors/InvalidParameterError'
import { UnauthorizedError } from '../Errors/UnauthorizedError'
import { GenericError } from '../Errors/GenericError'
import { NotFoundError } from '../Errors/NotFoundError'

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) { }

    public async signup(
        name: string,
        nickname: string,
        email: string,
        password: string,
    ) {
        if (!name || !email || !password || !nickname) {
            throw new InvalidParameterError("Missing input")
        }

        if (email.indexOf("@") === -1) {
            throw new InvalidParameterError("Invalid email")
        }

        if (password.length < 6) {
            throw new InvalidParameterError("Password must contain at least 6 characters")
        }

        const id = this.idGenerator.generate()

        const hashPassword = await this.hashManager.hash(password)

        await this.userDatabase.createUser(
            new User(id, name, nickname, email, hashPassword, UserRole.NORMAL)
        )

        const token = await this.authenticator.generateToken({
            id: id,
            role: UserRole.NORMAL
        })

        return { token }
    }

    public async signupAdmin(
        token: string,
        name: string,
        nickname: string,
        email: string,
        password: string,
    ) {
        if(!token){
            throw new UnauthorizedError("Missing access token")
        }

        const tokenData = this.authenticator.verifyToken(token)

        if(tokenData.role !== UserRole.ADMIN){
            throw new UnauthorizedError("You must be an admin to use this endpoint")
        }

        if (!name || !email || !password || !nickname) {
            throw new InvalidParameterError("Missing input")
        }

        if(password.length < 10){
            throw new InvalidParameterError("Your password must contain at least 10 characters")
        }

        const id = this.idGenerator.generate()

        const hashPassword = await this.hashManager.hash(password)

        await this.userDatabase.createUser(
            new User(id, name, nickname, email, hashPassword, UserRole.ADMIN)
        )
    }

    public async login(
        emailOrNickname: string,
        password: string
    ) {
        if (!emailOrNickname || !password) {
            throw new InvalidParameterError("Missing input")
        }

        const user = await this.userDatabase.getUserByEmailOrNickname(emailOrNickname)

        if (!user) {
            throw new NotFoundError("User not found")
        }

        const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword())

        if (!isPasswordCorrect) {
            throw new InvalidParameterError("Invalid Password")
        }

        const accessToken = this.authenticator.generateToken({
            id: user.getId(),
            role: user.getRole()
        })

        return {
            token: accessToken,
            role: user.getRole()
        }


    }
}