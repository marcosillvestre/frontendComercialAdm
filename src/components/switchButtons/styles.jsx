import styled from 'styled-components'


export const Container = styled.main`

width: 100%;
background-color: #fff;
display: flex;
align-items: center;
border-radius: var(--br);
height: var(--boxHei);
padding: 3px;
`

export const Buttons = styled.button`
border-radius: var(--br)  ;
min-width: 6rem;
height: 100%;
border: ${props => props.active ? "1px solid #acc2fa" : "none"};
background-color: ${props => props.active ? "#d6dff5c0" : "transparent"};
cursor: pointer;
`