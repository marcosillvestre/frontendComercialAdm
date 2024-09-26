import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";



export const Filter = styled.button`
all: unset;
`

export const Boxes = styled.div`
margin-top: .8rem ;
display: grid;
gap:1rem 3rem;

border: 1px dashed;
border-radius: 10px;
padding: 15px;
margin-bottom: 20px ;
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    small{
        margin-right: 8px;
    }
}

`

export const ButtonDelete = styled.button`
background: none;
background-color: ${props => props.disabled ? "rgb(16, 87, 158)" : "rgb(25, 118, 210)"};
color:  #fff;
border: none;
font-size: .7rem;
padding: 1rem;
border-radius: 0.5rem;
text-transform: uppercase;
width: 100%;



&:hover:not(:disabled){
    background-color: rgb(34, 106, 179);
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
