import styled from "styled-components";
import wave from '../../../assets/wave.svg';

export const Box = styled.label`
display: flex;
flex-direction: column;
gap: .3rem;
width: 98%;
margin-top: .7rem;
font-size: var(--fsLowest);
position: relative;
div{
    display: flex;
    align-items: center;
    gap: .3rem;
}
a{
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    color: var(--primaryColor);
}

label{
position: absolute;
top: 50%;
left: 12px;
translate: 0 -50%;
transform-origin: 0 50%;
pointer-events: none;
transition:  0.3s;
}

`
export const Container = styled.span`
background: var(--lightPrimaryColor);
width: 100%;
padding: 40px;
display: grid;
align-content: center;
justify-content: center;
height: calc(100vh - 12vh);

.mainbox{
    background-color: #fff ;
    border-radius: 22px ;
    width: 500px;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 1.5rem;

.hero{
    background: url(${wave});
    background-size: cover;
    border-radius: 16px;
    overflow: hidden;
    color: #FFFFFF;
    
    .hero-inner{
        padding: 150px 66px;
        min-height: 170px;
    }
}
    
    form{ 
        display: grid;
        align-content: center;
        align-items: center; 
        padding: 20px;
}
}
`

export const Powered = styled.div`
    text-align: center;
    gap: 0.2rem;
    font-size: var(--fsLow);
    color: rgb(34, 34, 34);
    z-index: 174;
    padding: 2rem;
    
`
export const Input = styled.input`
width: 100% ;
height: calc(var(--boxHei) + .5rem);
border-radius: var(--br);
background-color: #f1f1f1;
border: none;
padding-left:1rem;
font-size: var(--fsLowest);
&:is(:focus, :valid) ~ label {
    scale: .800;
    translate: 0 -135%;
}

&:is(:focus) {
    outline: 2px solid var(--primaryColor);
}
`

export const Submit = styled.button`


`
export const ErrorMessage = styled.p`
font-size: var(--fsLow);
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

img{
    width: 12rem;
    height: 6rem;
}

`