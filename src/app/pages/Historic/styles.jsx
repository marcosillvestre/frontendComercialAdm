import styled from "styled-components";

export const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
table, thead, td, tr{
    border: 1px solid #222;
    padding: .5rem .2rem;
    text-align: center;
    padding: 1rem;
}
thead{
    font-weight: bolder;
}
tbody{
    font-size: 12px;
}
table{
    border-radius: .5rem;

}

button{
order: -1;
background-color: #1976d2;
border: none;
font-family: "Roboto", "Helvetica", "Arial", sans-serif;
font-weight: 500;
font-size: 0.675rem;
letter-spacing: 0.02857em;
text-transform: uppercase;
min-width: 64px;
padding: 10px 16px;
border-radius: 4px;
color: #fff;
cursor: pointer;
margin: 2rem auto;
&:hover{
    background-color: #1f5fba;
}


}


`


export const List = styled.span`

`