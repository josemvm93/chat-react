import React, { createContext, useState } from "react"
import { Chat } from "../models/chat"

interface ChatContextProps {
    chatSelected: Chat | undefined,
    setChatSelected: any | undefined
}

const ChatContext = createContext<ChatContextProps>({chatSelected: {} as Chat, setChatSelected: () => {}})

export function ChatContextProvider ({children}: any) {
    const [chatSelected, setChatSelected] = useState<Chat>()
    return (
        <ChatContext.Provider value={{chatSelected, setChatSelected}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext