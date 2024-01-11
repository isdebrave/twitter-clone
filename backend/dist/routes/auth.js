"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../controllers/auth");
var authRouter = express_1.default.Router();
authRouter.post("/email", auth_1.email);
authRouter.post("/email/code", auth_1.code);
authRouter.post("/email/exist", auth_1.existedEmail);
authRouter.post("/phone", auth_1.phone);
authRouter.post("/register", auth_1.register);
authRouter.get("/google", auth_1.google);
authRouter.get("/google/callback", auth_1.googleCallback);
authRouter.get("/github", auth_1.github);
authRouter.get("/github/callback", auth_1.githubCallback);
authRouter.post("/login", auth_1.login);
authRouter.get("/logout", auth_1.logout);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map