import FirebaseApp from "./firebase";

export const categoryCollection = FirebaseApp.firestore().collection('categories')

export function getCategoryById(id: string) {
    return categoryCollection.doc(id)
}