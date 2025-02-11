import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import * as postMiddleware from "../middlewares/post.middleware.js";
import * as userMiddleware from "../middlewares/user.middleware.js";
const router = Router();

router.post("/create",
    userMiddleware.authUser,
    postMiddleware.handleFileUpload,
    postController.createPost
)

router.patch("/like/:postId",
    userMiddleware.authUser,
    postController.likePost
)

router.patch("/remove-like/:postId",
    userMiddleware.authUser,
    postController.removeLikePost
)

export default router;