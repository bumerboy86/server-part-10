import { PrismaClient } from "@prisma/client";
import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";

export class UsersController {
    private router: Router;
    private dataBase: PrismaClient;

    constructor (database: PrismaClient) {
        this.dataBase = database;
        this.router = express.Router();
        this.router.get("/", this.getUsers);
        this.router.post("/", this.addUser);
        this.router.post("/login", this.loginUser);
        this.router.delete("/:id", this.deleteUser);
        this.router.put("/:id", this.updateUser);
    }

    public getRouter = () => {
        return this.router;
    }

    private getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.dataBase.user.findMany();
            return res.status(200).json(users);
        } catch (error) {
            const err = {
                message: "Пользователи не найдены"
            }
            return res.status(400).send(err);
        }
    }

    private loginUser = async (req: Request, res: Response) => {
        try {
            const user = await this.dataBase.user.findUnique({
                where: {email: req.body.email}
            });
            if (user) {
                const checkPass = bcrypt.compareSync(req.body.password, user.password);
                if (!checkPass) {
                    throw new Error("Пароль не верный");
                }
                return res.status(200).json(user);
            } else {
                throw new Error("Пользователь не найден")
            }
        } catch (error: unknown) {
            const errorCustom = error as Error;
            const err = {
                message: errorCustom.message
            }
            return res.status(400).send(err);
        }
    }

    private addUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,8}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const checkPass = regex.test(password);
            const checkEmail = emailRegex.test(email);
            if (!checkPass || !checkEmail) {
                throw new Error("пароль или email не верны")
            }
            const salt = process.env.SALT;
            const hashedPass = bcrypt.hashSync(password, Number(salt));
            const newUser = await this.dataBase.user.create({
                data: {
                    email,
                    password: hashedPass
                }
            })
            return res.status(200).json(newUser);
        } catch (error: unknown) {
            const errorCustom = error as Error;
            const err = {
                message: errorCustom.message
            }
            return res.status(400).send(err);
        }
    }

    private deleteUser = async (req: Request, res: Response) => {
        try {
            const deletedUser = await this.dataBase.user.delete({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json(deletedUser);
        } catch (error) {
            const err = {
                message: "Пользователь не найден"
            }
            return res.status(400).send(err);
        }
    }

    private updateUser = async (req: Request, res: Response) => {
        try {
            const newUser = await this.dataBase.user.update({
                where: {
                    id: req.params.id
                },
                data: req.body
            })
            return res.status(200).json(newUser);
        } catch (error) {
            const err = {
                message: "Ошибка данных"
            }
            return res.status(400).send(err);
        }
    }
}