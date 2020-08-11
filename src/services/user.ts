import FirebaseApp from "./firebase";
import { User } from "../common/models/user";

function getRandomUserName(min: number = 1, max: number = 100) {
   return {name: 'User ' + Math.floor(Math.random() * (max - min)) + min} as User
}

export const userCollection = FirebaseApp.firestore().collection('users')

export function changeUser() {
}

export function getUserById(userId: string) {
    return userCollection.doc(userId)
    // .doc(client.id)
    //   .set(client, { merge: true });
}

export function addUser() {
    return userCollection.add(getRandomUserName())
}

export function updateUser(user: User) {
    return userCollection.doc(user.id).set(user, {merge: true})
}