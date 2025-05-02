import styled from 'styled-components'

export const Container = styled.div`
font-size: var(--fsLowest);
padding: 0 4rem 5rem;
margin-left: 17px;

nav{
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
    .create-button{
    padding: 0 1rem;

}
}
@media(max-width:760px){
margin-left: 34px ;

}

`

export const Header = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
font-size: var(--fsLow) ;
border: 2px solid #dfe6f1;
border-radius: var(--br);
padding: 1rem 3rem;
margin-bottom: 1.5rem;
font-size: var(--fsLowest);

nav{
    width:100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    gap: 1rem;
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

