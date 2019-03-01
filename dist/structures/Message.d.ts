import { Message as OSAiMessage } from "osa-imessage";
import Chat from "./Chat";
import MessageClient from "../Client";
export default class Message {
    msg: OSAiMessage;
    text: string;
    chat: Chat;
    fromSelf: boolean;
    constructor(msg: OSAiMessage, manager: MessageClient);
    reply(text: string): Promise<Message>;
}
