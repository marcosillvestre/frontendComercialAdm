import styled from "styled-components";

export const Container = styled.section`
padding: 2rem 10rem;

header{
    font-weight: bold;
    overflow: hidden;
    font-size: 1.8rem;
    margin: 2rem auto;
    /* white-space: nowrap; */
    /* text-overflow: ellipsis; */
}
`
export const MainBox = styled.main`

display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 50px;
grid-row-gap: 0px;
.boxes{
    background-color: aliceblue;
    padding: 3rem 2rem;
    border-radius: 1.5rem;
    text-align: center;
    display: grid;
    a{
        background-color: #222;
        padding: 1.5rem;
        color: #fff;
        border-radius: .9rem;
        margin: 2rem 0 0 0;
        text-align: center;
        text-decoration: none;
        &:visited{
            color: #fff;
        }
    }

    img{
        height: 14rem;
        margin: 1rem 0;
    }
}
`