import React, { useEffect, useState } from 'react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image';
import { Chat, ChatType } from '../../../../../common/models/chat';
import { Category } from '../../../../../common/models/category';
import { getCategoryById } from '../../../../../services/category';
import { User } from '../../../../../common/models/user';
import { getUserById } from '../../../../../services/user';

interface ChatListItemProps {
    chat: Chat,
    userOrigin?: User
}

function ChatListItem({chat, userOrigin}: ChatListItemProps) {

    const [category, setCategory] = useState<Category>()
    const [user, setUser] = useState<User>()


    const getCategoryByIdFn = (id: string) => {
        getCategoryById(id).get().then(doc => {
            const category: Category = doc.data() as Category
            category.id = doc.id
            setCategory(category)
        })
    }

    const getUserByIdFn = () => {
        const userIds: string[] = (userOrigin ? chat.userIds.filter(userId => userId != userOrigin.id) : []) as string[]

        userIds[0] && getUserById(userIds[0]).get().then(doc => {
            const user: User = doc.data() as User
            user.id = doc.id
            setUser(user)
        })
    }

    useEffect(() => {
        if (chat.type == ChatType.Private) {
            getUserByIdFn()
        } else {
            getCategoryByIdFn(chat.categoryId)
        }
    }, [])

    const drawChatType = () => {
        if (chat.type == ChatType.Private) {
            return <ListItemText primary={user?.name}/>
        }
        return <ListItemText primary={chat.name} secondary={category?.name} />
    }

    return (
        <ListItem button key={chat.id}>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            {drawChatType()}
        </ListItem>
    )
}

export default ChatListItem