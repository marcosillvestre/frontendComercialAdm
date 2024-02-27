import styled from "styled-components";


export const Container = styled.div`
background-color: #222;
width: ${props => props.open ? "100vw" : "0"};
height: ${props => props.open ? "170vh" : "0"};
position: absolute;
overflow: hidden;
z-index: 10;
`