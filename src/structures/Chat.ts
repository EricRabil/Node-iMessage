import MessageClient from "../Client";
import MessageSender from "../models/MessageSender";

export default class Chat extends MessageSender {
    manager: MessageClient;

    constructor(id: string, manager: MessageClient) {
        super(manager, id);
        this.manager = manager;
    }
}