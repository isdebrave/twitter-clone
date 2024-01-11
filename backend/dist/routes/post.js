"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var post_1 = require("../controllers/post");
if (!fs_1.default.existsSync("uploads/bodyImages")) {
    fs_1.default.mkdirSync("uploads/bodyImages", { recursive: true });
}
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/bodyImages");
    },
    filename: function (req, file, cb) {
        var ext = path_1.default.extname(file.originalname);
        var basename = path_1.default.basename(file.originalname, ext);
        cb(null, basename + "_" + Date.now() + ext);
    },
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/webp") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var bodyImagesUpload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
var commentFormData = (0, multer_1.default)();
var postRouter = express_1.default.Router();
postRouter.get("/all", post_1.posts);
postRouter.get("/:postId", post_1.post);
postRouter.post("/", bodyImagesUpload.array("bodyImages"), post_1.registerPost);
postRouter.delete("/", post_1.deletePost);
postRouter.post("/liked", post_1.liked);
postRouter.post("/views", post_1.views);
postRouter.get("/:postId/comment/all", post_1.comments);
postRouter.post("/:postId/comment", commentFormData.none(), post_1.registerComment);
postRouter.delete("/:postId/comment", post_1.deleteComment);
exports.default = postRouter;
//# sourceMappingURL=post.js.map