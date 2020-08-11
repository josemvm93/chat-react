import FirebaseApp from "./firebase";
import { Chat, ChatType } from "../common/models/chat";

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