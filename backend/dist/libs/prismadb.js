"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var client;
if (process.env.NODE_ENV === "production") {
    client = new client_1.PrismaClient();
}
else {
    if (!global.prisma) {
        global.prisma = new client_1.PrismaClient();
    }
    client = global.prisma;
}
exports.default = client;
//# sourceMappingURL=prismadb.js.map