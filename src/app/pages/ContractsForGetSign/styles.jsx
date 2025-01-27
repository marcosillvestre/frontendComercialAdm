
import styled from "styled-components";



export const Container = styled.div`

padding: 0 4rem;
margin-left: 17px ;
position: relative;


@media(max-width:760px){
margin-left: 34px ;
.inputs{
    label{
    width: 100%;
    }
}

}

.empty{
    display: flex;
    align-items: center;

    img{
        height: 15rem;
    }

}
`

export const Header = styled.header`
display: flex;
width: 100%;
font-size: var(--fsLow) ;

border: 2px solid #dfe6f1;
border-radius: .35rem;
padding: 1rem 3rem;
margin-bottom: 1.5rem;
position: relative;
justify-content: space-between;
.comeback{
    padding: .3rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.inputs{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    label{
        min-width: 30%;
        .searcher{
            display: flex;
            gap: .5rem;
            align-items: flex-end; 

        button{
        all: unset;
        cursor: pointer;
        background-color:#dfe6f1;
        width: fit-content;
        height: var(--boxHei);
        padding: 0 .8rem;
        border-radius: 5px;
        bottom: 0;
        right: 0;
            }

        }
    }
}
input{
border: none;
background-color:#dfe6f1;
border-radius:.5rem ;
padding: .7rem .5rem;
margin-top: .5rem; 
height: var(--boxHei);
font-size: var(--fsLowest) ;
width: min-content;
width: 100px;
transition: width 200ms ease-in-out;
&:focus{
    width: 100%;
    border: 1px solid;
}

transition-duration: 1s;
}
@media(max-width:760px){
.inputs{
    label{
    width: 100%;
    }
}
}
`


export const Box = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
z-index: 1;
display: ${({ $emmit }) => ($emmit ? "block" : "none")};
gap: 1rem;
`

