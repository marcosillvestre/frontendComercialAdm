import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import styled from "styled-components";
export const Container = styled.div`
`

export const CLoseTab = styled.div`
background-color: #222;
opacity: .2;
width: ${props => props.open ? "100vw" : "0"};
height: ${props => props.open ? "170vh" : "0"};
position: absolute;
overflow: hidden;
z-index: 10;
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
border-radius: 10px;
padding: .5rem ;

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