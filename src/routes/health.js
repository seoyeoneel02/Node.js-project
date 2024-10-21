import express from "express";
import { healthController } from "../domains/health/health.controller.js";

export const healthRoute = express.Router();

healthRoute.get('', healthController)