// import { useState } from 'react'
// import Dialog from '@mui/material/Dialog'
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText'
// import TextField from '@mui/material/TextField'
// import DialogActions from '@mui/material/DialogActions'
// import Button from '@mui/material/Button'

// const DialogBox = () => {
//     const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] = useState(false)

//     const [recipientEmail, setRecipientEmail] = useState('')

//     const toggleNewConversationDialog = (isOpen: boolean) => {
//         setIsOpenNewConversationDialog(isOpen)

//         if(!isOpen) setRecipientEmail('')
//     }

//     const closeNewConversationDialog = () => {
//         toggleNewConversationDialog(false)
//     }
//   return (
//     <Dialog open={isOpenNewConversationDialog} onClose={() => {
//         toggleNewConversationDialog(false)
//     }}>
//     <DialogTitle>New Conversation</DialogTitle>
//     <DialogContent>
//       <DialogContentText>
//         Please enter a Google email address for the user you wish to chat with
//       </DialogContentText>
//       <TextField
//         autoFocus
//         label="Email Address"
//         type="email"
//         fullWidth
//         variant="standard"
//         value={recipientEmail}
//         onChange={(e) => {
//         setRecipientEmail(e.target.value)
//         }}
//       />
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={closeNewConversationDialog}>Cancel</Button>
//       <Button disabled={!recipientEmail} onClick={createConversation}>Create</Button>
//     </DialogActions>
//   </Dialog>
//   )
// }

// export default DialogBox;