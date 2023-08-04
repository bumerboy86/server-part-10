"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const express_1 = __importDefault(require("express"));
class UsersController {
    constructor(database) {
        this.getRouter = () => {
            return this.router;
        };
        this.getUsers = async (req, res) => {
            try {
                const users = await this.dataBase.user.findMany();
                return res.status(200).json(users);
            }
            catch (error) {
                const err = {
                    message: "Пользователи не найдены"
                };
                return res.status(400).send(err);
            }
        };
        this.addUser = async (req, res) => {
            try {
                const newUser = await this.dataBase.user.create({
                    data: req.body
                });
                return res.status(200).json(newUser);
            }
            catch (error) {
                const err = {
                    message: "ошибка создания пользователя"
                };
                return res.status(400).send(err);
            }
        };
        this.deleteUser = async (req, res) => {
            try {
                const deletedUser = await this.dataBase.user.delete({
                    where: {
                        id: req.params.id
                    }
                });
                return res.status(200).json(deletedUser);
            }
            catch (error) {
                const err = {
                    message: "Пользователь не найден"
                };
                return res.status(400).send(err);
            }
        };
        this.updateUser = async (req, res) => {
            try {
                const newUser = await this.dataBase.user.update({
                    where: {
                        id: req.params.id
                    },
                    data: req.body
                });
                return res.status(200).json(newUser);
            }
            catch (error) {
                const err = {
                    message: "Ошибка данных"
                };
                return res.status(400).send(err);
            }
        };
        this.dataBase = database;
        this.router = express_1.default.Router();
        this.router.get("/", this.getUsers);
        this.router.post("/", this.addUser);
        this.router.delete("/:id", this.deleteUser);
        this.router.put("/:id", this.updateUser);
    }
}
exports.UsersController = UsersController;
