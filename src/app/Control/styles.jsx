import styled from "styled-components";
export const Container = styled.main`
display: flex;
flex-direction: column;
width: 100vw;
height: 100vh;
padding: 0 4rem;


.nav-filter{
    display: flex;
    gap: 2rem;
    align-items: end;
    justify-content: center;
    font-size: small ;
    border: 2px solid #dfe6f1;
    border-radius: .35rem;
    padding: 1.2rem;
    /* width: 50rem; */
.filter{
    border: none;
    background-color:#dfe6f1;
    border-radius: .35rem;
    padding: .7rem .5rem;
    width: 10rem;
    margin-top: .5rem; 
    
}
.name-filter{
    display: flex;
    gap: 3px;
    margin-right: 2rem;
    align-items: end;
}
.button{
    border-radius: .35rem;
    padding: 0 .5rem ; 
    margin-top: 0; 
    border: none;
    background-color:#dfe6f1;
    height: 2.38rem;
    transition-duration: .4s;
    &:hover{
        padding: 0 1.5rem ; 
    svg{
    scale:1.2 ;
    }
    }
}
}
.div-tax{
    width: 5vw;
    padding: 0 1.4rem;
    translate: -3.2rem -.3rem;
}

.table{
    width: 93vw;
    height: 66vh;
    z-index: 1;
    margin-bottom: 2rem;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
}

`
export const Tax = styled.div`
display: flex;
padding: calc((4em - (1em * 1.5) - (0.125em * 2) - 0.375em) / 2) calc(1em * 1.5);
border: 0.125em solid #1976d2; ;
box-shadow: 0 0.375em 0 #1976d2;
align-items: center;
justify-content: center;
width: 3rem;
height: 2rem;
border-radius: .5rem;
background-color: #fff;
font-size:.8rem;

`

export const TableContainer = styled.div`

`
export const Filter = styled.select`

`

export const SearchButton = styled.button`
background: none;
    color: rgb(25, 118, 210);
    border: none;
    font-size: 1rem;
    margin: 0 1rem 0.6rem 2rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;

&:hover{
        text-decoration: none;
    background-color: rgba(25, 118, 210, 0.04);
}

`
export const NothingHere = styled.div`
position: absolute;
display: flex;
font-size: 1.4rem;
margin: 2rem 40%;
justify-content: center;
align-items: center;
flex-direction: column;
`
