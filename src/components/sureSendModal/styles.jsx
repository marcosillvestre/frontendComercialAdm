import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import styled from "styled-components";

export const Fades = styled(Fade)`
border: none;
border-Radius: .9rem;
width: 22vw;
padding: 4rem 3rem ;

`

export const Filter = styled(Button)`
color: #fff;
background-color: #fff;

`

export const Boxes = styled.label`
display: flex;
height: 3.5vw;
margin-top: ${props => props.radio ? "2rem" : "1rem"};
justify-content: center;
background-color: #fff;
align-items: center;
justify-content: ${props => props.radio ? "center" : "left"};
gap: .1rem;

.check{
    width: 3rem;
    height: 1rem;
}
`

export const ButtonDelete = styled.button`
background: none;
color: rgb(25, 118, 210);

border: none;
font-size: 1rem;
padding: 1rem 2rem;
border-radius: 0.5rem;
font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 500;
font-size: 0.875rem;
line-height: 1.75;
letter-spacing: 0.02857em;
text-transform: uppercase;
&:hover{
    text-decoration: none;
    background-color: rgba(32, 119, 206, 0.04);
}

`
