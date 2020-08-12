import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ChatType, Chat } from '../../../../common/models/chat';
import { chatCollection } from '../../../../services/chat';
import { CircularProgress } from '@material-ui/core';
import { User } from '../../../../common/models/user';
import ChatListItem from './chat-list-item/chat-list-item';
import ChatContext from '../../../../common/contexts/chat-context';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export enum ChatFilter {
    byChatType,
    byMyOwnChat,
    byUserAndGroup
}


interface ChatListProps {
    chatType: ChatType,
    user?: User,
    chatFilter: ChatFilter
}


function ChatList({chatType, user, chatFilter}: ChatListProps) {
    const classes = useStyles();

    const [chats, setChats] = useState<Chat[]>([])

    const [loading, setLoading] = useState(false)

    const {setChatSelected} = useContext(ChatContext)

    function getChats() {
        setChatSelected()
        let queryChat
        switch (chatFilter) {
            case ChatFilter.byChatType:
                queryChat = chatCollection.where("type", "==", chatType)
                if (chatType == ChatType.Private) {
                    queryChat = user && queryChat.where("userIds", "array-contains", user.id)
                }

                break;
            case ChatFilter.byMyOwnChat:
                queryChat = user && chatCollection.where("userIds", "array-contains", user.id)
                break;
            case ChatFilter.byUserAndGroup:
                
                break;
            default:
                break;
        }
        setLoading(true)
        queryChat && queryChat.onSnapshot( snap => {
            const chatsTmp: Chat[] = []
            snap.docs.forEach(doc => {
                const category: Chat = doc.data() as Chat
                category.id = doc.id
                chatsTmp.push(category)
            })
            setChats(chatsTmp)
            setLoading(false)
        })
    }

    useEffect(() => {
        getChats()
    }, [chatType, chatFilter, user])

    return (
        <List className={classes.root}>
            {loading ? <CircularProgress /> : 
                chats.length > 0 ? 
                    chats.map((chat, index) => (
                       <ChatListItem key={index} chat={chat} userOrigin={user}></ChatListItem>
                    ))
                    : 
                    <ListItem>
                            <ListItemText primary="Empty Chat" />
                    </ListItem>
            }
        </List>
    )
}

export default ChatList