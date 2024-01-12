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
exports.logout = exports.login = exports.githubCallback = exports.github = exports.googleCallback = exports.google = exports.register = exports.phone = exports.existedEmail = exports.code = exports.email = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var axios_1 = __importDefault(require("axios"));
var prismadb_1 = __importDefault(require("../libs/prismadb"));
dotenv_1.default.config();
var email = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, min, max, code, expiration, transporter, options, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.id;
                min = 100000;
                max = 999999;
                code = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
                expiration = Date.now() + 1000 * 60 * 60 * 2;
                req.session.code = code;
                req.session.expiration = expiration;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.NODEMAILER_USER,
                        pass: process.env.NODEMAILER_PASSWORD,
                    },
                });
                options = {
                    from: process.env.NODEMAILER_USER,
                    to: email,
                    subject: "Twitter \uC778\uC99D \uCF54\uB4DC\uB294 ".concat(code, "\uC785\uB2C8\uB2E4"),
                    html: "\n        <h1>\uC774\uBA54\uC77C \uC8FC\uC18C \uD655\uC778\uD558\uAE30</h1>\n        <pre>\n            Twitter \uACC4\uC815\uC744 \uC0DD\uC131\uD558\uAE30 \uC804 \uAC70\uCCD0\uC57C \uD560 \uAC04\uB2E8\uD55C \uB2E8\uACC4\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uC774 \uC774\uBA54\uC77C\n            \uC8FC\uC18C\uAC00 \uB9DE\uB294\uC9C0 \uD655\uC778\uD574\uC57C \uD569\uB2C8\uB2E4. \uACC4\uC815\uC5D0 \uC4F0\uC77C \uC62C\uBC14\uB978 \uC8FC\uC18C\uAC00 \uB9DE\uB294\uC9C0 \uD655\uC778\uD574\n            \uC8FC\uC138\uC694.\n        </pre>\n        <pre>\n            X\uB97C \uC2DC\uC791\uD558\uB824\uBA74 \uB2E4\uC74C \uC778\uC99D \uCF54\uB4DC\uB97C \uC785\uB825\uD558\uC138\uC694.\n            <span style=\"font-size: 26px\">".concat(code, "</span>\n            \uC778\uC99D \uCF54\uB4DC\uB294 2\uC2DC\uAC04 \uD6C4\uC5D0 \uB9CC\uB8CC\uB429\uB2C8\uB2E4.\n        </pre>\n        <pre>\n            \uAC10\uC0AC\uD569\uB2C8\uB2E4.\n            Twitter\n        </pre>\n      "),
                };
                return [4 /*yield*/, transporter.sendMail(options)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json()];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.email = email;
var code = function (req, res) {
    var code = req.body.code;
    if (code !== req.session.code) {
        return res.status(401).json("코드가 틀렸습니다. 다시 시도해주세요.");
    }
    if (Date.now() > req.session.expiration) {
        return res.status(401).json("코드가 만료되었습니다. 다시 시도해주세요.");
    }
    return res.status(200).json();
};
exports.code = code;
var existedEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prismadb_1.default.user.findUnique({ where: { email: email } })];
            case 2:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, res.status(401).json("이미 등록된 이메일입니다.")];
                }
                return [2 /*return*/, res.status(200).json()];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.existedEmail = existedEmail;
