import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import styled from "styled-components";



export const Filter = styled(Button)`

`

export const Boxes = styled.div`
display: flex;
margin-top: .8rem ;
justify-content: center;
`

export const ButtonDelete = styled.button`
background: none;
background-color: rgb(25, 118, 210);
color:  #fff;
border: none;
font-size: .7rem;
padding: 1rem;
border-radius: 0.5rem;
text-transform: uppercase;
&:hover{
    /* text-decoration: none; */
    background-color: rgb(16, 87, 158);
    color: #f1f1f1;
}

`
export const Trash = styled(DeleteIcon)`

&:hover{
    color: #336ba3;
}
&:active{
    opacity: 0.7;
}
`