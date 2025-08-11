import DeleteIcon from '@mui/icons-material/Delete';
import { TableContainer } from '@mui/material';
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
    cursor: pointer;
    width: 20px;
}
`

export const Container = styled.main`
nav{
    align-items: center;
    gap: 1rem;

    span{
        justify-content: space-between;
        padding: .1rem;
    }
}
`
