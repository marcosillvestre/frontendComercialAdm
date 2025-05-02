import { Link } from "react-router-dom";
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
    margin: 0 2px;
}
`

export const ButtonContainer = styled(Link)`
font-weight: 500;
line-height: 1.75;
letter-spacing: 0.02857em;
text-transform: uppercase;
user-select: none;
z-index: 3;
border: none;
cursor: pointer;
color: #fff;
background-color: ${props => props.able ? "#1976d2" : "#222"};
border-radius: 5px;
margin:  5px 0;
display: flex;
padding: .4rem .6rem ;
transition: transform 0.1s, box-shadow 0.1s ;
height: fit-content;

&:active{
    opacity: .8;
}
`

export const Tag = styled.span`
font-size: var(--fsLowest);
padding: .5rem;
color: #494949;
border-radius: var(--br);
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



export const IconMethodReminder = styled.i