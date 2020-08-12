import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ChatType, Chat } from '../../../../common/models/chat';
import { chatCollection } from '../../../../services/chat';
import { CircularProgress, Paper, InputBase, IconButton } from '@material-ui/core';
import { User } from '../../../../common/models/user';
import ChatListItem from './chat-list-item/chat-list-item';
import ChatContext from '../../../../common/contexts/chat-context';
import { userCollection } from '../../../../services/user';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

export enum ChatFilter {
    byChatType,
    byMyOwnChat
}


interface ChatListProps {
    chatType: ChatType,
    user?: User,
    chatFilter: ChatFilter,
    searchEnabled: boolean
}


function ChatList({chatType, user, chatFilter, searchEnabled}: ChatListProps) {
    const classes = useStyles();

    const [chats, setChats] = useState<Chat[]>([])

    const [loading, setLoading] = useState(false)

    const {setChatSelected} = useContext(ChatContext)

    const [searchText, setSearchText] = useState('')

    const search = () => {
        getChats()
        setSearchText('')
    }

    function getChats() {
        setChatSelected()
        let queryChat
        switch (chatFilter) {
            case ChatFilter.byChatType:
                queryChat = chatCollection.where("type", "==", chatType)
                if (chatType == ChatType.Private) {
                    queryChat = user && queryChat.where("userIds", "array-contains", user.id)
                    queryChat && queryChat.onSnapshot( snap => {
                        setLoading(true)
                        const chatsTmp: Chat[] = []
                        snap.docs.forEach(doc => {
                            const chat: Chat = doc.data() as Chat
                            chat.id = doc.id                            
                            userCollection.onSnapshot(snapUser => {
                                let userChatIncluded = false
                                snapUser.docs.forEach(docUser => {
                                    const user = docUser.data() as User
                                    userChatIncluded = userChatIncluded || chat.userIds.includes(docUser.id) && user.name.toLowerCase().includes(searchText.toLowerCase())                            
                                })
                                searchEnabled ? userChatIncluded && chatsTmp.push(chat) : chatsTmp.push(chat)
                            })
                        })
                        setChats(chatsTmp)
                        setTimeout(() => {
                            setLoading(false)
                        }, 1000)
                    })
                } else {
                    queryChat && queryChat.onSnapshot( snap => {
                        setLoading(true)
                        const chatsTmp: Chat[] = []
                        snap.docs.forEach(doc => {
                            const chat: Chat = doc.data() as Chat
                            chat.id = doc.id                            
                            searchEnabled ? chat.name.toLowerCase().includes(searchText.toLowerCase()) && chatsTmp.push(chat) : chatsTmp.push(chat)
                        })
                        
                        setChats(chatsTmp)
                        setTimeout(() => {
                            setLoading(false)
                        }, 1000)
                    })
                }

                break;
            case ChatFilter.byMyOwnChat:
                queryChat = user && chatCollection.where("userIds", "array-contains", user.id)
                queryChat && queryChat.onSnapshot( snap => {
                    setLoading(true)
                    const chatsTmp: Chat[] = []
                    snap.docs.forEach(doc => {
                        const chat: Chat = doc.data() as Chat
                        chat.id = doc.id
                        chatsTmp.push(chat)
                    })
                    setChats(chatsTmp)
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000)
                })
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        getChats()
    }, [chatType, chatFilter, user, searchEnabled])

    return (
        <div>
            {
                searchEnabled && (
                    <Paper component="form" className={classes.root}>
                        <InputBase
                            className={classes.input}
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            placeholder="Search..."
                        />
                        <IconButton className={classes.iconButton} aria-label="search" onClick={search}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                )}
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
        </div>
    )
}

export default ChatList