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
exports.search = exports.deleteAlert = exports.removeFollow = exports.addFollow = exports.updateProfile = exports.profilePosts = exports.profile = exports.followLists = exports.me = void 0;
var path_1 = __importDefault(require("path"));
var me = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var me_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.session.meId)
                    return [2 /*return*/, res.status(200).json()];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: req.session.meId },
                        select: {
                            id: true,
                            username: true,
                            profileImage: true,
                            hasNotification: true,
                            followingIds: true,
                        },
                    })];
            case 2:
                me_1 = _a.sent();
                if (!me_1)
                    throw new Error();
                return [2 /*return*/, res.status(200).json(me_1)];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.me = me;
var followLists = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, followLists_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.user.findMany()];
            case 1:
                users = _a.sent();
                followLists_1 = users.filter(function (user) { return user.id !== req.session.meId; });
                return [2 /*return*/, res.status(200).json(followLists_1)];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.followLists = followLists;
var profile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findUnique({ where: { id: userId } })];
            case 2:
                profile_1 = _a.sent();
                return [2 /*return*/, res.status(200).json(profile_1)];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(400).json("해당 계정이 존재하지 않습니다.")];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.profile = profile;
var profilePosts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, page, limit, profilePosts_1, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                _a = req.query, page = _a.page, limit = _a.limit;
                if (!page || !limit)
                    return [2 /*return*/];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.post.findMany({
                        where: { userId: userId },
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    profileImage: true,
                                },
                            },
                            comments: { select: { id: true } },
                        },
                        orderBy: { createdAt: "desc" },
                        skip: +page * +limit,
                        take: +limit,
                    })];
            case 2:
                profilePosts_1 = _b.sent();
                return [2 /*return*/, res.status(200).json(profilePosts_1)];
            case 3:
                error_4 = _b.sent();
                console.log(error_4);
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.profilePosts = profilePosts;
var updateProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, bio, userId, user, error_5, coverImage, profileImage, files, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = JSON.parse(req.body.data), username = _a.username, bio = _a.bio;
                userId = req.params.userId;
                if (!req.session.meId)
                    return [2 /*return*/, res.status(401).json("로그인이 필요합니다.")];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findUnique({ where: { id: userId } })];
            case 2:
                user = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                console.log(error_5);
                return [2 /*return*/, res.status(400).json("해당 계정이 존재하지 않습니다.")];
            case 4:
                _b.trys.push([4, 6, , 7]);
                if (!user)
                    throw new Error();
                coverImage = user.coverImage;
                profileImage = user.profileImage;
                files = req.files;
                if (files.coverImage) {
                    coverImage = path_1.default.join(files.coverImage[0].location);
                }
                if (files.profileImage) {
                    profileImage = path_1.default.join(files.profileImage[0].location);
                }
                return [4 /*yield*/, prisma.user.update({
                        where: { id: userId },
                        data: {
                            username: username,
                            bio: bio,
                            coverImage: coverImage,
                            profileImage: profileImage,
                        },
                    })];
            case 5:
                _b.sent();
                return [2 /*return*/, res.status(200).json()];
            case 6:
                error_6 = _b.sent();
                console.log(error_6);
                next(error_6);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateProfile = updateProfile;
var addFollow = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var followerId, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                followerId = req.body.followerId;
                if (!req.session.meId)
                    return [2 /*return*/, res.status(401).json("로그인이 필요합니다.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.user.update({
                        where: { id: req.session.meId },
                        data: {
                            followingIds: { push: followerId },
                        },
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, prisma.user.update({
                        where: { id: followerId },
                        data: {
                            followerIds: { push: req.session.meId },
                        },
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json()];
            case 4:
                error_7 = _a.sent();
                console.log(error_7);
                next(error_7);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addFollow = addFollow;
var removeFollow = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var followerId, me, error_8, follower, error_9, updatedFollowingIds, updatedFollowerIds, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                followerId = req.body.followerId;
                if (!req.session.meId)
                    return [2 /*return*/, res.status(401).json("로그인이 필요합니다.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: req.session.meId },
                    })];
            case 2:
                me = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.log(error_8);
                return [2 /*return*/, res.status(400).json("해당 계정이 존재하지 않습니다.")];
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: followerId },
                    })];
            case 5:
                follower = _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_9 = _a.sent();
                console.log(error_9);
                return [2 /*return*/, res.status(400).json("팔로우 계정이 존재하지 않습니다.")];
            case 7:
                _a.trys.push([7, 10, , 11]);
                if (!me)
                    throw new Error();
                updatedFollowingIds = me.followingIds.filter(function (userId) { return userId !== followerId; });
                return [4 /*yield*/, prisma.user.update({
                        where: { id: req.session.meId },
                        data: { followingIds: updatedFollowingIds },
                    })];
            case 8:
                _a.sent();
                if (!follower)
                    throw new Error();
                updatedFollowerIds = follower.followerIds.filter(function (userId) { return userId !== req.session.meId; });
                return [4 /*yield*/, prisma.user.update({
                        where: { id: followerId },
                        data: { followerIds: updatedFollowerIds },
                    })];
            case 9:
                _a.sent();
                return [2 /*return*/, res.status(200).json()];
            case 10:
                error_10 = _a.sent();
                console.log(error_10);
                next(error_10);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.removeFollow = removeFollow;
var deleteAlert = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                if (!req.session.meId)
                    return [2 /*return*/, res.status(401).json("로그인이 필요합니다.")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.user.update({
                        where: { id: userId },
                        data: {
                            hasNotification: false,
                        },
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json()];
            case 3:
                error_11 = _a.sent();
                console.log(error_11);
                next(error_11);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteAlert = deleteAlert;
var search = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var value, users, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                value = req.body.value;
                return [4 /*yield*/, prisma.user.findMany({
                        where: {
                            username: {
                                contains: value,
                            },
                        },
                    })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json(users)];
            case 2:
                error_12 = _a.sent();
                console.log(error_12);
                next(error_12);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.search = search;
//# sourceMappingURL=user.js.map