import styled from "styled-components";


export const Container = styled.div`
cursor: pointer;
z-index: 11;
`

export const Button = styled.button`
background-color: transparent;
border: none;
`

export const Divider = styled.span`
display: flex;
align-items: center;
cursor: pointer;
font-size: var(--fsLowest);
z-index: 2;
padding: .3rem ;
border-radius: 5px;
transition-duration: .5s;
&:hover{
        background-color: #a5a5a5;
        scale: 1.04;
        color: #fff;
        }
`