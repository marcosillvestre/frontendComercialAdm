import styled, { keyframes } from "styled-components";

export const Container = styled.main`
font-size: var(--fsLowest);
width: 100%;
display: flex;
gap: 3rem;

.contrast{
    background-color: #d1d1d1;
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


`

export const Main = styled.main`
flex: 1 1 90%;

.box {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem; 

}
.container{
    width: 100%;
    border-radius: var(--br);
    border: 1px solid #222;
    padding: 1rem ;

}
`
export const Aside = styled.aside`
flex: 1 1 25%;

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
    nav{
        display: flex;
        justify-content: space-between;
    }
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

background-color: #e0e0e0;
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
    padding: .1rem .5rem;
    border-radius: var(--br);
    flex-direction: column;
    align-items: center;
}

.buttons{
    display: flex;
    align-items: center;
    gap: 6px;
    user-select: none;

    .button-link{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: .7rem 0 ;
        width: 5rem ;
        font-size: var(--fsLowest);
        border: none;
        border-radius: .4rem;
        cursor: pointer;
        background-color: transparent;
        position: relative;

        p{
        z-index: 2;
        }

    }
    .ac{
        color: #fff;
    }
    .active{
        width: 100%;
        height: calc(var(--boxHei) - 5px);
        background-color: #1976d2;
        border-radius: .5rem;
        position: absolute;
        left: 0;
        bottom: 1;
        z-index: 1;
    }
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