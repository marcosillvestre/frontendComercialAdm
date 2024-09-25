import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";



export const Filter = styled.button`
all: unset;
`

export const Boxes = styled.div`
margin-top: .8rem ;
display: grid;
gap:1.5rem 3rem;
grid-template-columns: repeat(3, 1fr);

label:nth-child(8){
grid-column: span 2;
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
