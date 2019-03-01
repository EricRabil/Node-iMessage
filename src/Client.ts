import Chat from "./structures/Chat";
import MessageSender from "./models/MessageSender";

export default class MessageClient extends MessageSender {
    chats: {
        [key: string]: Chat;
    } = {};

    constructor() {
        super();
    }

    getChat(id: string) {
        if (!this.chats[id]) this.chats[id] = new Chat(id, this);
        return this.chats[id];
    }
};