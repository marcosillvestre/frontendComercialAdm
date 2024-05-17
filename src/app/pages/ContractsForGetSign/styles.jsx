
import styled, { keyframes } from "styled-components";

export const Header = styled.header`
display: flex;
width: 100%;
font-size: small ;
border: 2px solid #dfe6f1;
border-radius: .35rem;
padding: 1rem 3rem;

margin-bottom: 1.5rem;
nav{
    width:100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin: 0 3rem;
    gap: 1rem;
}
`


export const Container = styled.div`

width: 100%;
padding: 0 4rem;

.inputs{
    display: flex;
    gap: 1rem;

}

input{
border: none;
background-color:#dfe6f1;
border-radius:.5rem ;
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