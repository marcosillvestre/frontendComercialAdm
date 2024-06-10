
import styled, { keyframes } from "styled-components";



export const Container = styled.div`

padding: 0 4rem;
margin-left: 17px ;
position: relative;
.emmit{
text-align: center;
font-weight: lighter;
user-select:none;
position: absolute;
right: 65px;
}

@media(max-width:760px){
margin-left: 34px ;
.inputs{
    label{
    width: 100%;
    }
}
.emmit{
position: relative;
right:0px
}

}
`

export const Header = styled.header`
display: flex;
width: 100%;
font-size: var(--fsLow) ;

border: 2px solid #dfe6f1;
border-radius: .35rem;
padding: 1rem 3rem;
margin-bottom: 1.5rem;

.inputs{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    label{
        min-width: 30%;
    }
}
input{
border: none;
background-color:#dfe6f1;
border-radius:.5rem ;
padding: .7rem .5rem;
width: 100%;
margin-top: .5rem; 
height: var(--boxHei);
font-size: var(--fsLowest) ;

}
@media(max-width:760px){
.inputs{
    label{
    width: 100%;
    }
}
}
`


export const Button = styled.div`
border: none;
cursor: pointer;
color: #fff;
background-color: #3458f5;
padding: .7rem  ;
border-radius: 5px;
margin: 5px 0;
font-weight: bolder; 
z-index: 10;    
transition: transform 0.1s;

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
background-color: #0069ff;
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