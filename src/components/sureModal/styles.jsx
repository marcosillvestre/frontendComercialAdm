import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import styled from "styled-components";



export const Filter = styled(Button)`

`

export const Boxes = styled.label`
display: flex;
width: 20vw;
height: 3.5vw;
justify-content: center;
`

export const ButtonDelete = styled.button`
background: none;
color: rgb(25, 118, 210);
border: none;
font-size: 1rem;
margin: 0 2rem;
padding: 1rem 2rem;
border-radius: 0.5rem;
font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 500;
font-size: 0.875rem;
line-height: 1.75;
letter-spacing: 0.02857em;
text-transform: uppercase;
&:hover{
    text-decoration: none;
    background-color: rgba(32, 119, 206, 0.04);
}

`
export const Trash = styled(DeleteIcon)`

&:hover{
    color: #5e5e5e;
}
&:active{
    opacity: 0.7;
}
`