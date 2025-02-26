import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import styled from "styled-components";



export const Filter = styled(Button)`

`

export const Boxes = styled.div`
display: flex;
flex-direction: column;
margin-top: .8rem ;
justify-content: center;
span{
    margin: 2rem auto ;
    border: 1px dashed;
    border-radius: var(--border-radius);
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    div{
        align-items: center;
        gap: .1rem;
    }
}
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
    background-color: rgb(65, 139, 212);
    color: #f1f1f1;
}

&:disabled{
    background-color: rgb(2, 37, 71);

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