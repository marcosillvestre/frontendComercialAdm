import { Link } from "react-router-dom";
import styled from "styled-components";

import TableContainer from '@mui/material/TableContainer';

export const ContainerTable = styled(TableContainer)`

th{
    font-size: .7rem;
}
`


export const ButtonContainer = styled(Link)`
background-color: ${props => props.able ? "#1976d2" : "#222"};
display: flex;
align-items: center;
transition: transform 0.1s, box-shadow 0.1s ;
&:active{
    opacity: .8;
}
`

export const Container = styled.main`
z-index: 12;
nav{
    align-items: center;
    gap: 1rem;

    .flex{
        justify-content: space-between;
        padding: .5rem;
        button{
            margin: 0 2px 2px 0;
        }
    }
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
    width: 20px;
    cursor: pointer;
}
`

export const ButtonSellected = styled.button`
padding: 0 1rem;
z-index: 12;

`
export const SellectedView = styled.div`
display: none;
background-color: #222;
color: #fff;
padding: .5rem;
border-radius: 5px;
font-size: var(--fsXLow);
width: 100%;
max-width: 13rem;
margin: 5px 0;
display: grid;
position: absolute;
z-index: 11;
max-height: 15rem;
overflow-y: scroll;
&::-webkit-scrollbar{
    display: none;
}
.container-sellected-view{
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover{
        text-decoration: underline;
    }
}
svg{
    width: 14px;
}
`