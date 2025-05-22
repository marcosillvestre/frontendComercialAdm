import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import styled from "styled-components";

export const Container = styled.div`
width: 100%;
height: 100%;
font-size: var(--fsLow);
`

export const Header = styled.header`
display: grid;
align-content: center;
justify-items: stretch;
width: 100%;
padding: 1rem ;
border: 1px dashed;
border-radius: var(--br);
position: relative;
button{
    cursor: pointer;
    border-radius: var(--br);
    border: none;
    padding: .2rem;
    width: fit-content;
    position: absolute;
    right: 5px;
    top: 5px;
    background: none;
    &:hover{
        background-color: #eaeaea;
    }
}
`

export const Footer = styled.footer`
display: flex;
justify-content: space-between;
margin: 5px 0;
`

export const Fades = styled(Fade)`
border: none;
border-Radius: .9rem;
width: 25vw;
padding: 4rem 0rem ;

`

export const Filter = styled(Button)`

`
export const UploadIcon = styled(CloudUploadIcon)`

`

export const Boxes = styled.div`
display: flex;
margin-top: ${props => props.radio ? "2rem" : "1rem"};
justify-content: center;
background-color: #fff;
align-items: center;
justify-content: ${props => props.radio ? "center" : "left"};
gap: .1rem;

.container{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: .5rem auto;
    border: 1px dashed;
    padding: 1rem;
    border-radius: calc(var(--br));
    background-color: #f9f9f9;
    width: 100%;
    label{
        display: flex;
        align-items: center;
    }
}

.check{
    width: 3rem;
    height: 1rem;
}
form{
text-align: center;
width: 100%;
input[type="file"]{
    width: 0;
}

div{
background-color: #d3d3d3;
padding: 10px;
border-radius: 5px;
    span{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;

    }
}
}
`
export const ChooseArchive = styled.span`
display: flex;
flex-direction: column;
gap: .5rem;
justify-content: center;
align-items: center;
input{
width: 100%;
border: none;
color: #fff;
background-color: #3458f5;
padding: .8rem  ;
border-radius: 5px;
margin: 5px 0;
&:hover{
background-color:#526cdf;

}
&:active{
opacity: .8;

}
}


svg{
    width: 6rem;
    height: 4rem;
    color: rgb(25, 118, 210);
    cursor: pointer;
}
`

export const ButtonDelete = styled.button`
width: 49%;
height: var(--boxHei);
border-radius: var(--br);
border: .5px solid #c1c1c1;
background-color: ${props => props.cancel ? "#1565c0" : ""};
color: ${props => props.cancel ? "#fff" : ""};
cursor: pointer;
margin: 0 2px;

&:hover:not(:disabled){
  background-color: ${props => props.cancel ? "#1565c0" : "#c1c1c1"};
  color: #fff;
}
`
