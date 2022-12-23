import Image from "next/image"
import WhatsAppLogo from "../../../assets/whatsapplogo.png"
import { CircularProgress } from "@mui/material"
import {StyledContainer, StyledImageWrapper} from "./loading.styles"


const Loading = () => {
  return (
    <StyledContainer>
        <StyledImageWrapper>
            <Image src ={WhatsAppLogo} 
                   alt = 'Whatsapp Logo' 
                   height = '200'
                   width = '200' 
        />
        </StyledImageWrapper>

        <CircularProgress />
    </StyledContainer>
  )
}

export default Loading;