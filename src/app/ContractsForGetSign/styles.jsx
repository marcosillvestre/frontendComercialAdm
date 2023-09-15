
import styled from "styled-components";
export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
height: 100vh;
gap: 1rem;
padding-left: 2rem;
max-width: 100vw;

table, th, tr, thead{
    border: 1px solid #222;
    padding: .5rem .2rem;
}
table{
    border-radius: .5rem;

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
.search{
    translate: 0 -1rem;
    width: 20rem;
    display: grid;
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
border-bottom: 1px solid;
padding: .4rem;
width: 10rem;
option{
    text-transform: uppercase;
    font-weight: lighter;
    font-family: "Roboto","Helvetica","Arial",sans-serif;

}
}
input{
border: none;
border-bottom: 1px solid;
padding: .4rem;
width: 10rem;
}

.emmit{
position: fixed;
bottom: 5%;
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
        width: ${props => props.open ? "1rem" : ".5rem"};
        background-color: #fff;
        animation: ease 1s;
        height: 2px;
        z-index: 10;
        position: absolute;
        transform: ${props => props.open ? "rotate(135deg)" : "rotate(45deg)"};
        right:${props => props.open ? "8%" : "11%"};
        bottom: ${props => props.open ? "86%" : "50%"};
    }
    &::before{
        content: "";
        width: ${props => props.open ? "1rem" : ".5rem"};
        background-color: #fff ;
        height: 2px;
        z-index: 10;
        position: absolute;
        transform: ${props => props.open ? "rotate(45deg)" : "rotate(135deg)"};
        right: 8%;
        bottom: ${props => props.open ? "86%" : "50%"};

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
display: ${props => props.emmit ? "inline" : "none"};

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