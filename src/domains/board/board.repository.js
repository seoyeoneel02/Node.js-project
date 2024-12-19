import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";
import { getBoardSql, getPostsSql } from "./board.sql.js";

export const getBoard = async () => {
    const conn = await pool.getConnection();
    try {
        const board = await pool.query(getBoardSql);
        if (board[0].length == 0) {
            return null;
        }else {
            return board;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const getPosts = async () => {
    const conn = await pool.getConnection();
    try {
        const posts = await pool.query(getPostsSql);
        if (posts[0].length == 0) {
            return null;
        }else {
            return posts;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const delPosts = async () => {
    const conn = await pool.getConnection();
    try {
        const posts = await pool.query(getPostsSql);
        if (posts[0].length == 0) {
            return null;
        }else {
            return posts;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}