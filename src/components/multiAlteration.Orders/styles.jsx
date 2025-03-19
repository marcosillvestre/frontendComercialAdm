import styled, { keyframes } from 'styled-components';

export const ButtonContainer = styled.span`
display: flex;
flex-direction: column;
width: fit-content;
position: relative;

gap: 2px;
font-weight: 500;
font-size: var(--fsLowest);
line-height: 1.75;
letter-spacing: 0.02857em;
text-transform: uppercase;
user-select: none;
margin: 5px ;
z-index: 12;

`
export const Container = styled.div`
    z-index: 3;
    border: none;
    cursor: pointer;
    color: #fff;
    background-color: ${props => props.able ? "#1976d2" : "#222"};
    border-radius: 5px;
    margin:  5px 0;
    display: flex;
    padding: .4rem .6rem ;
    transition: transform 0.1s, box-shadow 0.1s ;
    &:active{
        opacity: .8;
    }

`
const moveAnimation = keyframes`
from {
    /* translate: 0 0; */
}

to {
    translate: -725px 0;
    display: none;
}
`;
export const Box = styled.div`
user-select: none;
position: absolute;

display: flex;
flex-direction: column;
max-height: 15rem;
overflow-y: scroll;

gap: .6rem ;
color: #222;

font-size: calc(var(--fsLowest) - 3px);

text-align: center;
margin: 45px 0;
width: 100%;
animation: ${({ $open }) => ($open ? 'none' : moveAnimation)} 1s ease-in-out forwards;

`




export const OptionsContainer = styled.span`
display: flex;
gap: .3rem;
flex-direction: column;
align-items: center;
z-index: 2;

`
export const Edit = styled.div`
transition: .5s ease-in-out;
width: 100% ;
animation-delay: 1s;
transform-origin: left;

display: flex;
justify-content: center;
align-items: center;

height: var(--boxHei);

background-color: ${props => props.able ? "#1976d2" : "#222"};
color: #fff;
border-radius: var(--border-radius) ;

border: none;
cursor: pointer;
&:hover{
    background-color: #1f5fba;

}
&:active{
    opacity: .8;
}
`

export const Options = styled.div`
display: ${props => props.$open ? "block" : "none"};
transition: .3s ease-in-out;

background-color: #1f5fba;

border-radius:10px ;

padding: .3rem;
width: 100%;
text-align: center;
color: #fff;
cursor: pointer;
&:hover{
    translate: 5% 0;

    
}
&:active{
    opacity: .8;
}
`
export const Value = styled.div`

background-color: #1976d2;
border-radius: 10px ;
display: flex;
padding: 0 .5rem;
align-items: center;
height: var(--boxHei);
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

justify-content: center;
align-items: center;

&:hover{
background-color: #1f5fba;
}


`