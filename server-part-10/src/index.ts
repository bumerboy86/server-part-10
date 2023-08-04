import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UsersController } from "./controllers/usersController";
import prisma from "./dataBase/prisma";
import { PostController } from "./controllers/postsController";
import helmet from "helmet";
import rateLimit from 'express-rate-limit'

dotenv.config();

class App {
    private app: Express;

    constructor () {
        this.app = express();
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static("public"));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(rateLimit({
                windowMs: 10 * 60 * 1000,
                max: 100,
                standardHeaders: true,
                legacyHeaders: false,
                message: {message :"Много запросов, попробуйте через 15 минут"}
            })
        );
    }

    public init = async () => {
        try {
            this.app.listen(process.env.API_PORT, () => {
                console.log(`server is started on port ${process.env.API_PORT}`);
            })
            this.app.use("/api/users", new UsersController(prisma).getRouter());
            this.app.use("/api/posts", new PostController(prisma).getRouter());
            process.on("beforeExit", async () => {
                await prisma.$disconnect();
            })
        } catch (error: unknown) {
            const err = error as Error;
            console.log(err.message);
        }
    }
}

export const app = new App();

app.init().then(() => {
    console.log("Server is ok");
}).catch(() => {
    console.log("server is not ok");
})