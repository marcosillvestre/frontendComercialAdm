import styled from "styled-components";

export const Container = styled.section`
padding: 0rem 5rem ;
font-size: var(--fsMid) ;
margin-left: 17px;

header{
    font-weight: bold;
    overflow: hidden;
    font-size: var(--fsLow) ;
    margin: 2rem auto;
    
}

@media(max-width:760px){
margin-left: 34px ;
}
`
export const MainBox = styled.main`

display: flex;
flex-wrap: wrap;
gap: 20px;
padding: 20px 0;

.boxes{
    background-color: #dbe1fc;
    padding: 2rem 1rem;
    border-radius: .9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
        font-size: var(--fsLow) ;


    @media(max-width: 750px){
    width: 100%;
    height: fit-content;
}
    a{
        background-color: #222;
            font-size: var(--fsMid) ;

        padding: .5rem ;
        width: 70%;
        color: #fff;
        border-radius: .9rem;
        text-align: center;
        text-decoration: none;
        &:hover{
            background-color: #4b4b4b;
        }
        &:visited{
            color: #fff;
        }
    }

    img{
        height: 10rem;
    }
}
`