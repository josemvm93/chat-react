import { User } from "firebase";
import { Message } from "./message";
import { BasicModel } from "./basic-model";

export enum ChatType {
    Group,
    Private
}

export interface Chat extends BasicModel{
    type: ChatType
    name: string
    users: User[]
    messages: Message[]
}
