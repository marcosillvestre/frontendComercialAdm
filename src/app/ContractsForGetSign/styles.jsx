
import styled from "styled-components";
export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
height: 100vh;
gap: 1rem;
align-items: center;
max-width: 100vw;

table, th, td, tr, thead, button{
    border: 1px solid #222;
    padding: .5rem .2rem;
}
td {
    font-weight: lighter;
    font-size: small;
    text-align: center;
}
th{
    font-size: .8rem;
    font-weight: bolder;
    &::first-letter{
        text-transform: uppercase;
    }
}


select{
border: none;
border-bottom: 1px solid;
padding: .4rem;
width: 10rem;
}
input{
border: none;
border-bottom: 1px solid;
padding: .4rem;
width: 10rem;
}
`
export const SendButton = styled.div`
background-color: #0069ff;
color: #fff;
border-radius: 1rem;
padding: 1.1rem;
border: none;
position: fixed;
right: 2%;
bottom: 5%;
font-weight: bolder;
cursor : pointer ;
&:hover{
background-color: #2d85ff;
    
}
&:active{
    opacity: .8;
}
`