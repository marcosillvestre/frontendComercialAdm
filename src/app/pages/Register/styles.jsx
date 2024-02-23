import styled from 'styled-components';

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

export const Anchor = styled.a`

    padding: 0.5rem 1.7rem;
    border: none;
    cursor: pointer;


border-radius: 1rem;
margin: 1rem 0;
text-decoration: none;
background-color: ${props => props.active ? "rgb(212, 217, 228)" : "rgb(223, 230, 241)"};
color: #222;
    &:hover{
    background-color: #dededf;
    }
    &:visited{
        color: #222;
    }
`
export const Header = styled.header`
width: 100vw;
border-bottom: 1px solid #dededf;
display: flex;
justify-content: space-between;
align-items: center;
font-size: small;
nav{
    display: flex;
    align-items: center;
    margin: 0 3rem;
    gap: 1rem;
}
`






export const Container = styled.main`
display: flex;
flex-direction: column;
gap: 1rem;
width: 100vw;
justify-content: center;
align-items: center;

p{
    margin-bottom: .2rem;
}

`

export const RegisterContainer = styled.form` 
width: 70%;

border-radius: 1rem;
padding: 1rem 2rem ;
height: 22rem;
align-items: center;
color: #222;
background-color: rgb(234, 235, 240);

display: grid;
align-items: flex-start;

grid-template-rows: repeat(2, 1fr);
grid-column-gap: 20px;

grid-template-areas:
 "box    container "
 "input  input "
 ;
.container1{ 
 grid-area: box ;
}
.container2{ 
 grid-area: container;
}
input{
grid-area: input;

}

`
export const UserContainer = styled.table`
border-radius:  .25em;
width: 85%;
background-color: rgb(234, 235, 240);
`



export const Image = styled.img`
width: 20vw;
height: 20vh;
`

export const Box = styled.label`
font-size: .9rem;
div{
    display: flex;
    gap:2rem;
}
input[type="radio"]{
    height: 1.3rem;
    width: 1.3rem;
}
`

export const Input = styled.input`
width: 100% ;
height: 2rem;
border-radius: 0.4rem;
border: .1px solid ;

padding: .5rem;
margin-bottom: .5rem

`
export const Submit = styled.input`
height: 2.8rem;
border: none;
background-color: #3a71e9;
border-radius: .6rem;
color: #fff;
width: 50%;
font-weight: bold;
font-size: 1.2em;
margin: 1.5rem auto;
&:hover{
    opacity: 0.8;
}
&:active{
    opacity: 0.7;

}
`

export const ErrorMessage = styled.p`
font-size: small;
color:#ff8c00;
margin-top: .4rem;
`

export const Selected = styled.select`
width: 100% ;
height: 2rem;
border-radius: 0.4rem;
padding-left: .5rem;
margin-bottom: 1rem;

`

export const Selects = styled.select`
width: 100%;
font-size: small;
height: 2rem;
border-radius: 0.4rem;
border: .1px solid ;
margin-bottom: 2rem;
`
export const MultiOption = styled.div`
background-color: #527af3;
color: #fff;
border-right: .1rem solid #222;
padding: .3rem .2rem;
border-radius: .5rem;
cursor: pointer;
margin: .4rem .1rem;
font-size: small;
&::after{
    content:'✖️';
}

`
