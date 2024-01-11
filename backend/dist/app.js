"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var dotenv_1 = __importDefault(require("dotenv"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var hpp_1 = __importDefault(require("hpp"));
var helmet_1 = __importDefault(require("helmet"));
var auth_1 = __importDefault(require("./routes/auth"));
var user_1 = __importDefault(require("./routes/user"));
var post_1 = __importDefault(require("./routes/post"));
var notification_1 = __importDefault(require("./routes/notification"));
var app = (0, express_1.default)();
dotenv_1.default.config();
if (process.env.NODE_ENV === "production") {
    app.use((0, morgan_1.default)("combined"));
    app.use((0, hpp_1.default)());
    app.use((0, helmet_1.default)());
}
else {
    app.use((0, morgan_1.default)("dev"));
}
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.DATABASE_URL }),
    // cookie: { httpOnly: true, secure: true },
}));
app.use("/auth", auth_1.default);
app.use("/user", user_1.default);
app.use("/post", post_1.default);
app.use("/notification", notification_1.default);
app.use(function (err, req, res, next) {
    res.status(500).json("서버 에러: 나중에 다시 시도해주세요.");
});
app.listen(8080, function () { return console.log("✅ Listening..."); });
//# sourceMappingURL=app.js.map