import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { Link } from 'react-router-dom';
import styled from "styled-components";


export const NavList = styled.span`
text-align: center;
display: grid;
gap: 15px;
font-size: 14px;
display: ${props => props.active ? "" : "none"};
position: absolute;
top: 60px;
background-color: #fff;
padding:  25px 10px ;
border-radius: 5px;
box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.56);
transition: all.9s;
z-index: 11;
a{
    color: #222;
    display: grid;
    text-decoration: none;
    cursor: pointer;
    &:visited{
    color: #222;

    }
}

`
export const WithNotifications = styled(NotificationImportantIcon)`
`


export const Container = styled.div`
width: 100vw;
display: flex;
align-items: center;
justify-content: space-between;
padding: 2.5rem 9.3rem 2.5rem 0rem ;
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
visibility: ${props => props.open ? "hidden" : "visible"};
gap: .7rem;
align-items: center;
.anchor{
    color: #fff;
    margin: auto .5rem;
    display: grid;
    justify-items: center;
    &:visited{
    color: #fff;

    }
}

}
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
text-shadow: -1px 1px 1px #fff;
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