import styled, { keyframes } from "styled-components";

export const Container = styled.main`

font-size: var(--fsLowest);
width: 100%;
display: flex;
flex-direction: column;
gap: 1rem;
 th, tr, thead{
    border: 1px solid #222;
    padding: .1rem ;
    
}
table{
    border-radius: var(--border-radius);
    width: 100%;
}

th{
    font-weight: bolder;
    &::first-letter{
        text-transform: uppercase;
    }
}




    .box {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; 

}
.container{
    flex: 1 1 100%;
    border: 1px solid #222;
    border-radius: var(--border-radius);
    width: 90dvw;

    padding: 1rem ;
    flex-direction: column;
    text-align: center;
    gap: 1rem; 

    .campaigns{
        display: flex;
        gap: 3rem; 

    }
}

.container:nth-child(1),
.container:nth-child(2) {
    flex: 1 1 40%;
}

`

export const ContainerData = styled.section`

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
width: 100%;
margin: 15px 0;
display: flex;
justify-content: space-between;
position: relative;
.emmit{
text-align: center;
font-weight: lighter;
user-select:none;
position: absolute;
right: 0;

}
.buttons{
    display: flex;
    gap: 6px;
    align-items: center;
    user-select: none;

    .button-link{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: .7rem 0 ;
        width: 5rem ;
        font-size: var(--fsLow);
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
        height: var(--boxHei);
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

export const TableBody = styled.td`
background-color: ${props => props.empty && "#f13434"};
background-color: ${props => props.nonMandatory && "#f8e3e3"};
background-color: ${props => props.promo && "#bce9b8"};

border: 1px solid #222;
padding: .5rem .2rem;
font-weight: lighter;
text-align: center;
p{
    margin: 0 3px;
}
`


export const Button = styled.button`

color: #fff;
cursor: pointer;
margin: 5px 0;
z-index: 10;    
transition: transform 0.1s;
padding: 0 .8rem;

height: var(--boxHei);

@media(max-width:760px){
    width: 100%;
}
`


export const Box = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
z-index: 1;
display: ${({ $emmit }) => ($emmit ? "block" : "none")};
gap: 1rem;
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
margin: .4rem 0 ;
border-radius: 5px;
border: none;
cursor: pointer;
transition: all.8s;
width: 100%;
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