"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
class Server {
    constructor() {
        this.app = express_1.default();
        this.dbConfig();
        this.config();
        this.setupRoutes();
    }
    config() {
        //Settings
        this.app.set('port', process.env.PORT || 3000);
        //middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    }
    dbConfig() {
        const MONGO_URI = 'mongodb://sa:Zew#ub#qC7@ds259377.mlab.com:59377/restapit';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(MONGO_URI || process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(db => console.log('Database Connected'))
            .catch(err => console.log('Error while connecting database'));
    }
    setupRoutes() {
        routes_1.registerRoutes(this.app);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
