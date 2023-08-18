import styled from "styled-components";

export const Container = styled.main`
display: flex;
flex-direction: column;
width: 100vw;
height: 100vh;
padding: 0 4rem;


.nav-filter{
    display: flex;
}
.div-tax{
    display: flex;
    width: 5vw;
    position: fixed;
    top: 7rem;
    right: 3rem;
    justify-content: end;
    padding: 0 1rem;
    gap:.2rem;
    span{
        display: grid;
        gap: .3rem;
    }
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
padding: 0 2rem;
align-items: center;
justify-content: center;
width: 2rem;
height: 2rem;
border-radius: .5rem;
box-shadow: -3px 3px 9px 0px rgba(0,0,0,0.66);
background-color: #fff;
font-size:.8rem;

`

export const TableContainer = styled.div`

`
export const Filter = styled.select`
border: none;
border-bottom: 1px solid;
padding: .4rem;
width: 10rem;
option{
    text-transform: uppercase;
    font-weight: lighter;
    font-family: "Roboto","Helvetica","Arial",sans-serif;

}
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



