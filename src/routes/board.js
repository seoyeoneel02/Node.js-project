import express from "express";
import asyncHandler from "express-async-handler";
import { tokenAuth } from "../middlewares/token.auth.js";
import { getBoardController, getPostsController, delPostsController } from "../domains/board/board.controller.js";

export const boardRoute = express.Router();

boardRoute.get('', asyncHandler(getBoardController));
boardRoute.get('/:postsId', tokenAuth, asyncHandler(getPostsController));
boardRoute.delete('/:postsId', tokenAuth, asyncHandler(delPostsController));