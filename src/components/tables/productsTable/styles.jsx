import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";

import TableContainer from '@mui/material/TableContainer';

export const ContainerTable = styled(TableContainer)`

th{
    font-size: .7rem;
}
`

export const ContainerOrder = styled.span`
display: flex;
align-items: center;
justify-content: center;
font-size: var(--fsLowest);
svg{
    width: 20px;
    cursor: pointer;
}
`


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
background-color: #81e87f;
display: flex;
flex-wrap: wrap;
gap: 2px;
margin: .7rem 0 ;
    .options-group{
    border: 1px dashed;
    border-radius: 8px;
    padding: 5px;
  
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
export const HeaderTable = styled.div`
align-items: center;
cursor: pointer;
gap: 2px;
svg{
    opacity: .4;
}

&:hover{
svg{
    opacity:1;
    }
}
`