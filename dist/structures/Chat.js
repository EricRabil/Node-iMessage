"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageSender_1 = __importDefault(require("../models/MessageSender"));
class Chat extends MessageSender_1.default {
    constructor(id, manager) {
        super(manager, id);
        this.manager = manager;
    }
}
exports.default = Chat;
