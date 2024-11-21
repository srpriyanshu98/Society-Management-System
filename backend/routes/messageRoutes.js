import express from "express";
import { admin } from "../middleware/authmiddleware.js";
import upload from "../middleware/upload.js";

import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controller/messagecontroller.js";

const router = express.Router();

router.get("/users", admin, getUsersForSidebar);
router.get("/:id", admin, getMessages);

router.post(
  "/send/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  admin,
  sendMessage
);

export default router;
