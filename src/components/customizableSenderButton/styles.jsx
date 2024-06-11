import styled, { keyframes } from 'styled-components';

export const ButtonContainer = styled.span`
display: flex;
gap: 5rem;
font-weight: 500;
font-size: var(--fsLowest);
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
    border-radius: 5px;
    margin:  5px 0;
    display: flex;
    padding: .4rem .6rem ;
    font-size:var(--fsLowest);
    transition: transform 0.1s, box-shadow 0.1s ;
    &:active{
        opacity: .8;
    }

`

export const Box = styled.div`
user-select: none;
position: absolute;
display: flex;
gap: .6rem;
margin: .1rem 0 0 8rem;
color: #222;

padding: .4rem .6rem ;
font-size: var(--fsLowest);
text-align: center;

@media(max-width: 768px){
    flex-direction: column;
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


export const OptionsContainer = styled.span`
display: flex;
gap: .3rem;
flex-direction: column;
align-items: center;
z-index: 2;
animation: ${({ $open }) => ($open ? 'none' : moveAnimation)} 1s ease-in-out forwards;

/* display: ${({ $open }) => ($open ? 'none' : 'block')}; */
/* display: none; */

/* 
}
&:nth-child(n+2){
    z-index: 1;
/* animation: ${({ $open }) => ($open ? 'none' : moveAnimation)} 1s ease-in-out forwards; */
/* } */
/* &:last-child{ */
    /* animation: ${({ $open }) => ($open ? 'none' : moveAnimation)} 1s ease-in-out forwards; */
/* }  */

`
export const Edit = styled.div`
transition: .5s ease-in-out;
width: 100% ;

display: flex;
padding: 0 .5rem;
align-items: center;
height: var(--boxHei);
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
background-color: #1976d2;
border-radius:10px ;
display: flex;
padding: 0 .5rem;
align-items: center;
height: var(--boxHei);
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