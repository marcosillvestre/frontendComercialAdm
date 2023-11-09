import styled from "styled-components";

export const Container = styled.main`
margin: 1rem auto;
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
div{
    display: flex;
    flex-direction: column;
    gap: 4rem;
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

export const TableBody = styled.td`
background-color: ${props => props.empty && "#f13434"};
border: 1px solid #222;
padding: .5rem .2rem;
font-weight: lighter;
font-size: small;
text-align: center;
`