import styled from 'styled-components'

export const Container = styled.main`
font-size: var(--fsLowest) ;
margin-left: 17px;
padding:0 4rem 5rem ;

button{
    padding: 0 1rem;
}
.nav{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 1rem 0;
    
    span{
        display: flex;
        gap: 1rem;
        align-items: center;
            svg{
                color: #222;
                transform: rotate(-90deg);
            }
        
    }
}

@media(max-width:760px){
margin-left: 34px ;

}

`

export const Header = styled.header`
display: flex;
width: 100%;
border: 2px solid #dfe6f1;
border-radius: .35rem;
padding: 1rem 3rem;
margin-bottom: 1.5rem;

.inside-header{
    display: flex;
    align-items: end;
    gap: 1rem;
}
.create-button{
    padding: 0 1rem;

}

form{
    gap: 10px;
    align-items: end;

    input{
        &:disabled{
            opacity: .5;
        }
    }

    button{  
        all: unset;
        cursor: pointer;
        background-color:#dfe6f1;
        width: fit-content;
        height: var(--boxHei);
        padding: 0 .8rem;
        border-radius: 5px;

        &:disabled{
            opacity: .5;
        }
    }
}

`

