"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../structures/Message"));
const osa_imessage_1 = __importDefault(require("osa-imessage"));
/**
 *
 * xytoz('chat395813409', 'and thats the tea.') === 'chat395813409+and thats the tea.'
 */
function xytoz(x, y) {
    return `${x}+${y}`;
}
class MessageSender {
    constructor(manager, id) {
        this.manager = manager;
        this.id = id;
        this.pendingMessages = {};
        this.listeners = [];
        osa_imessage_1.default.listen().on("message", (orig) => {
            const msg = new Message_1.default(orig, manager || this);
            this.listeners.forEach((callback) => callback(msg));
            const z = xytoz(orig.handle, orig.text);
            if (this.pendingMessages[z])
                this.pendingMessages[z](msg);
        });
    }
    /**
     * Register a listener to be called when messages are created
     * @param listener the listener
     */
    register(listener) {
        if (this.manager) {
            this.manager.register(msg => {
                if (this.id && msg.chat.id !== this.id)
                    return;
                listener(msg);
            });
            return;
        }
        else {
            this.listeners.push(listener);
        }
    }
    /**
     * @param arg1 either the id or the message (arg1 would be message if the id was going to be the default in constructor. otherwise its the destination to send to)
     * @param arg2 only ever the message
     */
    send(arg1, arg2) {
        return new Promise(async (resolve, reject) => {
            const id = arg2 ? arg1 : this.id;
            const msg = arg2 ? arg2 : arg1;
            if (!id)
                return reject(new Error("Invalid arguments."));
            const z = xytoz(id, msg);
            this.pendingMessages[z] = (msg) => {
                delete this.pendingMessages[z];
                resolve(msg);
            };
            osa_imessage_1.default.send(id, msg);
        });
    }
}
exports.default = MessageSender;
