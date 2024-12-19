import { boardDTO, postsDTO } from "./board.dto.js";
import { getBoard, getPosts, delPosts } from "./board.repository.js";

export const getBoardService = async () => {
    const board = await getBoard();
    if (!board) {
        return boardDTO("등록된 게시글이 없습니다.");
    }
    return boardDTO(board);
}

export const getPostsService = async () => {
    const userId = req.decoded.userId;
    const posts = await getPosts(userId);
    return postsDTO(posts);
}

export const delPostsService = async () => {
    const userId = req.decoded.userId;
    const posts = await delPosts(userId);
    return postsDTO(posts);
}