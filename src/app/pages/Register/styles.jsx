import styled from 'styled-components';



export const Container = styled.main`
display: flex;
flex-direction: column;
gap: 1rem;
width: 100vw;
justify-content: center;
align-items: center;
padding: 0 4rem;

p{
    margin-bottom: .2rem;
}

`


export const UserContainer = styled.table`
width: 100%;

border-radius: 1rem;
padding: 1rem 2rem ;
height: 22rem;
align-items: center;
color: #222;
background-color: rgb(234, 235, 240);

.openDrawer{
    margin: 0 0 2rem 84%;
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







export const RegisterContainer = styled.form` 
width: 100%;

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
