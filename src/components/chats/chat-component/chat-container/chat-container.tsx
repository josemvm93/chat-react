import React, { useContext, useState, useEffect } from 'react'
import ChatItem from './chat-item/chat-item'
import ChatContext from '../../../../common/contexts/chat-context'
import { Message } from '../../../../common/models/message'
import { saveMessage, messageCollection } from '../../../../services/message'
import styled from 'styled-components'
import { Grid, Paper, makeStyles, createStyles, Theme, InputBase, Divider, IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { User } from '../../../../common/models/user'
import { addMessageToChat } from '../../../../services/chat'
import Alert, { Color } from '@material-ui/lab/Alert'

const ContainerMessages = styled.div<{}>`
    position: fixed,
    height: 200px,
    overflow-y:auto,
    max-height: 200px

`
const NoMessages = styled.h2<{}>`

`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'start',
        color: theme.palette.text.primary,
        background: '#d0d3d4',
        height: '420px',
        overflowY: 'auto',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    }
  }),
);

interface ChatContainerProps {
    user ?: User
}

function ChatContainer({user}: ChatContainerProps) {
    const classes = useStyles()
    const {chatSelected} = useContext(ChatContext)
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState<string>('')

    const [alterOpen, setAlertOpen] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [alertSeverity, setAlertSeverity] = useState<Color>()

    const getMessagesFn = (ids: string[]) => {
        messageCollection.onSnapshot(snap => {
            const messagesTmp: Message[] = []
            snap.docs.map(doc => {
                if (ids.includes(doc.id)) {
                    const message = doc.data() as Message
                    message.id = doc.id
                    messagesTmp.push(message)
                }
            })
            setMessages(messagesTmp)
        })
    }

    const sendMessage = () => {
        user && newMessage && saveMessage(user.id, newMessage).then(doc => {
            setNewMessage('')
            doc.get().then(docMessage => {
                const messageSaved = docMessage.data() as Message
                messageSaved.id = docMessage.id
                chatSelected && addMessageToChat(chatSelected.id, doc.id, chatSelected.messageIds as string[]).then(docChat => {
                    setAlertOpen(true)
                    setAlertSeverity('success')
                    setAlertMessage('Message Sent')
                    setMessages([...messages, messageSaved])
                    setTimeout(() => {
                        setAlertOpen(false)
                    }, 1800)
                })
            }) 
            
        })
    }

    useEffect(() => {
        chatSelected && chatSelected.messageIds.length > 0 && getMessagesFn(chatSelected.messageIds as string[])
    }, [chatSelected])

    return (
        <Grid container spacing={3}>
            {
                chatSelected && chatSelected.id ?
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <ContainerMessages>
                                    { messages.length > 0 ?
                                            messages.map((message, index) => (
                                                <ChatItem key={index} message={message} userOrigin={user}></ChatItem>                                                
                                            ))
                                        :
                                            <NoMessages>No messages</NoMessages>
                                    }
                                </ContainerMessages>
                            </Paper>
                        
                        </Grid>,
                        
                        <Grid item xs={12}>
                            <Paper component="form" className={classes.root}>
                                <InputBase
                                    className={classes.input}
                                    value={newMessage}
                                    placeholder="Type Message"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={e => setNewMessage(e.target.value)}
                                />
                                <Divider className={classes.divider} orientation="vertical" />
                                <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={sendMessage}>
                                    <SendIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                        {alterOpen && <Alert severity={alertSeverity}>{alertMessage}</Alert>}

                    </Grid>
                :
                    <Grid item xs={12}>
                        <h2>Select a Chat</h2>
                    </Grid>
            }
            
        </Grid>
        
    )
}

export default ChatContainer