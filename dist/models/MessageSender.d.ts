import MessageCallback from "./MessageCallback";
import Message from "../structures/Message";
import MessageClient from "../Client";
declare interface MessageSender {
    send(id: string, msg: string): Promise<Message>;
    send(msg: string): Promise<Message>;
}
declare class MessageSender {
    protected manager?: MessageClient | undefined;
    id?: string | undefined;
    private pendingMessages;
    private listeners;
    protected constructor(manager?: MessageClient | undefined, id?: string | undefined);
    /**
     * Register a listener to be called when messages are created
     * @param listener the listener
     */
    register(listener: MessageCallback): void;
}
export default MessageSender;
