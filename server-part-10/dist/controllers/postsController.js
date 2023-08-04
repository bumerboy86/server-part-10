"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const express_1 = __importDefault(require("express"));
class PostController {
    constructor(database) {
        this.getRouter = () => {
            return this.router;
        };
        this.getPosts = async (req, res) => {
            try {
                const users = await this.dataBase.post.findMany();
                return res.status(200).json(users);
            }
            catch (error) {
                const err = {
                    message: "Посты не найдены"
                };
                return res.status(400).send(err);
            }
        };
        this.addPost = async (req, res) => {
            try {
                const newUser = await this.dataBase.post.create({
                    data: req.body
                });
                return res.status(200).json(newUser);
            }
            catch (error) {
                const err = {
                    message: "ошибка создания поста"
                };
                return res.status(400).send(err);
            }
        };
        this.deletePost = async (req, res) => {
            try {
                const deletedUser = await this.dataBase.post.delete({
                    where: {
                        id: req.params.id
                    }
                });
                return res.status(200).json(deletedUser);
            }
            catch (error) {
                const err = {
                    message: "Пост не найден"
                };
                return res.status(400).send(err);
            }
        };
        this.updatePost = async (req, res) => {
            try {
                const newUser = await this.dataBase.post.update({
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
        this.router.get("/", this.getPosts);
        this.router.post("/", this.addPost);
        this.router.delete("/:id", this.deletePost);
        this.router.put("/:id", this.updatePost);
    }
}
exports.PostController = PostController;
