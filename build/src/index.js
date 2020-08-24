"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRouter_1 = require("./Router/UserRouter");
const BandRouter_1 = require("./Router/BandRouter");
dotenv_1.default.config();
exports.app = express_1.default();
exports.app.use(cors_1.default({ origin: true }));
exports.app.use(express_1.default.json());
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://spotenu-e49aa.firebaseio.com",
    storageBucket: "spotenu-e49aa.appspot.com"
});
exports.db = admin.firestore();
const server = exports.app.listen(process.env.PORT || 3006, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is runing in http://localhost:${address.port}`);
    }
    else {
        console.error(`Server Failure`);
    }
});
exports.app.use(express_fileupload_1.default());
exports.app.use('/user/', UserRouter_1.userRouter);
exports.app.use('/band/', BandRouter_1.bandRouter);
//# sourceMappingURL=index.js.map