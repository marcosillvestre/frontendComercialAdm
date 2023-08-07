import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";


export const ButtonChanger = styled.button`
width: 75%;
`
export const Trash = styled(DeleteIcon)`

&:hover{
    color: #5e5e5e;
}
&:active{
    opacity: 0.7;
}
`
export const Container = styled.span`
display: flex;
gap: .7rem;
flex-wrap: wrap;
background-color: green;
width: 25rem;

`

export const Select = styled.select`
border: none;
padding: .4rem;
width: 80%;
border-radius: .6rem ;
box-shadow: -2px 3px 9px 0px rgba(0,0,0,0.66);

`
export const Button = styled.button`
background: none;
border: none;
margin-left: .5rem;
padding: .7rem;
border-radius: 20%;

&:hover{
    background:#e0e0e0;
}
&:active{
    opacity: 0.7;
}

`
export const Text = styled.textarea`
max-width: 20rem;
max-height: 10rem;
padding: .3rem;
box-shadow: -2px 3px 9px 0px rgba(0,0,0,0.66);

`

export const Signs = styled.span`
div{
width: 15rem;
display: flex;
}
`
export const Input = styled.input`
border: none;
padding: .4rem;
width: 80%;
border-radius: .6rem ;
box-shadow: -2px 3px 9px 0px rgba(0,0,0,0.66);


`