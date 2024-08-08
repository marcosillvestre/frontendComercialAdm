import styled from "styled-components";

export const Container = styled.section`

font-size: var(--fsLowest);
width: 100%;

table, th, tr, thead{
    border: 1px solid #222;
    /* padding: .1rem ; */

}
table{
    border-radius: .5rem;
}

th{
    font-weight: bolder;
    &::first-letter{
        text-transform: uppercase;
    }
}
.empty{
    display: flex;
    align-items: center;

    img{
        height: 15rem;
    }

}


`


export const NavBar = styled.nav`
text-align: center;
width: fit-content;
margin: 15px 0;

.buttons{
    display: flex;
    gap: 6px;
    align-items: center;
    user-select: none;
    .button-link{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: .7rem 0 ;
        width: 5rem ;
        font-size: var(--fsLow);
        border: none;
        border-radius: .4rem;
        cursor: pointer;
        background-color: transparent;
        position: relative;

        p{
        z-index: 2;
        }

    }
    .ac{
        color: #fff;
    }
    .active{
        width: 100%;
        height: var(--boxHei);
        background-color: #1976d2;
        border-radius: .5rem;
        position: absolute;
        left: 0;
        bottom: 1;
        z-index: 1;
    }
}
`

export const TableBody = styled.td`
background-color: ${props => props.empty && "#f13434"};
background-color: ${props => props.nonMandatory && "#f8e3e3"};
background-color: ${props => props.promo && "#bce9b8"};

border: 1px solid #222;
padding: .5rem .2rem;
font-weight: lighter;
text-align: center;
p{
    margin: 0 3px;
}
`