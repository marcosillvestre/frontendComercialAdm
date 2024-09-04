import { Link } from "react-router-dom"
import styled from "styled-components"


export const ButtonContainer = styled(Link)`
    font-weight: 500;
    font-size: var(--fsLowest);
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
    padding: .3rem 1rem  ;
    font-size:var(--fsLowest);
    transition: transform 0.1s, box-shadow 0.1s ;
    &:active{
        opacity: .8;
    }

`