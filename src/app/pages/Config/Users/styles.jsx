import styled from 'styled-components';



export const Container = styled.main`
font-size: var(--fsLowest);
padding:0 4rem 5rem ;
display: flex;
flex-direction: column;    
margin-left: 17px ;
p{
    margin-bottom: .2rem;
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

.openDrawer{
    padding: 0 .8rem;
    &:hover{
    background-color: #1f5fba;
    }
    }

@media(max-width:760px){
margin-left: 34px ;

.openDrawer{
width: 100%;
}

}
`


export const UserContainer = styled.table`
display: flex;
justify-content: center;
flex-direction: column;
background-color: #ededed;
padding: 1rem 2rem  ;
border-radius: .5rem;
margin-bottom: 3rem ;


`


export const Header = styled.header`


display: flex;
width: 100%;
font-size: var(--fsLow) ;

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
@media(max-width:760px){
padding: .5rem;

}
`


export const Tax = styled.div`
display: flex;
padding: 12px;
border: 0.125em solid #1976d2; ;
box-shadow: 0 0.375em 0 #1976d2;
align-items: center;
justify-content: center;
width: 3rem;
height: 2rem;
border-radius: .5rem;
background-color: #fff;
font-size: var(--fsLow);

margin: 0 auto;
`
