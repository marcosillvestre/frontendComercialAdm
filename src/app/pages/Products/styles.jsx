import styled from 'styled-components'

export const Container = styled.div`
padding: 0 4rem;
margin-left: 17px;
font-size: var(--fsLowest) ;

@media(max-width:760px){
margin-left: 34px ;

}

`

export const Header = styled.header`
display: flex;
width: 100%;
font-size: var(--fsMid) ;
border: 2px solid #dfe6f1;
border-radius: .35rem;
padding: 1rem 3rem;

margin-bottom: 1.5rem;
nav{
    width:100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin: 0 3rem;
    gap: 1rem;
}
.create-button{
    padding: 0 1rem;

}

form{
    gap: 10px;
    align-items: end;
    button{  
        all: unset;
        cursor: pointer;
        background-color:#dfe6f1;
        width: fit-content;
        height: var(--boxHei);
        padding: 0 .8rem;
        border-radius: 5px;
    }
}

`

