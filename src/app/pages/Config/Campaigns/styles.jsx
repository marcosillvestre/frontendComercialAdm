import styled from 'styled-components'

export const Container = styled.div`
padding:0 4rem 5rem ;
margin-left: 17px;
font-size: var(--fsLowest) ;

.nav{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 1rem 0;
    

    button {
        padding: 0 1rem;
    }
    
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

nav{
    width:100%;
    display: flex;
    align-items: center;
    gap: 1rem;
}
button{
    padding: 0 1rem;
}
`