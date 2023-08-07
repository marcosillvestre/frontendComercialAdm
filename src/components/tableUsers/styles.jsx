import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";


export const ButtonChanger = styled.button`
width: 75%;
`
export const Trash = styled(DeleteIcon)`

&:hover{
    color: #5e5e5e;
}
&:active{
    opacity: 0.7;
}
`