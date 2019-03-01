"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = __importDefault(require("./structures/Chat"));
const MessageSender_1 = __importDefault(require("./models/MessageSender"));
class MessageClient extends MessageSender_1.default {
    constructor() {
        super();
        this.chats = {};
    }
    getChat(id) {
        if (!this.chats[id])
            this.chats[id] = new Chat_1.default(id, this);
        return this.chats[id];
    }
}
exports.default = MessageClient;
;
