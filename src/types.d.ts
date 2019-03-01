declare module "osa-imessage" {
    import { EventEmitter } from "events";

    export interface Message {
        guid: string;
        text: string;
        fromMe: boolean;
        date: Date;
        dateRead: Date | null;
        
        group: string | null;
        handle: string;
    }

    export interface Chat {
        id: string;
        recipientId: string;
        serviceName: string;
        roomName: string;
        displayName: string;
    }

    interface MessageEmitter extends EventEmitter {
        on(event: 'message', cb: (msg: Message) => any): this;
    }

    namespace iMessage {
        export function send(handle: string, message: string): Promise<void>;
        export function listen(): MessageEmitter;
        export function handleForName(name: string): Promise<string>;
        export function nameForHandle(handle: string): Promise<string>;
        export function getRecentChats(limit?: number): Promise<Chat[]>;
        export const SUPPRESS_WARNINGS: boolean;
    }

    export default iMessage;
}

declare module "osa-imessage/lib/messages-db.js" {
    namespace MessagesDB {
        export function all(query: string): any;
    }

    export default MessagesDB;
}

declare module "osa2" {
    function a<T,K>(cb: (handle: T, message: K) => any): (handle: T, message: K) => any;
    export = a;
}