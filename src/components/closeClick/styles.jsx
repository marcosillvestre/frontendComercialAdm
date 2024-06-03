import styled from "styled-components";


export const Container = styled.div`
background-color: #222;
width: ${props => props.open ? "100vw" : "0"};
height: ${props => props.open ? "100vh" : "0"};
position: absolute;
top: 0;
left: 0;
overflow: hidden;
z-index: 10;
`