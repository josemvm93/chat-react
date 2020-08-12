import FirebaseApp from "./firebase";

export const messageCollection = FirebaseApp.firestore().collection('messages')

export function saveMessage(userId: string, message: string ) {
    const newMessage = {
        description: message,
        date: new Date(),
        sendBy: userId
    }
    return messageCollection.add(newMessage)
}
