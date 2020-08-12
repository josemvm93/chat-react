import { BasicModel } from "./basic-model";

export interface Message extends BasicModel {
    description: string
    date: Date
    sendBy: string
}