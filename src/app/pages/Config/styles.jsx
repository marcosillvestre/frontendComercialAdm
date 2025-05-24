import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.section`
padding:0 4rem 5rem ;

margin-left: 17px;
font-size: var(--fsLowest) ;

@media(max-width:760px){
margin-left: 34px ;
}
`
export const MainBox = styled.main`
display: flex;
flex-wrap: wrap;
gap: 5px;
padding: 20px 0;

.boxes{
    background-color: #dbe1fc;
    padding: 2rem 1.5rem;
    border-radius: var(--br);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 15rem;
    text-align: center;
    @media(max-width: 750px){
    width: 100%;
    height: fit-content;
    }

    img{
        height: 8rem;
    }
}
`

export const Links = styled(Link)`
background-color: #dbe1fc;
font-size: calc(var(--fsLowest) - 1px);
padding: .5rem ;
width: 100%;
color: #222;
text-decoration: none;
border-radius: var(--br);

&:hover{
    background: #c4d3e0;
    scale: 1.03;
    border-radius: var(--br);

}
`