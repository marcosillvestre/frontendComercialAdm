import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from "styled-components";

export const Container = styled.div`
width: 30rem;
display: flex;
justify-content: center;
align-items: center;
margin: .5rem auto;
border-radius: 1rem;

.splide__track{
    padding: 1rem 2rem;
    width: 100%;
}

li{
    display: flex;
    justify-content: center;
    padding: 0;
}
.splide--slide{
    width: 70%;
    display: flex;
    justify-content: center;
}

.splide__arrow{
    margin: 0 -4rem;
}

`

export const Arrow = styled(ArrowBackIcon)`
transform: ${props => props.right ? "rotate(180deg)" : "rotate(0)"};

`

export const PagButton = styled.button`
color: #fff;
border-radius: .4rem;
transition-duration: .3s;
cursor: pointer;
color: ${props => props.active ? "#fff" : "#222"} ;

background-color: ${props => props.active ? "#4648da" : "#fff"};
width: 2.8rem;
border: ${props => props.active ? "none" : "3px solid #d8d9fb"};
height: 2.2rem;

&:hover{
    background-color: #4648da;
    border: none;
    translate: 0 -10%;
    color: #fff;
}

`