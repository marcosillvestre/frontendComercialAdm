import styled from "styled-components";

export const Container = styled.section`
margin: 0 auto;
display: flex;
flex-direction: column;
gap: 1rem;


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
    align-items: center;

    img{
        height: 15rem;
    }

}


`


export const NavBar = styled.nav`
text-align: center;
width: 15rem;
/* display: flex; */
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
        font-size: 12px;
        border: none;
        border-radius: .4rem;
        cursor: pointer;
        background-color: transparent;
        position: relative;

        p{
        z-index: 2;
        }
            /* &:hover{
            color:#222;

            } */

    }
    .ac{
        color: #fff;
    }
    .active{
        width: 100%;
        height: 40px;
        background-color: #3458f5;
        border-radius: .5rem;
        position: absolute;
        left: 0;
        bottom: 0;
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
font-size: small;
text-align: center;
p{
    margin: 0 3px;
}
`