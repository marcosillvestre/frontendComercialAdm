import { Link } from "react-router-dom";
import styled from "styled-components";

import TableContainer from '@mui/material/TableContainer';

export const ContainerTable = styled(TableContainer)`

th{
    font-size: .7rem;
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
font-size: var(--fsLowest);
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
max-width: 18rem;
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
    width: 15px;
}
`