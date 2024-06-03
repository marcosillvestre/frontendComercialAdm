import Button from '@mui/material/Button';
import styled from "styled-components";

export const Container = styled.div`
    height: 2.4rem;
    @media(max-width:760px){
        width: 100%;
    }
    `

export const Buttonn = styled(Button)`
width: 10rem;
height: 2.4rem;
@media(max-width:760px){
    width: 100%;
}
`