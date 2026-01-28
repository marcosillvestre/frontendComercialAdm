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
`

export const Links = styled(Link)`
background-color: var(--primaryColor);
font-size: calc(var(--fsLowest) - 1px);
padding: .5rem ;
width: 100%;
text-decoration: none;
border-radius: var(--br);
display: flex;
align-items: center;
&:hover{
  text-decoration: underline;
}
`