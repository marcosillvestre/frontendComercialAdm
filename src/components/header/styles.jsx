import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PaidIcon from '@mui/icons-material/Paid';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import styled from "styled-components";


export const Container = styled.div`
width: 100vw;
display: flex;
align-items: center;
justify-content: space-between;
padding: 2.5rem 21rem 2.5rem 2rem ;
height: 2rem;
.arrow{
    border-radius: 55%;
    padding: 0.2rem;
    &:hover{
        background-color: #f5f5f5;
    }
}

.nav-name{
font-size: 1.2rem;
display: flex;
gap: .4rem;
align-items: center;
}
`
export const Nav = styled.nav`
display: flex;
flex-direction: column;
align-items: center;
display:  none;

`

export const Links = styled(Link)`
color: #222;

&:visited{
    color: #222;
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
border-left: .1rem solid #fff;
padding-left: 1.5rem;
background: none;
font-size: 1.4rem;
color: #f13434;
cursor: pointer;
text-decoration:none;
font-weight: bold;
`

export const Image = styled.img`
width: 6rem;
`

export const Name = styled.p`
color: none;

&::first-letter{
    text-transform: capitalize;
}

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