import Chat from "./structures/Chat";
import MessageSender from "./models/MessageSender";
export default class MessageClient extends MessageSender {
    chats: {
        [key: string]: Chat;
    };
    constructor();
    getChat(id: string): Chat;
}
