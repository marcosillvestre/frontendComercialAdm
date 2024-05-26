import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import styled from "styled-components";

export const Container = styled.div`
width: 100%;
height: 100%;

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

/* background-color: #c8c8c8; */
`

export const Boxes = styled.div`
display: flex;
margin-top: ${props => props.radio ? "2rem" : "1rem"};
justify-content: center;
background-color: #fff;
align-items: center;
justify-content: ${props => props.radio ? "center" : "left"};
gap: .1rem;

.check{
    width: 3rem;
    height: 1rem;
}
form{
text-align: center;

input[type="file"]{
    visibility: hidden;
    width: 0;
    position: absolute;
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
}
`

export const ButtonDelete = styled.button`
background: none;
color: rgb(25, 118, 210);

border: none;
font-size: 1rem;
padding: 1rem 2rem;
border-radius: 0.5rem;
font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 500;
font-size: 0.875rem;
line-height: 1.75;
letter-spacing: 0.02857em;
text-transform: uppercase;
&:hover{
    text-decoration: none;
    background-color: rgba(32, 119, 206, 0.04);
}

`
