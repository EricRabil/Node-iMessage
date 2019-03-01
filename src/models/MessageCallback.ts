import Message from "../structures/Message";

export default interface MessageCallback {
    (msg: Message): any;
}