"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discounts = void 0;
var client_1 = require("@prisma/client");
exports.discounts = [
    {
        code: "FREE_DELIVERY",
        description: "free delivery above 10 euro products",
        discountType: client_1.DiscountType.DELIVERY,
        value: 2.5,
    },
];
