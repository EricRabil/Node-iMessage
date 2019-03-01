import { Message as OSAiMessage } from "osa-imessage";
import Chat from "./Chat";
import MessageClient from "../Client";

export default class Message {
    msg: OSAiMessage;
    text: string;
    chat: Chat;
    fromSelf: boolean;

    constructor(msg: OSAiMessage, manager: MessageClient) {
        this.msg = msg;
        this.text = msg.text;
        this.chat = manager.getChat(msg.group! || msg.handle!);
        this.fromSelf = msg.fromMe;
    }

    reply(text: string) {
        return this.chat.send(text);
    }
}