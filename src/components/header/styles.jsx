import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PaidIcon from '@mui/icons-material/Paid';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import styled from "styled-components";

export const Container = styled.div`
width: 100vw;
display: flex;
align-items: center;
justify-content: space-around;
padding: 3rem  1.5rem;
height: 2rem;
.arrow{
    border-radius: 55%;
    padding: 0.2rem;
    &:hover{
        background-color: #f5f5f5;
    }
}

.navbar{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.nav-name{
font-size: 1.2rem;
display: flex;
gap: .4rem;
align-items: center;
}
`

export const Links = styled(Link)`
color: #1976d2;

&:visited{
    color: #1976d2;
}
`

export const Box = styled.div`
    display: flex;
    scale: ${props => props.isOpen ? 1.4 : 0.5} ;
    transition: ease-in-out 0.5s;
    transform-origin: bottom;

`
export const LogOut = styled(Link)`
border: none;
color: inherit;
border-left: .1rem solid #222;
padding-left: 1.5rem;
background: none;
font-size: 1.4rem;
color: #be2828;
cursor: pointer;
text-decoration:none;
`

export const Image = styled.img`
width: 20rem;
`

export const Name = styled.p`
color: #1976d2;

`
export const Adduser = styled(SupervisedUserCircleIcon)`
cursor: pointer;

`

export const ComissionScreen = styled(PaidIcon)`
cursor: pointer;

`

export const GetContracts = styled(AssignmentIndIcon)`
cursor: pointer;
`