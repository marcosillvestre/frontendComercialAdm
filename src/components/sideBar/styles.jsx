import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import styled from "styled-components";
export const Container = styled.div`
`

export const GetContracts = styled(AssignmentIndIcon)`
cursor: pointer;
`
export const Links = styled(Link)`
color: #2E2F8E;
display: flex;
gap: 1rem;
text-decoration: none;
&:visited{
    color: #2E2F8E;
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