import styled from 'styled-components'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVerticalIcon from '@mui/icons-material/MoreVert'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import { signOut } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import * as EmailValidator from  'email-validator'
import { addDoc, collection, query, where } from 'firebase/firestore'
import {useCollection} from 'react-firebase-hooks/firestore'
import { Conversation } from '../types/Conversation'

const StyledContainer = styled.div`
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    border-right: 1px solid whitesmoke;
`
const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
`
const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 2px;
`

const StyledUserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`
const StyledSearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
`
const StyledSidebarButton = styled(Button)`
    width: 100%; 
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
`

const Sidebar = () => {
    const [loggedInUser, _loading, _error] = useAuthState(auth)

    const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] = useState(false)

    const [recipientEmail, setRecipientEmail] = useState('')

    const toggleNewConversationDialog = (isOpen: boolean) => {
        setIsOpenNewConversationDialog(isOpen)

        if(!isOpen) setRecipientEmail('')
    }

    const closeNewConversationDialog = () => {
        toggleNewConversationDialog(false)
    }

    const isInvitingSelf = recipientEmail === loggedInUser?.email; 

    //check if conversation is already exist between loggerInUser and recipient
    const queryGetConversationForCurrentUser = query(collection(db, 'conversation'), where('users', 'array-contains', loggedInUser?.email));

    const [conversationsSnapShot, __loading, __error] = useCollection(queryGetConversationForCurrentUser); 

    const isConversationAlreadyExists = (recipientEmail: string) => {
        return conversationsSnapShot?.docs.find(conversation => (conversation.data() as Conversation).users.includes( recipientEmail))
    }

    const createConversation = async () => {
        if(!recipientEmail) return

        if (EmailValidator.validate(recipientEmail) && !isInvitingSelf && !isConversationAlreadyExists){
            //Add conversation to conversation db collection
            // A conversation is between the logger user and the user invited
             
            await addDoc(collection(db, 'conversation'), {
                users: [loggedInUser?.email, recipientEmail]
            })
        }

        closeNewConversationDialog()
    } 

    const Logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log('ERROR LOGGING OUT: ', error);
        }
}
  return (
    <StyledContainer>
        <StyledHeader>
            <Tooltip title={loggedInUser?.email as string} placement="right">
            <StyledUserAvatar src={loggedInUser?.photoURL || ''} />
            </Tooltip>
            <div>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVerticalIcon />
                </IconButton>
                <IconButton onClick={Logout}>
                    <LogoutIcon />
                </IconButton>
            </div>
        </StyledHeader>

        <StyledSearch>
            <SearchIcon />
            <StyledSearchInput placeholder='Search in conversations' /> 
        </StyledSearch>

        <StyledSidebarButton onClick={() => {
            toggleNewConversationDialog(true);
        }}>
            Start a new conversations
        </StyledSidebarButton>
        
        {/* List of conversations */}

        <Dialog open={isOpenNewConversationDialog} onClose={() => {
            toggleNewConversationDialog(false)
        }}>
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user you wish to chat with
          </DialogContentText>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={(e) => {
            setRecipientEmail(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewConversationDialog}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>Create</Button>
        </DialogActions>
      </Dialog>
      
    </StyledContainer>
  )
}

export default Sidebar