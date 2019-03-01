import MessageCallback from "./MessageCallback";
import Message from "../structures/Message";


import MessageClient from "../Client";

import imessage from "osa-imessage";

/**
 * 
 * xytoz('chat395813409', 'and thats the tea.') === 'chat395813409+and thats the tea.'
 */
function xytoz(x: string, y: string): string {
    return `${x}+${y}`;
}

declare interface MessageSender {
    send(id: string, msg: string): Promise<Message>;
    send(msg: string): Promise<Message>;
}

class MessageSender {
    private pendingMessages: {
        [key: string]: any;
    } = {};

    private listeners: MessageCallback[] = [];

    protected constructor(protected manager?: MessageClient, public id?: string) {
        imessage.listen().on("message", (orig) => {
            const msg = new Message(orig, manager || this as any);
            this.listeners.forEach((callback) => callback(msg));

            const z = xytoz(orig.handle!, orig.text);
            if (this.pendingMessages[z]) this.pendingMessages[z](msg);
        });
    }

    /**
     * Register a listener to be called when messages are created
     * @param listener the listener
     */
    register(listener: MessageCallback): void {
        if (this.manager) {
            this.manager.register(msg => {
                if (this.id && msg.chat.id !== this.id) return;
                listener(msg);
            });
            return;
        } else {
            this.listeners.push(listener);
        }
    }

    /**
     * @param arg1 either the id or the message (arg1 would be message if the id was going to be the default in constructor. otherwise its the destination to send to)
     * @param arg2 only ever the message
     */
    send(arg1: string, arg2?: string): Promise<Message> {
        return new Promise(async (resolve, reject) => {
            const id = arg2 ? arg1 : this.id;
            const msg = arg2 ? arg2 : arg1;

            if (!id) return reject(new Error("Invalid arguments."));

            const z = xytoz(id, msg);
            
            this.pendingMessages[z] = (msg: Message) => {
                delete this.pendingMessages[z];
                resolve(msg);
            };

            imessage.send(id, msg);
        });
    }
}

export default MessageSender;