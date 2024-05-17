import styled from "styled-components";




export const Container = styled.section`
padding: 0 4rem;
header{
    width: 100%;
    overflow: hidden;
    margin: 2rem auto;
    display: flex;
    justify-content: space-between;


    button{
        border: none;
        background-color: #1976d2;
        font-family: "Roboto","Helvetica","Arial",sans-serif;
        font-weight: 500;
        font-size: 0.75rem;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
        min-width: 64px;
        padding: 16px;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        height: 3rem;
        &:hover{
        background-color: #1f5fba;
        }
    }
}
`
export const MainBox = styled.main`

display: flex;
justify-content: center;
width: 100%;
.tableContainer{
    width: 100%;

border-radius: 1rem;
padding: 1rem 2rem ;
height: 22rem;
align-items: center;
color: #222;
background-color: rgb(234, 235, 240);

}
`



export const Header = styled.header`


display: flex;
width: 100%;
font-size: small ;
border: 2px solid #dfe6f1;
border-radius: .35rem;
padding: 1rem 3rem;

margin-bottom: 1.5rem;
nav{
    width:100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin: 0 3rem;
    gap: 1rem;
}
`

export const Tax = styled.div`
display: flex;
padding: 12px;
border: 0.125em solid #1976d2; ;
box-shadow: 0 0.375em 0 #1976d2;
align-items: center;
justify-content: center;
width: 3rem;
height: 2rem;
border-radius: .5rem;
background-color: #fff;
font-size:.8rem;
margin: 0 auto;
`