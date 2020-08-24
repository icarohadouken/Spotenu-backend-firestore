import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import {userRouter} from './Router/UserRouter'
import {bandRouter} from './Router/BandRouter'
import {AddressInfo} from 'net'

dotenv.config()

export const app = express()

app.use(cors({origin: true}))

app.use(express.json())

const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://spotenu-e49aa.firebaseio.com"
});

export const db = admin.firestore();

const server = app.listen(process.env.PORT || 3006, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is runing in http://localhost:${address.port}`)
    } else {
        console.error(`Server Failure`)
    }
})

app.use(fileUpload())

app.use('/user/', userRouter)
app.use('/band/', bandRouter)