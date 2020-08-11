import FirebaseApp from "./firebase";

export const messageCollection = FirebaseApp.firestore().collection('messages')

export function createGroupChat() {
}