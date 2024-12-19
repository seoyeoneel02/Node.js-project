import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { getBoardService, getPostsService, delPostsService } from "./board.service.js";

export const getBoardController = async (req, res, next) => {
  console.log("게시판 메인페이지를 조회합니다!");
  res.send(response(status.SUCCESS, await getBoardService()));
}

export const getPostsController = async (req, res, next) => {
  console.log("게시글을 조회합니다!");
  res.send(response(status.SUCCESS, await getPostsService()));
}

export const delPostsController = async (req, res, next) => {
  console.log("게시글 삭제를 요청했습니다!");
  res.send(response(status.SUCCESS, await delPostsService()));
}