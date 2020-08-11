import React, { FunctionComponent, useState, useEffect } from "react"
import { User } from "../../../common/models/user"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Grid } from "@material-ui/core"
import { updateUser } from "../../../services/user"
import Alert, { Color } from '@material-ui/lab/Alert';

interface UserChangeProps {
    user?: User,
    updateUserProp: (user: User) => void
}

export const UserChange: FunctionComponent<UserChangeProps> = ({user, updateUserProp}) => {
    const [name, setName] = useState<string>('')
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [alertSeverity, setAlertSeverity] = useState<Color>()


    const saveUser = () => {
        if (user) {
            user.name = name
            updateUser(user).then(() => {
                updateUserProp(user)
                setOpenAlert(true)
                setAlertMessage('Name changed')
                setAlertSeverity('success')
                setTimeout(() => {
                    setOpenAlert(false)
                }, 1800)
            })
        }

    }

    useEffect(()=> {
        if (user) {
            setName(user.name)
        }
    }, [user])

    return (
        <div>
            {user && (
                <div>
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="center"
                    >
                        <TextField required id="user-name" label="Name" defaultValue={user.name} onChange={e => setName(e.target.value)}/>
                        <Button variant="contained" color="primary" onClick={saveUser}>
                            Save
                        </Button>
                        {openAlert && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
                    </Grid>
                    
                </div>
                )
            }
            
        </div>
    )
}