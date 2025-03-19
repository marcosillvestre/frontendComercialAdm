import DeleteIcon from '@mui/icons-material/Delete';
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 5px 0 #1efd40aa;
  }
  50% {
    box-shadow: 0 0 10px 5px #1efd40aa;
  }
  100% {
    box-shadow: 0 0 5px 0 #1efd40aa;
  }
`

export const Filter = styled.button`
all: unset;
`
export const ContainerTread = styled.span`
margin: 0 5px;
font-size: var(--fsLowest);
width: 4rem;
height: 5rem;

display: grid;
justify-content: space-between;
align-items: center;
justify-content: center;

div{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
`
export const Stick = styled.span`
background-color: ${props => props.active ? "#1efd40aa" : "#ffb9b9"};

position: absolute;
width: 5.8rem;
right: -65px;
height: 8px;
border-radius: 10px;
`

export const Treadmill = styled.span`
width: 100%;
display: flex;
justify-content: space-around;

`
export const Ball = styled.span`
color: #222;
font-size: var(--fsLowest);
background-color: ${props => props.active ? "#1efd40aa" : "#ffb9b9"};
animation: ${({ active }) => (active ? pulse : 'none')} 3s infinite;
width: ${({ active }) => (active ? '1.5rem' : '1.2rem')};
height: ${({ active }) => (active ? '1.5rem' : '1.2rem')};

border-radius: 50%;
z-index: 2;
`

export const Header = styled.header`
display: grid;
align-content: center;
justify-items: stretch;
width: 100%;
padding: 1rem ;
border: 1px dashed;
border-radius: var(--border-radius);
position: relative;
button{
    cursor: pointer;
    border: none;
    padding: .3rem;
    border-radius: 30%;
    width: fit-content;
    position: absolute;
    right: 2px;
    top: 2px;
    &:hover{
        background-color: #eaeaea;
    }
}
`

export const Boxes = styled.div`
margin-top: .8rem ;
display: grid;
gap: 1rem;
overflow-y: scroll;
max-height: 70dvh;
padding: 1rem ;

.input, input{
font-size: var(--fsLowest);
border: none;
width: 100%;
padding: .5rem; 
height: var(--boxHei);
border-radius: var(--border-radius);

display: flex;
justify-content: space-between;
align-items: center;

svg{
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
}
}

`

export const ButtonDelete = styled.button`
background: none;
background-color: rgb(25, 118, 210);
color:  #fff;
border: none;
font-size: .7rem;
padding: 1rem;
border-radius: 0.5rem;
text-transform: uppercase;
&:hover{
    /* text-decoration: none; */
    background-color: rgb(16, 87, 158);
    color: #f1f1f1;
}

`
export const Trash = styled(DeleteIcon)`

&:hover{
    color: #336ba3;
}
&:active{
    opacity: 0.7;
}
`



