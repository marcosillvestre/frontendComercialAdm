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
display: flex;
gap: 1rem;
max-height: 40dvh;
form{
font-size: var(--fsLowest);
min-width: 60%;
width: 100%;
border-radius: var(--border-radius);
textarea{
  min-width: 100%;
  max-width: 102%;
  padding: .5rem; 
  min-height: 8rem;
  max-height: 10rem;

}
button{
  width: 100%;
}
}

.container{
font-size: var(--fsLowest);
width: 40%;
overflow-y: scroll;
padding-top: 1rem;
header{
  width: 100%;

}

}


`

export const ContainerComment = styled.div`
background-color: #d1d1d1;
border-radius: var(--border-radius);
padding: 8px;
margin-bottom: 5px;
main{
  font-size: calc(var(--fsLowest) - 1px);
  padding: 3px;
  border-radius: 3px;
  border: .1px solid #a3a3a3;
   word-wrap: break-word; /* Antigo, mas ainda funciona */
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



