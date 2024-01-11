"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var notification_1 = require("../controllers/notification");
var notificationRouter = express_1.default.Router();
notificationRouter.get("/all", notification_1.notifications);
notificationRouter.post("/", notification_1.registerNotification);
notificationRouter.delete("/", notification_1.deleteNotification);
exports.default = notificationRouter;
//# sourceMappingURL=notification.js.map