var phone = function (req, res) { };
exports.phone = phone;
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, birth, password, hashedPassword, user, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.id, birth = _a.birth, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, bcrypt_1.default.hash(password, 12)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prismadb_1.default.user.create({
                        data: {
                            name: name,
                            username: name,
                            email: email,
                            birth: birth,
                            hashedPassword: hashedPassword,
                        },
                    })];
            case 3:
                user = _b.sent();
                req.session.meId = user.id;
                return [2 /*return*/, res.status(201).json()];
            case 4:
                error_3 = _b.sent();
                console.log(error_3);
                next(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var google = function (req, res) {
    var base_url = "https://accounts.google.com/o/oauth2/v2/auth";
    var config = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        response_type: "code",
        scope: process.env.GOOGLE_SCOPE,
    };
    var config_url = new URLSearchParams(config).toString();
    var final_url = "".concat(base_url, "?").concat(config_url);
    return res.redirect(final_url);
};
exports.google = google;
var googleCallback = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var base_url, config, config_url, final_url, tokenRequest, access_token, api_url, googleUser, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                base_url = "https://oauth2.googleapis.com/token";
                config = {
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    code: req.query.code,
                    grant_type: "authorization_code",
                    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
                };
                config_url = new URLSearchParams(config).toString();
                final_url = "".concat(base_url, "?").concat(config_url);
                return [4 /*yield*/, axios_1.default.post(final_url, null, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    })];
            case 1:
                tokenRequest = (_a.sent()).data;
                if (!tokenRequest.access_token) return [3 /*break*/, 6];
                access_token = tokenRequest.access_token;
                api_url = "https://www.googleapis.com/oauth2/v2/userinfo?access_token=".concat(access_token);
                return [4 /*yield*/, axios_1.default.get(api_url, {
                        headers: {
                            Authorization: "Bearer ".concat(access_token),
                        },
                    })];
            case 2:
                googleUser = (_a.sent()).data;
                return [4 /*yield*/, prismadb_1.default.user.findUnique({
                        where: { email: googleUser.email },
                    })];
            case 3:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 5];
                return [4 /*yield*/, prismadb_1.default.user.create({
                        data: {
                            name: googleUser.name,
                            username: googleUser.name,
                            email: googleUser.email,
                            profileImage: googleUser.picture,
                            account: {
                                create: {
                                    type: "google",
                                    providerId: googleUser.id + "",
                                },
                            },
                        },
                    })];
            case 4:
                user = _a.sent();
                _a.label = 5;
            case 5:
                req.session.meId = user.id;
                return [2 /*return*/, res.redirect("".concat(req.app.get("frontendUrl"), "/home"))];
            case 6: return [2 /*return*/, res.redirect("".concat(req.app.get("frontendUrl"), "/auth"))];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _a.sent();
                console.log(err_1);
                next(err_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.googleCallback = googleCallback;
var github = function (req, res) {
    var base_url = "https://github.com/login/oauth/authorize";
    var config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        scope: process.env.GITHUB_SCOPE,
    };
    var config_url = new URLSearchParams(config).toString();
    var final_url = "".concat(base_url, "?").concat(config_url);
    return res.redirect(final_url);
};
exports.github = github;
var githubCallback = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var base_url, config, config_url, final_url, tokenRequest, access_token, api_url, githubUser, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                base_url = "https://github.com/login/oauth/access_token";
                config = {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: req.query.code,
                };
                config_url = new URLSearchParams(config).toString();
                final_url = "".concat(base_url, "?").concat(config_url);
                return [4 /*yield*/, axios_1.default.post(final_url, null, {
                        headers: {
                            Accept: "application/json",
                        },
                    })];
            case 1:
                tokenRequest = (_a.sent()).data;
                if (!tokenRequest.access_token) return [3 /*break*/, 6];
                access_token = tokenRequest.access_token;
                api_url = "https://api.github.com/user";
                return [4 /*yield*/, axios_1.default.get(api_url, {
                        headers: {
                            Authorization: "token ".concat(access_token),
                        },
                    })];
            case 2:
                githubUser = (_a.sent()).data;
                return [4 /*yield*/, prismadb_1.default.user.findUnique({
                        where: { email: githubUser.email },
                    })];
            case 3:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 5];
                return [4 /*yield*/, prismadb_1.default.user.create({
                        data: {
                            name: githubUser.name,
                            username: githubUser.name,
                            email: githubUser.email,
                            profileImage: githubUser.avatar_url,
                            account: {
                                create: {
                                    type: "github",
                                    providerId: githubUser.id + "",
                                },
                            },
                        },
                    })];
            case 4:
                user = _a.sent();
                _a.label = 5;
            case 5:
                req.session.meId = user.id;
                return [2 /*return*/, res.redirect("".concat(req.app.get("frontendUrl"), "/home"))];
            case 6: return [2 /*return*/, res.redirect("".concat(req.app.get("frontendUrl"), "/auth"))];
        }
    });
}); };
exports.githubCallback = githubCallback;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, checkPassword, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.id, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prismadb_1.default.user.findUnique({ where: { email: email } })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json("해당 계정을 찾을 수 없습니다.")];
                }
                checkPassword = void 0;
                if (!user.hashedPassword) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.hashedPassword)];
            case 3:
                checkPassword = _b.sent();
                _b.label = 4;
            case 4:
                if (!checkPassword) {
                    return [2 /*return*/, res.status(401).json("잘못된 비밀번호입니다.")];
                }
                req.session.meId = user.id;
                return [2 /*return*/, res.status(200).json()];
            case 5:
                error_4 = _b.sent();
                console.log(error_4);
                next(error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        req.session.meId = null;
        return [2 /*return*/, res.redirect("".concat(req.app.get("frontendUrl"), "/auth"))];
    });
}); };
exports.logout = logout;
//# sourceMappingURL=auth.js.map