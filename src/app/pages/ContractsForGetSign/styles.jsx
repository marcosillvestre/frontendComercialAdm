
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
height: 100vh;
max-width: 100vw;

.search{
    translate: 0 -3rem;
    width: 100%;
    padding: 3rem 2rem;
    border-bottom: 1px solid #dededf;
    display: flex;
    justify-content: space-around;
    p{
        font-size: small;
    }
}
.inputs{
    display: grid;
    grid-template-areas:
    "p p"
    "select input"
    ;
}
select{
grid-area: select;
border: none;
background-color:#dfe6f1;
border-radius:.5rem 0 0 .5rem;
border-right: .35px solid #bec0c4; 
padding-left: .5rem ;
width: 10rem;
margin-top: .54rem; 
    
option{
    text-transform: uppercase;
    font-weight: lighter;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
}
}
input{
border: none;
background-color:#dfe6f1;
border-radius:0 .5rem .5rem 0;
padding: .7rem .5rem;
width: 10rem;
margin-top: .5rem; 
}


.emmit{
text-align: center;
font-weight: lighter;
user-select:none;
}
`

export const Button = styled.div`
border: none;
cursor: pointer;
color: #fff;
background-color: #3485f5;
padding: 1.1rem 2.5rem 1.1rem 1.1rem;
border-radius: 5px;
margin: 5px;
box-shadow: 4px 4px 0 #0069ff;
font-weight: bolder; 
z-index: 10;
    &:active{
        transform: translate(4px,4px);
        box-shadow: 0 0 0 #2d85ff;
    }
    
    transition: transform 0.1s, box-shadow 0.1s ;


`

export const Box = styled.div`
gap: 0.4rem;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: .4rem;
z-index: 1;
position: absolute;
`

const up = keyframes`
to {
    translate:  0 -150%;
    visibility: hidden;
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
/* padding: .4rem 0 ; */
border-radius: 5px;
border: none;
cursor: pointer;
transition: all.8s;
width: 10.4rem;
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
background-color: #2d85ff;
}
&:active{
    opacity: .8;
}
`