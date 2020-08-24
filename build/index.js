"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const admin = __importStar(require("firebase-admin"));
dotenv_1.default.config();
exports.app = express_1.default();
exports.app.use(cors_1.default({ origin: true }));
exports.app.use(express_1.default.json());
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