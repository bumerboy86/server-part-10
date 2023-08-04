"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const usersController_1 = require("./controllers/usersController");
const prisma_1 = __importDefault(require("./dataBase/prisma"));
const postsController_1 = require("./controllers/postsController");
dotenv_1.default.config();
class App {
    constructor() {
        this.init = async () => {
            try {
                this.app.listen(process.env.API_PORT, () => {
                    console.log(`server is started on port ${process.env.API_PORT}`);
                });
                this.app.use("/api/users", new usersController_1.UsersController(prisma_1.default).getRouter());
                this.app.use("/api/posts", new postsController_1.PostController(prisma_1.default).getRouter());
                process.on("beforeExit", async () => {
                    await prisma_1.default.$disconnect();
                });
            }
            catch (error) {
                const err = error;
                console.log(err.message);
            }
        };
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static("public"));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
}
exports.app = new App();
exports.app.init().then(() => {
    console.log("Server is ok");
}).catch(() => {
    console.log("server is not ok");
});
