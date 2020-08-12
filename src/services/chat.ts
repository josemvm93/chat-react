import FirebaseApp from "./firebase";
import { ChatType } from "../common/models/chat";

export const chatCollection = FirebaseApp.firestore().collection('chats')

export function createGroupChat(name: string, categoryId: string, userId: string) {
    const chat = {
        userIds: [userId],
        messageIds: [],
        name: name,
        type: ChatType.Group,
        categoryId: categoryId
    }
    return chatCollection.add(chat)
}

export function createPrivateChat(userId1: string, userId2: string) {
    const chat = {
        userIds: [userId1, userId2],
        messageIds: [],
        name: '',
        type: ChatType.Private,
        categoryId: ''
    }
    return chatCollection.add(chat)
}

export function addMessageToChat(chatId: string, messageId: string, messageIds: string []) {
    return chatCollection.doc(chatId).set({messageIds: [...messageIds, messageId]}, {merge: true})
}