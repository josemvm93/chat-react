
import React, { FunctionComponent, useState } from 'react'
import { ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, ListItemSecondaryAction } from '@material-ui/core'
import { User } from '../../../../common/models/user'
import ChatIcon from '@material-ui/icons/Chat';
import ImageIcon from '@material-ui/icons/Image';
import Alert, { Color } from '@material-ui/lab/Alert';
import { createPrivateChat } from '../../../../services/chat';

interface UserItemProps {
    user: User,
    userOrigin?: User
}

export const UserItem: FunctionComponent<UserItemProps> = ({user, userOrigin}) => {
    const [alertOpen, setAlertOpen] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [alertSeverity, setAlertSeverity] = useState<Color>()
    
    const createPrivateChatFn = () => {
        user && userOrigin && createPrivateChat(userOrigin.id, user.id).then( doc => {
            setAlertOpen(true)
            setAlertSeverity('success')
            setAlertMessage('Group Chat Created')
            setTimeout(() => {
                setAlertOpen(false)
            }, 1800)
        })
    }
    return (
        <div>
            {userOrigin && userOrigin.id != user.id &&
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.name}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Create Private Chat" onClick={createPrivateChatFn}>
                            <ChatIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                    {alertOpen && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
                </ListItem>
            }
        </div>
     )
}

