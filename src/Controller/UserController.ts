import {Request, Response} from 'express'
import {UserRole, stringToUserRole} from '../Model/User'
import {UserBusiness} from '../Business/UserBusiness'
import { UserDatabase } from '../Data/UserDatabase'
import { Authenticator } from '../Services/Authenticator'
import { IdGenerator } from '../Services/IdGenerator'
import { HashManager } from '../Services/HashManager'
import { UnauthorizedError } from '../Errors/UnauthorizedError'

export class UserController {
    private static UserBusiness = new UserBusiness(
        new UserDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    )

    public async signup(req: Request, res: Response) {
        try{
            const result = await UserController.UserBusiness.signup(
                req.body.name,
                req.body.nickname,
                req.body.email,
                req.body.password
            )

            res.status(200).send(result)
        }
        catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }
    }

    public async signupAdmin(req: Request, res: Response) {
        try{
            const result = await UserController.UserBusiness.signupAdmin(
                req.headers.authorization as string,
                req.body.name,
                req.body.nickname,
                req.body.email,
                req.body.password,
            )

            res.status(200).send({
                message: "User created"
            })
        }
        catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }
    }

    public async login(req: Request, res: Response) {
        try{
            const result = await UserController.UserBusiness.login(
                req.body.login,
                req.body.password
            )

            res.status(200).send(result)
        }
        catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }
    }
}