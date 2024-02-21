import styled from "styled-components";

export const Box = styled.label`
display: flex;
flex-direction: column;
gap: .3rem;
width: 98%;
div{
    display: flex;
    gap: .3rem;
}
a{
    font-size: x-small;
    text-align: start;
}
`
export const Container = styled.span`
display: flex;
justify-content: space-between;
max-width: 100vw;
background-color: #4e5f9b;
height: calc(100vh - 17vh);

span{
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .intituitional{
        color: #fff;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 25rem;
        gap:2rem;
        margin-top: 2rem;
        text-align: justify;
        img{
            height: 42.5vh;
        }
        h1{
            text-align: center;
            font-size: 3rem;
            font-family: 'Lobster Two', cursive;

            @media(min-width: 1600px){
                font-size: 4em;
            }
        }
    }
    .pwb{
    position: absolute;
    display: flex;
    gap: 0.2rem;
    bottom: 1rem;
    font-size: 0.6rem;
    color: rgb(34, 34, 34);
    z-index: 174;
    }
}
.mainbox{
    background-color: #535175;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 50vw;
    h2{
    font-weight: bolder;
    font-size: 1.4rem;
    color: #222;
    line-height: 42px;
    }
}

form{
    background-color: rgb(255, 255, 255);
    height: 20rem;
    padding: 1rem 1.5rem 2rem 1.5rem;
    display: grid;
    gap: 0.1rem;
    color: #031b4e;

box-shadow: -4px -7px 51px -16px rgba(0,0,0,0.62);
-webkit-box-shadow: -4px -7px 51px -16px rgba(0,0,0,0.62);
-moz-box-shadow: -4px -7px 51px -16px rgba(0,0,0,0.62);
    border-radius: .7rem;
    font-size: .9rem;
    justify-items: center;
}
`
export const Image = styled.img`
width: 45vw;
`
export const Input = styled.input`
width: 100% ;
height: 1.7rem;
border-radius: 0.2rem;
border: none;
padding-left:.5rem;
box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.66);
`

export const Submit = styled.input`
height: 2rem;
border: none;
background-color: #6c63ff;
border-radius: .5rem;
color: #fff;
width: 100%;
margin-top: 3rem ;
&:hover{
    background-color: #5a51ff;
}
&:active{
    opacity: 0.7;
}

`
export const ErrorMessage = styled.p`
font-size: small;
color:#ff8c00;
margin-top: .2rem;
`

export const Header = styled.header`
width: 100vw;
height: 12vh;
background-color: #fff;
display: flex;
justify-content: center;
align-items: center;
box-shadow: 5px 5px 5px 5spx rgba(0,0,0,0.66);

img{
    width: 16rem;
    height: 10rem;
}
`