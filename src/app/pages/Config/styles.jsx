import styled from "styled-components";

export const Container = styled.section`
padding: 0rem 5rem ;

header{
    font-weight: bold;
    overflow: hidden;
    font-size: 1.5rem;
    margin: 2rem auto;
    
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
    font-size: 13px;

    @media(max-width: 750px){
    width: 100%;
    height: fit-content;
}
    a{
        background-color: #222;
        font-size: .9rem;
        padding: .5rem ;
        width: 70%;
        color: #fff;
        border-radius: .9rem;
        text-align: center;
        text-decoration: none;
        &:hover{
            background-color: #2c2c2c;
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