import styled, { keyframes } from 'styled-components';

export const ButtonContainer = styled.span`

display: flex;
gap: 5rem;
font-weight: 500;
font-size: 0.875rem;
line-height: 1.75;
letter-spacing: 0.02857em;
text-transform: uppercase;
user-select: none;
`
export const Container = styled.div`
    z-index: 3;
    border: none;
    cursor: pointer;
    color: #fff;
    background-color: ${props => props.able ? "#1976d2" : "#222"};
    padding: .8rem ;
    border-radius: 5px;
    margin:  5px 0;
    /* box-shadow: ${props => props.able ? "4px 4px 0 #0069ff" : " 4px 4px 0 #505050"}; */
    display: flex;

    transition: transform 0.1s, box-shadow 0.1s ;
    &:active{
        opacity: .8;
    }

`

export const Box = styled.div`
user-select: none;

position: absolute;

display: flex;
gap: 1rem;
margin: 0.3rem 0 0 10rem;

padding: .4rem 2.5rem 1.1rem .6rem;

color: #222;

`

const moveAnimation = keyframes`
from {
    translate: 0 0;
}

to {
    translate: -225% 0;
    visibility: hidden;
}
`;
const desapear = keyframes`
from {
    translate: 0 0;
}

to {
    transition: .2s ease-in-out;
    translate: -75% 0;
    visibility: hidden;
}
`;

export const OptionsContainer = styled.span`
display: flex;
gap: .2rem;
flex-direction: column;
align-items: center;

&:first-child{
    z-index: 2;

}
&:nth-child(n+2){
    z-index: 1;
animation: ${({ $open }) => ($open ? 'none' : moveAnimation)} 1s ease-in-out forwards;
}
&:last-child{
    animation: ${({ $open }) => ($open ? 'none' : moveAnimation)} 1s ease-in-out forwards;
}
`
export const Edit = styled.div`
transition: .5s ease-in-out;

padding: ${props => props.$open ? "1rem 2rem" : ".3rem .3rem"} ;
animation: ${({ $open }) => ($open ? 'none' : desapear)} 800ms ease-in-out forwards ;
animation-delay: 1s;


transform-origin: left;

background-color: ${props => props.able ? "#1976d2" : "#222"};
color: #fff;
border-radius:0 10px 10px 10px ;

border: none;
cursor: pointer;
&:hover{
background-color: #1f5fba;
    translate: 0 -10%;

}
&:active{
    opacity: .8;
}
`

export const Options = styled.div`
display: ${props => props.$open ? "block" : "none"};
transition: .3s ease-in-out;

background-color: #3485f5;
border-radius:10px ;

padding: .6rem;
width: 100%;
text-align: center;
color: #fff;
cursor: pointer;
&:hover{
    translate: 5% 0;
background-color: #1f5fba;

    
}
&:active{
    opacity: .8;
}
`
export const Value = styled.div`

background-color: #3485f5;
border-radius:10px ;
padding: .6rem;
height: 2.5rem;
text-align: center;
color: #fff;
cursor: pointer;
gap: .5rem;
display: flex;
&:hover{
background-color: #1f5fba;
}
 &::after{
            content:' ✖️';
        }
`

export const ButtonSender = styled.div`
background-color: #3485f5;
border-radius:10px ;
padding: .6rem .8rem;
height: 2.5rem;
text-align: center;
color: #fff;
cursor: pointer;
display: flex;
gap: .5rem;
align-items: center;
&:hover{
background-color: #1f5fba;
}

 &::after{
            content:' →';
            translate: 0 -10%;
        }

`