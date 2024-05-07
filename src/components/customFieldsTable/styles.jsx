import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";

export const Input = styled.input`
color: #222;
height: 2.5rem;
display: flex;
/* padding-left: .75rem; */
text-align: center;
align-items: center;
justify-content: space-between;

border-radius: .375rem;
background-color:#dfe6f1;
border: none;

&::-webkit-outer-spin-button,
&::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`

export const OptionsGroup = styled.div`
display: flex;
flex-wrap: wrap;
gap: 5px;
margin: .7rem 0 ;
    .options-group{
    border: 1px dashed;
    border-radius: 10px;
    padding: 7px;
    cursor: pointer;
    font-size:.6rem;
    p{
        &::after{
            content:' ✖️';
        }
    }
    }

`

export const TrashCan = styled(DeleteIcon)`
&:hover{
    color: #5e5e5e;
}
&:active{
    opacity: 0.7;
}
`

export const Container = styled.div`
background-color: #222;
width: ${props => props.open ? "100vw" : "0"};
height: ${props => props.open ? "170vh" : "0"};
position: absolute;
overflow: hidden;
z-index: 10;
`