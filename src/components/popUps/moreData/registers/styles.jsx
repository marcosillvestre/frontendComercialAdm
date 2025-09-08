import styled from "styled-components";

export const Filter = styled.button`
all: unset;
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

export const Boxes = styled.div`
max-height: 60dvh;
padding: .3rem;
display: flex;
justify-content: center;
align-items: center;
`

export const Footer = styled.footer`
display: flex;
justify-content: space-between;
margin: 5px 0;
display: ${props => props.active ? "block" : "none"};
`

export const RollingButtons = styled.nav`
display: flex;
overflow-x: scroll;
gap: 7px;
padding: .5rem 1rem;
border-radius: var(--br);
margin: 10px 0;
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

export const NavButton = styled.button`
background-color: ${props => props.active ? "#1565c0" : "#e1e1e1"};
color: ${props => props.active ? "#fff" : "#222"};
border: none;
font-size: calc(var(--fsLow) - 2px);
text-overflow: ellipsis;
border-radius: var(--br);

user-select: none;
padding: .2rem .5rem ;
cursor: pointer;

scale: ${props => props.active ? "1.09" : "1"};
`

export const ContainerPopUpData = styled.main`
padding: 1rem 0;
max-height: 55dvh;
overflow-y: scroll;
width: 100%;
padding: 1rem;

.input{
    display: block;
    align-items: center;
    padding-bottom: 1rem;
    width: 95%;
}

.observation-box{
  display: flex;
  justify-content: space-between;
  height: 14rem;
  font-size: var(--fsLowest);
        .container{
      text-align: center;
      width: 30%;
      padding-top: 1rem;
      overflow-y: scroll;

      &::-webkit-scrollbar{
        display: none;
      }
      header{
        width: 100%;

      }
}
}

`

export const ContainerComment = styled.div`
background-color: #d1d1d1;
border-radius: var(--br);
padding: 8px;
margin-bottom: 5px;
main{
  font-size: calc(var(--fsLowest) - 1px);
  padding: 3px;
  border-radius: 3px;
  border: .1px solid #a3a3a3;
  word-wrap: break-word; 
  overflow-wrap: break-word; 
  p{
    text-align: justify;
    max-width: 100%;
    
  }
}
footer{
  font-size: calc(var(--fsLowest) - 2px);
}


`

export const ObservationContainer = styled.form`
padding: .5rem 0;
font-size: var(--fsLowest);
width: 65%;
textarea{
  border-radius: var(--br);
  min-width: 100%;
  max-width: 102%;
  padding: .5rem; 
  min-height: 8rem;
  max-height: 10rem;

}
button{
  width: 100%;
}


`
export const FilesContainer = styled.form`
font-size: var(--fsLowest);
border-radius: var(--br);
padding: .5rem 0;
width: 65%;
label{
  cursor: pointer;
  text-align: center;
  border-radius: var(--br);
  width: 100%;
  padding: .5rem; 
  border: 1px dashed;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button{
  width: 100%;
}

input{
  display: none;
}
svg{
    width: 6rem;
    height: 4rem;
    color: rgb(25, 118, 210);
}




`

export const ChooseArchive = styled.span`
display: flex;
flex-direction: column;
gap: .5rem;
justify-content: center;
align-items: center;

label {
height: min-content;

}
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

export const ButtonAction = styled.button`
background: none;
border: none;
cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
&:hover{
  text-decoration: underline;
}
`

export const ContainerHistoric = styled.div`
width: 100%;
background-color: #e0e0e0;
padding: .2rem .5rem;
border-radius: var(--br);
margin-bottom: 5px;
`