import { BandController } from '../Controller/BandController'
import express from 'express'

export const bandRouter = express.Router()

bandRouter.post("/signup", new BandController().signup)
bandRouter.get("/", new BandController().getBands)
bandRouter.put("/approve/", new BandController().approveBand)
bandRouter.post("/login", new BandController().login)