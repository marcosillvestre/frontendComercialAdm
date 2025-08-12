import Button from '@mui/material/Button';
import styled from "styled-components";

export const Container = styled.div`
    height: var(--boxHei);
    @media(max-width:760px){
        width: 100%;
    }
    `

export const Buttonn = styled(Button)`
    height: var(--boxHei);

@media(max-width:760px){
    width: 100%;
}
`