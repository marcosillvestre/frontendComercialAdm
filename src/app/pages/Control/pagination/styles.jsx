import styled from "styled-components";

export const Container = styled.div`
width: 65%;
/* display: flex; */
justify-content: center;
align-items: center;
margin-bottom: 1rem;

.splide__track{
    padding: 1rem 2rem;
    margin: 0 1rem;
}

li{
    margin: 0 .4rem;
}
.splide--slide{
    width: 100%;
    display: flex;
    justify-content: center;
}

.splide__arrow{
    margin: 0 -4rem;

}

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
height: var(--boxHei);
font-size: var(--fsLow);

&:hover{
    background-color: #4648da;
    border: none;
    translate: 0 -10%;
    color: #fff;
}

`