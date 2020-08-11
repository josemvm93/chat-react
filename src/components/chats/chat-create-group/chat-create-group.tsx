import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'
import Alert, { Color } from '@material-ui/lab/Alert'
import { Category } from '../../../common/models/category'
import { categoryCollection } from '../../../services/category'
import { createGroupChat } from '../../../services/chat'

function ChatCreateGroup() {
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState<Color>()
    const [alertMessage, setAlertMessage] = useState('')

    const [groupChatName, setGroupChatName] = useState('')

    const [categoryId, setCategoryId] = useState<string>('')
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        categoryCollection.onSnapshot(snap => {
            const categoriesTmp: Category[] = []
            snap.docs.forEach(doc => {
                const category: Category = doc.data() as Category
                category.id = doc.id
                categoriesTmp.push(category)
            })
            setCategories(categoriesTmp)
        })
    }, [])


    const onChangeCategory = (categoryId: string) => {
        setCategoryId(categoryId)
    }

    const onChangeGroupChatName = (name: string) => {
        setGroupChatName(name)
    }

    const saveGroupChat = () => {
        createGroupChat(groupChatName, categoryId).then( doc => {
            setAlertOpen(true)
            setAlertSeverity('success')
            setAlertMessage('Group Chat Created')
            setTimeout(() => {
                setAlertOpen(false)
            }, 1800)
            clearForm()
        })
    }

    const clearForm = () => {
        setGroupChatName('')
        setCategoryId('')
    }

    return (
        <div>
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
            >
                <TextField required id="user-name" label="Name" value={groupChatName} onChange={e => onChangeGroupChatName(e.target.value)}/>
                <TextField
                    id="standard-select-categories"
                    select
                    label="Category"
                    value={categoryId}
                    onChange={e => onChangeCategory(e.target.value)}
                    helperText="Please select the category"
                    >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
                <div>
                    
                </div>
            </Grid>
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
            >
                <Button variant="contained" color="primary" onClick={saveGroupChat}>
                    Save
                </Button>
                <Button variant="contained" onClick={clearForm}>
                    Clear
                </Button>
            </Grid>
            {alertOpen && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
        </div>
    )
}

export default ChatCreateGroup