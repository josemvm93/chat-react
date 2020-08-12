import { BasicModel } from "./basic-model";

export enum ChatType {
    Group,
    Private
}

export interface Chat extends BasicModel{
    type: ChatType
    name: string
    categoryId: string
    userIds: String[]
    messageIds: String[]

}
