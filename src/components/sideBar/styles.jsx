import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import styled from "styled-components";



export const Label = styled.div`
font-size: 13px;
p{
    font-size: 11px;
}

.container{
    display: flex;
    gap: .5rem;
    align-items: end;

}
.container-options-group{
display: flex;
flex-wrap: wrap;
gap: 5px;
margin: .7rem 0 ;
    .options-group{
    border: 1px dashed;
    border-radius: 10px;
    padding: 7px;
    cursor: pointer;
    font-size:.7rem;
    p{
        &::after{
            content:' ✖️';
        }
    }
    }
}
`

export const ButtonIcon = styled.button`
        border: none;
        background-color: transparent;
        border-radius: 5px;
        padding: 2px 5px;
        height: 2.5rem;
        &:hover{
            background-color:#dfe6f1;
        }

    `

export const Form = styled.aside`
display: flex;
flex-direction:column;
gap: 1rem;
padding: 1rem 2rem;
`
export const Submit = styled.button`
border: none;
background-color: #1976d2;
font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 500;
font-size: 0.75rem;
letter-spacing: 0.02857em;
text-transform: uppercase;
width: 50%;
border-radius: 4px;
color: #fff;
cursor: pointer;
height: 2.6rem;
margin-top: 1rem ;
position: relative;
left: 50%;
user-select: none;
&:hover{
background-color: #1f5fba;
}
`

export const Input = styled.input`
width: 100%;
color: #222;
height: 2.5rem;
display: flex;
padding: .75rem;
align-items: center;
justify-content: space-between;

border-radius: .375rem;
background-color:#dfe6f1;
border: none;
font-size: .67rem;

`
export const Container = styled(Box)`
/* &::-webkit-scrollbar{
    width: 3rem;
    display: none;
} */
`

export const GetContracts = styled(AssignmentIndIcon)`
cursor: pointer;
`
export const Links = styled(Link)`
color: #2E2F8E;
display: flex;
gap: 1rem;
text-decoration: none;
width: 100%;
height: 100%;

background-color: ${props => props.active ? "rgb(234, 235, 240)" : ""};
&:visited{
    color: #2E2F8E;
}
&:hover{
    translate: 8% 0;
    transition: all.6s ease-in-out;

}
`

export const Adduser = styled(SupervisedUserCircleIcon)`
cursor: pointer;
`

export const ComissionScreen = styled(PaidIcon)`
cursor: pointer;
`
export const Home = styled(HomeIcon)`
cursor: pointer;
`
export const History = styled(FactCheckIcon)`
`