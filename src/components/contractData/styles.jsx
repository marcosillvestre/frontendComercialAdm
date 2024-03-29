import styled from "styled-components";

export const Container = styled.section`
margin: 0 auto;
display: flex;
flex-direction: column;
gap: 1rem;
max-width: 80vw ;


table, th, tr, thead{
    border: 1px solid #222;
    padding: .5rem .2rem;
}
table{
    border-radius: .5rem;

}

th{
    font-size: .8rem;
    font-weight: bolder;
    &::first-letter{
        text-transform: uppercase;
    }
}
.empty{
    display: flex;
    flex-direction: column;
    /* gap: 4rem; */
    details{
        border: 0.125em solid #1976d2; ;
        padding: calc((4em - (1em * 1.5) - (0.125em * 2) - 0.375em) / 2) calc(1em * 1.5);
        box-shadow: 0 0.375em 0 #1976d2;
        border-radius: .5rem;
    }
    img{
        height: 20rem;
    }

}

.parag{
    width: 35rem;
}

`


export const NavBar = styled.nav`
/* text-align: center; */
/* display: flex; */
.buttons{
    display: flex;
    gap: 6px;
    align-items: center;
}
`

export const ButtonLink = styled.button`
padding: .7rem 0 ;
width: 7rem ;

font-size: 1rem;
border: none;
/* background-color:${props => props.open ? "#3458f5" : "#6d7ccb"} ; */
background-color:#3458f5 ;
color:${props => props.open ? "#fff" : "#222"} ;
border-radius: .4rem;
cursor: pointer;

&:hover{
color:#fff;
background-color:${props => props.open ? "#6d7ccb" : "#7387de"} ;

}
a{
    text-decoration: none;
    color: #222;
    &:visited{
        color: #222;
    
    }
}

`

export const TableBody = styled.td`
background-color: ${props => props.empty && "#f13434"};
background-color: ${props => props.nonMandatory && "#f8e3e3"};

border: 1px solid #222;
padding: .5rem .2rem;
font-weight: lighter;
font-size: small;
text-align: center;
p{
    margin: 0 3px;
}
`