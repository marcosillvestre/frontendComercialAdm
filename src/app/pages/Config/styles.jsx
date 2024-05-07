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

display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 50px;
grid-row-gap: 15px;
.boxes{
    background-color: #dbe1fc;
    padding: 3rem 2rem;
    border-radius: .9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    a{
        background-color: #222;
        font-size: .9rem;
        padding: .5rem 1.5rem;
        color: #fff;
        border-radius: .9rem;
        text-align: center;
        text-decoration: none;
        &:hover{
            background-color: #3b3a3a;
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