"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(msg, manager) {
        this.msg = msg;
        this.text = msg.text;
        this.chat = manager.getChat(msg.group || msg.handle);
        this.fromSelf = msg.fromMe;
    }
    reply(text) {
        return this.chat.send(text);
    }
}
exports.default = Message;
