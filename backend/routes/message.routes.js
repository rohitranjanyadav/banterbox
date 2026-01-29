import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import uploadToCloudinary from "../middleware/cloudinaryUpload.js";
import {
  getMessages,
  getUsersForChatting,
  sendMessage,
} from "../controllers/message.controllers.js";

const messageRouter = Router();

messageRouter.get("/users", authMiddleware, getUsersForChatting);
messageRouter.get("/:id", authMiddleware, getMessages);

messageRouter.post(
  "/send/:receiverId",
  authMiddleware,
  uploadToCloudinary.single("media"),
  sendMessage,
);

export default messageRouter;
