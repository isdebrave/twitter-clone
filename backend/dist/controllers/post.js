"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.registerComment = exports.comments = exports.views = exports.liked = exports.deletePost = exports.registerPost = exports.post = exports.posts = void 0;
var path_1 = __importDefault(require("path"));
var prismadb_1 = __importDefault(require("../libs/prismadb"));
var posts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, limit, posts_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, page = _a.page, limit = _a.limit;
                if (!page || !limit)
                    return [2 /*return*/];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismadb_1.default.post.findMany({
                        include: {
                            user: {
                                select: { id: true, username: true, profileImage: true },
                            },
                            comments: { select: { id: true } },
                        },
                        orderBy: { createdAt: "desc" },
                        skip: +page * +limit,
                        take: +limit,
                    })];
            case 2:
                posts_1 = _b.sent();
                return [2 /*return*/, res.status(200).json(posts_1)];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.posts = posts;
var post = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.params.postId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismadb_1.default.post.findUnique({
                        where: {
                            id: postId,
                        },
                        include: {
                            user: { select: { id: true, username: true, profileImage: true } },
                        },
                    })];
            case 2:
                post_1 = _a.sent();
                return [2 /*return*/, res.status(200).json(post_1)];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(400).json("해당 게시물이 존재하지 않습니다.")];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.post = post;
var registerPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, files, images, i, post_2, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = JSON.parse(req.body.data).body;
                if (!req.session.meId)
                    return [2 /*return*/, res.status(401).json("로그인이 필요합니다.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                files = req.files;
                images = [];
                for (i = 0; i < files.length; i++) {
                    images.push(path_1.default.join(files[i].location));
                }
                return [4 /*yield*/, prismadb_1.default.post.create({
                        data: {
                            body: body,
                            images: images,
                            userId: req.session.meId,
                        },
                        include: {
                            user: { select: { id: true, username: true, profileImage: true } },
                            comments: { select: { id: true } },
                        },
                    })];
            case 2:
                post_2 = _a.sent();
                return [2 /*return*/, res.status(201).json(post_2)];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.registerPost = registerPost;
var deletePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.body.postId;
                if (!req.session.meId)
                    return [2 /*return*/, res.status(401).json("로그인이 필요합니다.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismadb_1.default.post.delete({
                        where: { id: postId },
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json()];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
var liked = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, error_5, idx, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.body.postId;
                if (!req.session.meId)
                    return [2 /*return*/, res.status(401).json("로그인이 필요합니다.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismadb_1.default.post.findUnique({
                        where: { id: postId },
                    })];
            case 2:
                post = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.status(400).json("해당 게시물이 존재하지 않습니다.")];
            case 4:
                _a.trys.push([4, 6, , 7]);
                if (!post)
                    return [2 /*return*/, res.status(400).json("해당 게시물이 존재하지 않습니다.")];
                idx = post.likedIds.findIndex(function (userId) { return userId === req.session.meId; });
                if (idx === -1) {
                    post.likedIds.push(req.session.meId);
                }
                else {
                    post.likedIds.splice(idx, 1);
                }
                return [4 /*yield*/, prismadb_1.default.post.update({
                        where: { id: postId },
                        data: {
                            likedIds: post.likedIds,
                        },
                    })];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(200).json()];
            case 6:
                error_6 = _a.sent();
                console.log(error_6);
                next(error_6);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.liked = liked;
var views = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.body.postId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismadb_1.default.post.update({
                        where: { id: postId },
                        data: {
                            views: { increment: 1 },
                        },
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json()];
            case 3:
                error_7 = _a.sent();
                console.log(error_7);
                next(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.views = views;
var comments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, _a, page, limit, post_3, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                postId = req.params.postId;
                _a = req.query, page = _a.page, limit = _a.limit;
                if (!page || !limit)
                    return [2 /*return*/];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismadb_1.default.post.findUnique({
                        where: {
                            id: postId,
                        },
                        include: {
                            comments: {
                                include: {
                                    user: { select: { id: true, username: true, profileImage: true } },
                                },
                                orderBy: { createdAt: "desc" },
                                skip: +page * +limit,
                                take: +limit,
                            },
                        },
                    })];
            case 2:
                post_3 = _b.sent();
                if (!post_3)
                    throw new Error();
                return [2 /*return*/, res.status(200).json(post_3.comments)];
            case 3:
                error_8 = _b.sent();
                console.log(error_8);
                return [2 /*return*/, res.status(400).json("해당 게시물이 존재하지 않습니다.")];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.comments = comments;
var registerComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, body, comment, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = req.body.postId;
                body = JSON.parse(req.body.data).body;
                if (!req.session.meId)
                    return [2 /*return*/, res.status(401).json("로그인이 필요합니다.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismadb_1.default.comment.create({
                        data: {
                            body: body,
                            userId: req.session.meId,
                            postId: postId,
                        },
                        include: {
                            user: { select: { id: true, username: true, profileImage: true } },
                        },
                    })];
            case 2:
                comment = _a.sent();
                return [2 /*return*/, res.status(201).json(comment)];
            case 3:
                error_9 = _a.sent();
                console.log(error_9);
                next(error_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.registerComment = registerComment;
var deleteComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var commentId, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commentId = req.body.commentId;
                if (!req.session.meId)
                    return [2 /*return*/, res.status(401).json("로그인이 필요합니다.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismadb_1.default.comment.delete({
                        where: { id: commentId },
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json()];
            case 3:
                error_10 = _a.sent();
                console.log(error_10);
                next(error_10);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteComment = deleteComment;
//# sourceMappingURL=post.js.map