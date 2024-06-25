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

.container{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: .5rem auto;
    border: 1px dashed;
    padding: 1rem;
    border-radius: calc(var(--border-radius));
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
}
`

export const ButtonDelete = styled.button`
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



`
