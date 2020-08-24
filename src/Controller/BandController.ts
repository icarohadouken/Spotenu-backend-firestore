import { Request, Response } from 'express'
import {BandDatabase} from '../Data/BandDatabase'
import { BandBusiness } from '../Business/BandBusiness'
import { HashManager } from '../Services/HashManager'
import { Authenticator } from '../Services/Authenticator'
import { IdGenerator } from '../Services/IdGenerator'
import { Band } from '../Model/Band'
import { InvalidParameterError } from '../Errors/InvalidParameterError'
import { GenericError } from '../Errors/GenericError'
import { NotFoundError } from '../Errors/NotFoundError'

export class BandController{
    private static BandBusiness = new BandBusiness(
        new BandDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    )

    public async signup(req: Request, res: Response) {
        try{
            const result = await BandController.BandBusiness.signup(
                req.body.name,
                req.body.nickname,
                req.body.description,
                req.body.password,
                req.body.email
            )

            res.status(200).send({
                message: "Band created"
            })
        }
        catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }
        finally{
            await BandDatabase.destroyConnection()
        }
    }

    public async getBands(req: Request, res: Response) {
        try{
            const result = await BandController.BandBusiness.getBands(req.headers.authorization as string)

            res.status(200).send(result)
        }
        catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }
        finally {
            await BandDatabase.destroyConnection()
        }
    }

    public async approveBand(req: Request, res: Response) {
        try{
            await BandController.BandBusiness.authorizeBand(
                req.headers.authorization as string,
                req.query.id as string
            )

            res.status(200).send({
                message: "Band approved sucessfully"
            })
        }
        catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }
        finally {
            await BandDatabase.destroyConnection()
        }
    }

    public async login(req: Request, res: Response) {
        try{
            const result = await BandController.BandBusiness.login(
                req.body.login as string,
                req.body.password as string
            )

            res.status(200).send(result)
        }
        catch(err){
            res.status(err.errorCode || 400).send({message: err.message})
        }
        finally {
            await BandDatabase.destroyConnection()
        }
    }
}