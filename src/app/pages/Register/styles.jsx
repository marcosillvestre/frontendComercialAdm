import styled from 'styled-components';



export const Container = styled.main`
display: flex;
flex-direction: column;
width: 100vw;
padding: 0 4rem;

p{
    margin-bottom: .2rem;
}

@media(max-width:760px){
margin-left: 17px ;
}
`


export const UserContainer = styled.table`
display: flex;
justify-content: center;
flex-direction: column;
background-color: #ededed;
padding: 1rem 2rem  ;
border-radius: .5rem;
margin-bottom: 3rem ;
/* position: relative; */
.openDrawer{

    border: none;
    background-color: #1976d2;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: var(--fsLowest);
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    min-width: 64px;
    border-radius: var(--border-radius);
    color: #fff;
    cursor: pointer;
        height: var(--boxHei);

    &:hover{
    background-color: #1f5fba;
    }
    }


`


export const Header = styled.header`


display: flex;
width: 100%;
font-size: var(--fsMid);
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
font-size: var(--fsLow);

margin: 0 auto;
`
