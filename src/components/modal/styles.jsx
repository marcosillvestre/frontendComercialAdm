import styled from "styled-components";

import Button from '@mui/material/Button';



export const Filter = styled(Button)`

`


export const Boxes = styled.label`
display: flex;
width: 100%;
justify-content: center;
justify-content: space-evenly;
form{
    width: 33%;
    display: flex;
    -webkit-box-align: center;
    flex-direction: column;
    justify-content: space-between;
    height: 17rem;
    div{
        display: grid;
    }
}
`
export const Label = styled.label`
font-size:.8rem;
display: grid;
gap:.2rem;
margin:.2rem 0;
width: 100%;
`
export const LabelDate = styled.label`
font-size:.8rem;
margin-bottom:.7rem;
span{
    display: flex;
    align-items: center;
    gap:.3rem;
}
`
export const Input = styled.input`
border: none;
border-bottom: 1px solid;
padding: .4rem;
width: 90%;
`
export const Select = styled.select`
border: none;
border-bottom: 1px solid;
padding: .4rem;
width: 90%;
`

export const Submit = styled.input`
background: none;
padding: .2rem;
border: none;
color: #1976d2;
font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 500;
font-size: 0.875rem;
line-height: 1.75;
letter-spacing: 0.02857em;
margin-top: .7rem;
border-radius: 1rem;
&:hover{
    background-color: rgba(25, 118, 210, 0.04);
}
&:active{
    opacity: 0.8;
}
`
export const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: space-around;
`