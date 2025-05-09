import styled from "styled-components";

import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

export const RowTable = styled(TableRow)`
cursor: pointer;
&:hover{
    background-color: #dddddd;

}

`

export const ContainerTable = styled(TableContainer)`
th,td{
    font-size: .7rem;
}
`


export const ContainerOrder = styled.span`
display: flex;
align-items: center;
justify-content: center;
font-size: var(--fsLowest);
width: max-content;
margin: 0 auto;

svg{
    cursor: pointer;
    width: 20px;

}
`