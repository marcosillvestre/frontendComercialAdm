import styled, { keyframes } from "styled-components";

export const Container = styled.main`
font-size: var(--fsLowest);
width: 100%;
display: flex;
gap: 3rem;

.contrast{
    background-color: #f2f2f2;

}
tbody, th, tr,td, thead{
    border: 1px solid #222;
    padding: .1rem .6rem ;
    width: max-content;
    text-align: center;
}
table{
    border-radius: var(--br);
    width: 100%;
}

th{
    font-weight: bolder;
    &::first-letter{
        text-transform: uppercase;
    }
}

.nav{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
    button{
        all: unset;
        cursor: pointer;
    }
}

.header{
        width: 100%;
        padding: 10px;
        border-radius: var(--br);
        align-items: center;

        button > svg{
            transform: ${props => props.open ? "rotate(180deg)" : "rotate(0deg)"};
            transition: all.4s;

    }
    }
`

export const Main = styled.main`
flex: 1 1 90%;

.box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;

.div10 {
    grid-column: span 4 / span 4;
}

.div20 {
    grid-column: span 4 / span 4;
    grid-row-start: 2;
}

.div30 {
    grid-column: span 4 / span 4;
    grid-row-start: 3;
}

.div40 {
    grid-column: span 4 / span 4;
    grid-row-start: 4;
}

.div50 {
    grid-column: span 4 / span 4;
    grid-row-start: 5;
}

.div60 {
    grid-column: span 4 / span 4;
    grid-row-start: 6;
}

.div70 {
    grid-column: span 4 / span 4;
    grid-row-start: 7;
}
}
.container{
    width: 100%;
    height: min-content;
    border-radius: var(--br);
    border: 1px solid #222;
    padding: 1rem ;
    
}

.body{
.sub-body { 
width: 100%;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(3, 1fr);
grid-column-gap: 5px;
grid-row-gap: 0px;


.div1 { grid-area: 1 / 1 / 2 / 3; }
.div2 { grid-area: 1 / 3 / 2 / 5; }
.div3 { grid-area: 2 / 1 / 3 / 2; }
.div4 { grid-area: 2 / 2 / 3 / 3; }
.div5 { grid-area: 2 / 3 / 3 / 5; }
.div6 { grid-area: 3 / 1 / 4 / 2; }
.div7 { grid-area: 3 / 2 / 4 / 3; }
.div8 { grid-area: 3 / 3 / 4 / 5; }
}

.confirm-button { 
margin-right: 5px;
width: 10rem;
}
}
`

export const SubContainer = styled.section`
    height: min-content;
    border-radius: var(--br);
    border: 1px solid #222;
    padding: 1rem ;
    box-shadow:
    0 2px 5px rgba(0, 0, 0, 0.08),   /* sombra mais curta e suave */
    0 8px 20px rgba(0, 0, 0, 0.12);  /* sombra mais longa e difusa */


    .body{
    display: ${props => props.open ? "flex" : "none"};
    flex-direction: column;
    align-items: flex-end;
    }
`

export const Aside = styled.aside`
flex: 1 1 25%;
min-width: 15rem;
height: 70dvh;
display: grid;
gap: 1rem;

position: sticky ;
top: 100px;
`
export const InputsData = styled.section`
display: grid;
border-radius: var(--br);
border: 1px solid #222;
padding: 1rem ;
height: 100%;
overflow-y: scroll;
label{
    margin-bottom: 5px;
}
`

export const ContainerData = styled.section`
width: 100%;
margin-bottom: 2rem;

    .divider{
    display: grid;
    grid-template-columns: repeat(5, 1fr); 
    gap: .5rem;  
    text-align: start;

    input{
        padding: .4rem;
    }
    }

    @media (max-width: 1445px){
        .divider{
        display: flex;
        flex-wrap: wrap;
        }
        } 

`



export const NavBar = styled.nav`
text-align: center;
padding: 1rem;
display: flex;
flex-direction: column;
animation-duration: .5s;
border-radius: var(--br);
box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1);
width: 100%;
height: fit-content;

.button{
    color: #fff;
    cursor: pointer;
    z-index: 10;    
    transition: transform 0.1s;
    padding: 0 .5rem;
    height: var(--boxHei);
    height: calc(var(--boxHei) - 10px);
    max-width: fit-content;

@media(max-width:760px){
    width: 100%;
}
}
.emmit{
user-select:none;
justify-content: center;
flex-direction: column;

}
.view {
    margin: 5px 0;
    border: 1px dashed;
    padding:  .5rem;
    border-radius: var(--br);
    flex-direction: column;
    align-items: center;
}

@media(max-width:760px){

.emmit{
position: relative;
right:0px
}

}
`


export const Button = styled.button`
width: 100% ;
padding: 0 2rem;
margin: 2px 0;
`

export const ComeBackButton = styled.button`
min-width: 50% ;
`
export const ComeBackDiv = styled.span`
`

export const Box = styled.div`
z-index: 1;
display: ${({ $emmit }) => ($emmit ? "block" : "none")};

`

const up = keyframes`
to {
    translate:  0 -150%;
    display: none;
}
`
const down = keyframes`
from {
    translate:  0 -125%;
    
}
to {
    translate:  0;
}
`


export const SendContract = styled.div`
z-index: 0;
color: #fff;
margin: .2rem 0 ;
border-radius: 5px;
border: none;
cursor: pointer;
transition: all.8s;
width: 100%;
padding: 0 2.5rem;

:first-child{
    animation: ${({ $emmit }) => ($emmit ? down : up)} .3s ease-in-out forwards ;
}
&:nth-child(2){
    animation: ${({ $emmit }) => ($emmit ? down : up)} .5s ease-in-out forwards ;
}
&:nth-child(3){
    animation: ${({ $emmit }) => ($emmit ? down : up)} .7s ease-in-out forwards ;
}

&:hover{
background-color: #4392ff;
}
&:active{
    opacity: .8;
}
`