import FirebaseApp from "./firebase";
import { Chat, ChatType } from "../common/models/chat";

export const chatCollection = FirebaseApp.firestore().collection('chats')

export function createGroupChat(name: string, categoryId: string) {
    const chat = {
        userIds: [],
        messageIds: [],
        name: name,
        type: ChatType.Group,
        categoryId: categoryId
    }
    return chatCollection.add(chat)
}