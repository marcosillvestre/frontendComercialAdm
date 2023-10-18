
import styled from "styled-components";
export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
height: 100vh;
max-width: 100vw;


.search{
    translate: 0 -3rem;
    width: 100%;
    padding: 3rem 0;
    padding-left: 2rem;
    display: grid;
    justify-content: flex-start;
    border-bottom: 1px solid #dededf;
    grid-template-areas:
    "p p"
    "select input"
    ;
    p{
        font-size: small;
     }
}
select{
grid-area: select;
border: none;
background-color:#dfe6f1;
border-radius:.5rem 0 0 .5rem;
border-right: .35px solid #bec0c4; 
padding-left: .5rem ;
width: 10rem;
margin-top: .54rem; 
    
option{
    text-transform: uppercase;
    font-weight: lighter;
    font-family: "Roboto","Helvetica","Arial",sans-serif;

}
}
input{
border: none;
background-color:#dfe6f1;
border-radius:0 .5rem .5rem 0;
padding: .7rem .5rem;
width: 10rem;
margin-top: .5rem; 
}

.emmit{
position: absolute;
bottom: 30%;
right: 2%;
text-align: center;
font-weight: lighter;
}
`

export const Button = styled.div`
    background-color: #0069ff;
    color: #fff;
    border: none;
    border-radius: 1rem;
    padding: 1.1rem 2.5rem 1.1rem 1.1rem;
    font-weight: bolder;
    &::after{
        content: "";
        transition: 1s ease;
        width: ${props => props.open ? "1rem" : ".5rem"};
        background-color: #fff;
        animation: ease 1s;
        height: 2px;
        z-index: 10;
        position: absolute;
        transform: ${props => props.open ? "rotate(135deg)" : "rotate(45deg)"};
        right:${props => props.open ? "8%" : "11%"};
        bottom: ${props => props.open ? "50%" : "50%"};
    }
    &::before{
        content: "";
        transition: 1s ease;
        width: ${props => props.open ? "1rem" : ".5rem"};
        background-color: #fff ;
        height: 2px;
        z-index: 10;
        position: absolute;
        transform: ${props => props.open ? "rotate(45deg)" : "rotate(135deg)"};
        right: 8%;
        bottom: ${props => props.open ? "50%" : "50%"};

    }
    &:hover{
    background-color: #2d85ff;
        
    }
    &:active{
        opacity: .8;
    }

`

export const Box = styled.div`
gap: .6rem;
display: ${props => props.emmit ? "inline-block" : "none"};
position: absolute;
right: 7.5%;

`

export const SendContract = styled.div`
background-color: #0069ff;
color: #fff;
border-radius: 1rem;
padding: 0.4rem;
border: none;
cursor: pointer;
margin:.2rem  ;
&:hover{
background-color: #2d85ff;
    
}
&:active{
    opacity: .8;
}
`