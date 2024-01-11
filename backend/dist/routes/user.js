"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var user_1 = require("../controllers/user");
if (!fs_1.default.existsSync("uploads/profile")) {
    fs_1.default.mkdirSync("uploads/profile", { recursive: true });
}
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/profile");
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
var profileUpload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
var userRouter = express_1.default.Router();
userRouter.get("/me", user_1.me);
userRouter.get("/followLists", user_1.followLists);
userRouter.get("/profile/:userId", user_1.profile);
userRouter.get("/profile/:userId/post/all", user_1.profilePosts);
userRouter.patch("/profile/:userId", profileUpload.fields([{ name: "coverImage" }, { name: "profileImage" }]), user_1.updateProfile);
userRouter.post("/follow", user_1.addFollow);
userRouter.delete("/follow", user_1.removeFollow);
userRouter.delete("/alert", user_1.deleteAlert);
userRouter.post("/search", user_1.search);
exports.default = userRouter;
//# sourceMappingURL=user.js.map